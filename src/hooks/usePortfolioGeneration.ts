import { useState, useCallback, useRef } from "react";
import { portfolioAPI } from "../services/portfolioAPI";
import { PortfolioGenerationPipeline } from "../services/portfolioPipeline";
import { API_CONFIG } from "../config/apiConfig";

const ABORT_ERROR_NAME = "AbortError";

const isAbortError = (error: unknown): boolean => {
  return (
    (error instanceof DOMException && error.name === ABORT_ERROR_NAME) ||
    (error instanceof Error && error.name === ABORT_ERROR_NAME)
  );
};

const createAbortError = () =>
  new DOMException("Generation cancelled by user", ABORT_ERROR_NAME);

const throwIfAborted = (signal: AbortSignal) => {
  if (signal.aborted) {
    throw createAbortError();
  }
};

const sleepWithAbort = (ms: number, signal: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(createAbortError());
      return;
    }

    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      window.clearTimeout(timeoutId);
      signal.removeEventListener("abort", onAbort);
      reject(createAbortError());
    };

    signal.addEventListener("abort", onAbort, { once: true });
  });
};

const createUniqueId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

const normalizeDate = (value: unknown): Date => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date();
};

const normalizeGenerationStatus = (status: GenerationStatus): GenerationStatus => {
  return {
    ...status,
    createdAt: normalizeDate(status.createdAt),
    updatedAt: normalizeDate(status.updatedAt),
    steps: status.steps.map((step) => ({
      ...step,
      startTime: step.startTime ? normalizeDate(step.startTime) : undefined,
      endTime: step.endTime ? normalizeDate(step.endTime) : undefined,
    })),
  };
};

export interface GenerationRequest {
  userData: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
    experience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
  };
  templateId?: string;
  customDomain?: string;
  deploymentOptions?: {
    provider: "vercel" | "s3" | "both";
    enableAnalytics: boolean;
    enableCDN: boolean;
    customDomain?: string;
  };
}

export interface GenerationStatus {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  currentStep: string;
  steps: Array<{
    id: string;
    title: string;
    status: "pending" | "processing" | "completed" | "error";
    progress: number;
    startTime?: Date;
    endTime?: Date;
    error?: string;
  }>;
  result?: {
    portfolioId: string;
    url: string;
    customUrl?: string;
    deploymentId: string;
    performance: {
      pageSpeed: number;
      loadTime: number;
      bundleSize: number;
    };
    analytics?: {
      trackingId: string;
      customEvents: string[];
    };
  };
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationResult {
  jobId: string;
  portfolioId: string;
  url: string;
  customUrl?: string;
  deploymentId: string;
  performance: {
    pageSpeed: number;
    loadTime: number;
    bundleSize: number;
  };
  analytics?: {
    trackingId: string;
    customEvents: string[];
  };
}

export const usePortfolioGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJob, setCurrentJob] = useState<GenerationStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Map<string, GenerationStatus>>(new Map());

  const pipelineRef = useRef<PortfolioGenerationPipeline | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeJobIdRef = useRef<string | null>(null);

  const updateJobById = useCallback(
    (jobId: string, updater: (job: GenerationStatus) => GenerationStatus) => {
      setJobs((prevJobs) => {
        const existing = prevJobs.get(jobId);
        if (!existing) {
          return prevJobs;
        }

        const updated = updater(existing);
        const next = new Map(prevJobs);
        next.set(jobId, updated);
        return next;
      });

      setCurrentJob((prev) => {
        if (!prev || prev.jobId !== jobId) {
          return prev;
        }
        return updater(prev);
      });
    },
    [],
  );

  // Initialize pipeline
  const initializePipeline = useCallback(() => {
    if (!pipelineRef.current) {
      pipelineRef.current = new PortfolioGenerationPipeline({
        openai: {
          apiKey: API_CONFIG.OPENAI.API_KEY,
          model: API_CONFIG.OPENAI.MODEL,
          maxTokens: API_CONFIG.OPENAI.MAX_TOKENS,
          temperature: API_CONFIG.OPENAI.TEMPERATURE,
        },
        s3: {
          accessKeyId: API_CONFIG.AWS.ACCESS_KEY_ID,
          secretAccessKey: API_CONFIG.AWS.SECRET_ACCESS_KEY,
          region: API_CONFIG.AWS.REGION,
          bucketName: API_CONFIG.AWS.BUCKET_NAME,
        },
        vercel: {
          token: API_CONFIG.VERCEL.TOKEN,
          teamId: API_CONFIG.VERCEL.TEAM_ID,
          baseUrl: API_CONFIG.VERCEL.BASE_URL,
        },
        portfolio: {
          defaultTemplate: API_CONFIG.PORTFOLIO.DEFAULT_TEMPLATE,
          generationTimeout: API_CONFIG.PORTFOLIO.GENERATION_TIMEOUT,
          performanceTarget: API_CONFIG.PORTFOLIO.PERFORMANCE_TARGET,
          maxBundleSize: API_CONFIG.PORTFOLIO.MAX_BUNDLE_SIZE,
        },
      });
    }
    return pipelineRef.current;
  }, []);

  // Generate portfolio
  const generatePortfolio = useCallback(
    async (request: GenerationRequest): Promise<GenerationResult> => {
      setIsGenerating(true);
      setError(null);

      // Create abort controller for cancellation
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const { signal } = controller;

      const stepTemplate = [
        {
          id: "ai-content",
          title: "AI Content Generation",
          status: "pending",
          progress: 0,
        },
        {
          id: "template-selection",
          title: "Template Selection",
          status: "pending",
          progress: 0,
        },
        {
          id: "asset-building",
          title: "Asset Building",
          status: "pending",
          progress: 0,
        },
        {
          id: "s3-upload",
          title: "S3 Upload",
          status: "pending",
          progress: 0,
        },
        {
          id: "vercel-deploy",
          title: "Vercel Deployment",
          status: "pending",
          progress: 0,
        },
      ] as GenerationStatus["steps"];

      const jobId = createUniqueId("job");
      activeJobIdRef.current = jobId;

      const updateStatus = (updates: Partial<GenerationStatus>) => {
        updateJobById(jobId, (job) => ({
          ...job,
          ...updates,
          updatedAt: new Date(),
        }));
      };

      const updateStep = (
        stepId: string,
        updates: Partial<GenerationStatus["steps"][0]>,
      ) => {
        updateJobById(jobId, (job) => ({
          ...job,
          steps: job.steps.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step,
          ),
          updatedAt: new Date(),
        }));
      };

      try {
        throwIfAborted(signal);
        const pipeline = initializePipeline();

        // Create job status
        const initialStatus: GenerationStatus = {
          jobId,
          status: "pending",
          progress: 0,
          currentStep: "Initializing",
          steps: stepTemplate,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setCurrentJob(initialStatus);
        setJobs((prev) => {
          const next = new Map(prev);
          next.set(jobId, initialStatus);
          return next;
        };

        // Start generation
        updateStatus({
          status: "processing",
          currentStep: "Starting generation",
        });

        // Step 1: AI Content Generation
        updateStep("ai-content", {
          status: "processing",
          startTime: new Date(),
        });
        updateStatus({ currentStep: "Generating AI content", progress: 10 });

        await sleepWithAbort(400, signal);
        throwIfAborted(signal);
        updateStep("ai-content", {
          status: "completed",
          progress: 100,
          endTime: new Date(),
        });

        // Step 2: Template Selection
        updateStep("template-selection", {
          status: "processing",
          startTime: new Date(),
        });
        updateStatus({ currentStep: "Selecting template", progress: 30 });

        await sleepWithAbort(300, signal);
        throwIfAborted(signal);
        updateStep("template-selection", {
          status: "completed",
          progress: 100,
          endTime: new Date(),
        });

        // Step 3: Asset Building
        updateStep("asset-building", {
          status: "processing",
          startTime: new Date(),
        });
        updateStatus({ currentStep: "Building assets", progress: 50 });

        throwIfAborted(signal);
        const pipelineResult = await pipeline.generate({
          ...request,
          signal,
        });
        throwIfAborted(signal);
        updateStep("asset-building", {
          status: "completed",
          progress: 100,
          endTime: new Date(),
        });

        // Step 4: S3 Upload
        updateStep("s3-upload", {
          status: "processing",
          startTime: new Date(),
        });
        updateStatus({ currentStep: "Uploading to S3", progress: 70 });

        await sleepWithAbort(200, signal);
        throwIfAborted(signal);
        updateStep("s3-upload", {
          status: "completed",
          progress: 100,
          endTime: new Date(),
        });

        // Step 5: Vercel Deployment
        updateStep("vercel-deploy", {
          status: "processing",
          startTime: new Date(),
        });
        updateStatus({ currentStep: "Deploying to Vercel", progress: 90 });

        await sleepWithAbort(200, signal);
        throwIfAborted(signal);
        updateStep("vercel-deploy", {
          status: "completed",
          progress: 100,
          endTime: new Date(),
        });

        // Generate result
        const result: GenerationResult = {
          jobId,
          portfolioId: pipelineResult.portfolioId,
          url: pipelineResult.url,
          customUrl: request.customDomain
            ? `https://${request.customDomain}`
            : undefined,
          deploymentId: pipelineResult.deploymentId,
          performance: pipelineResult.performance,
          analytics: request.deploymentOptions?.enableAnalytics
            ? {
                trackingId: createUniqueId("sw"),
                customEvents: [
                  "portfolio_view",
                  "project_click",
                  "contact_form_submit",
                ],
              }
            : undefined,
        };

        // Update final status
        updateStatus({
          status: "completed",
          progress: 100,
          currentStep: "Completed",
          result,
        });

        return result;
      } catch (error) {
        const errorMessage = isAbortError(error)
          ? "Generation cancelled by user"
          : error instanceof Error
            ? error.message
            : "Generation failed";
        setError(errorMessage);

        updateJobById(jobId, (job) => ({
          ...job,
          status: "failed",
          error: errorMessage,
          updatedAt: new Date(),
        }));

        throw error;
      } finally {
        setIsGenerating(false);
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        if (activeJobIdRef.current === jobId) {
          activeJobIdRef.current = null;
        }
      }
    },
    [initializePipeline, updateJobById],
  );

  // Cancel generation
  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
      setError("Generation cancelled by user");

      const activeJobId = activeJobIdRef.current;
      if (activeJobId) {
        updateJobById(activeJobId, (job) => ({
          ...job,
          status: "failed",
          error: "Cancelled by user",
          updatedAt: new Date(),
        }));
      }
    }
  }, [updateJobById]);

  // Get job status
  const getJobStatus = useCallback(
    async (jobId: string): Promise<GenerationStatus | null> => {
      const job = jobs.get(jobId);
      if (job) {
        return job;
      }

      // Try to get from API
      try {
        const status = normalizeGenerationStatus(await portfolioAPI.getStatus(jobId));
        setJobs((prev) => {
          const next = new Map(prev);
          next.set(jobId, status);
          return next;
        });
        return status;
      } catch (error) {
        console.error("Failed to get job status:", error);
        return null;
      }
    },
    [jobs],
  );

  // Get all jobs
  const getAllJobs = useCallback((): GenerationStatus[] => {
    return Array.from(jobs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }, [jobs]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setIsGenerating(false);
    setCurrentJob(null);
    setError(null);
    setJobs(new Map());
    activeJobIdRef.current = null;
    abortControllerRef.current = null;
  }, []);

  return {
    // State
    isGenerating,
    currentJob,
    error,
    jobs: getAllJobs(),

    // Actions
    generatePortfolio,
    cancelGeneration,
    getJobStatus,
    clearError,
    reset,

    // Utilities
    hasActiveJob: currentJob?.status === "processing",
    canCancel: isGenerating && abortControllerRef.current !== null,
    progress: currentJob?.progress || 0,
    currentStep: currentJob?.currentStep || "",
  };
};
