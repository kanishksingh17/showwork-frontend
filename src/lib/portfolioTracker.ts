/**
 * Portfolio Tracking Script
 * This script should be embedded in portfolio pages to track user interactions
 */

interface TrackingConfig {
  portfolioId: string;
  userId?: string;
  apiEndpoint: string;
  enableCrossDeviceTracking: boolean;
  enablePerformanceTracking: boolean;
  enableGoalTracking: boolean;
}

interface TrackingEvent {
  type: string;
  properties: Record<string, unknown>;
  timestamp?: Date;
}

class PortfolioTracker {
  private config: TrackingConfig;
  private eventQueue: TrackingEvent[] = [];
  private sessionId: string;
  private crossDeviceId: string;
  private isOnline: boolean;
  private cleanupFns: Array<() => void> = [];
  private static readonly MAX_QUEUE_SIZE = 500;

  constructor(config: TrackingConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.crossDeviceId = this.getCrossDeviceId();
    this.isOnline = navigator.onLine;

    this.initializeTracking();
  }

  private initializeTracking() {
    // Set up online/offline detection
    const onlineHandler = () => {
      this.isOnline = true;
      this.flushEventQueue();
    };
    window.addEventListener("online", onlineHandler);
    this.cleanupFns.push(() => window.removeEventListener("online", onlineHandler));

    const offlineHandler = () => {
      this.isOnline = false;
    };
    window.addEventListener("offline", offlineHandler);
    this.cleanupFns.push(() =>
      window.removeEventListener("offline", offlineHandler)
    );

    // Track page load
    this.trackPageLoad();

    // Set up performance monitoring
    if (this.config.enablePerformanceTracking) {
      this.setupPerformanceTracking();
    }

    // Set up cross-device tracking
    if (this.config.enableCrossDeviceTracking) {
      this.setupCrossDeviceTracking();
    }

    // Set up goal tracking
    if (this.config.enableGoalTracking) {
      this.setupGoalTracking();
    }
  }

  private trackPageLoad() {
    const pageLoadData = {
      type: "portfolio_view",
      properties: {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date(),
        sessionId: this.sessionId,
        crossDeviceId: this.crossDeviceId,
      },
    };

    this.trackEvent(pageLoadData);
  }

  private setupPerformanceTracking() {
    // Placeholder hook. Replace with web-vitals package integration when added.
    this.trackWebVitals();

    // Track page load time
    const loadHandler = () => {
      const loadTime = performance.now();
      this.trackEvent({
        type: "performance_metric",
        properties: {
          metric: "page_load_time",
          value: loadTime,
        },
      });
    };
    window.addEventListener("load", loadHandler);
    this.cleanupFns.push(() => window.removeEventListener("load", loadHandler));

    // Track resource loading times
    this.trackResourceTiming();
  }

  private setupCrossDeviceTracking() {
    // Store cross-device identifier
    localStorage.setItem("portfolio_cross_device_id", this.crossDeviceId);

    // Track cross-device session
    this.trackEvent({
      type: "cross_device_session",
      properties: {
        crossDeviceId: this.crossDeviceId,
        sessionId: this.sessionId,
        timestamp: new Date(),
      },
    });
  }

  private setupGoalTracking() {
    // Track CV downloads
    this.trackCVDownloads();

    // Track project interactions
    this.trackProjectInteractions();

    // Track contact form submissions
    this.trackContactSubmissions();

    // Track social media clicks
    this.trackSocialMediaClicks();
  }

  private trackCVDownloads() {
    // Track CV download buttons
    const clickHandler = (event: Event) => {
      const target = this.getMatchingElement(event, "[data-cv-download]");
      if (target) {
        const cvType = target.getAttribute("data-cv-type") || "default";
        const format = target.getAttribute("data-cv-format") || "pdf";

        this.trackEvent({
          type: "cv_download",
          properties: {
            cvType,
            format,
          },
        });
      }
    };

    document.addEventListener("click", clickHandler);
    this.cleanupFns.push(() => document.removeEventListener("click", clickHandler));
  }

  private trackProjectInteractions() {
    // Track project clicks
    const projectClickHandler = (event: Event) => {
      const target = this.getMatchingElement(event, "[data-project-id]");
      if (target) {
        const projectId = target.getAttribute("data-project-id");
        const interactionType =
          target.getAttribute("data-interaction-type") || "click";

        this.trackEvent({
          type: "project_interaction",
          properties: {
            projectId,
            interactionType,
          },
        });
      }
    };
    document.addEventListener("click", projectClickHandler);
    this.cleanupFns.push(() =>
      document.removeEventListener("click", projectClickHandler)
    );

    // Track demo clicks
    const demoClickHandler = (event: Event) => {
      const target = this.getMatchingElement(event, "[data-demo-link]");
      if (target) {
        const projectId = target.getAttribute("data-project-id");

        this.trackEvent({
          type: "demo_click",
          properties: {
            projectId,
            demoUrl: target.getAttribute("href"),
          },
        });
      }
    };
    document.addEventListener("click", demoClickHandler);
    this.cleanupFns.push(() => document.removeEventListener("click", demoClickHandler));

    // Track GitHub clicks
    const githubClickHandler = (event: Event) => {
      const target = this.getMatchingElement(event, "[data-github-link]");
      if (target) {
        const projectId = target.getAttribute("data-project-id");

        this.trackEvent({
          type: "github_click",
          properties: {
            projectId,
            githubUrl: target.getAttribute("href"),
          },
        });
      }
    };
    document.addEventListener("click", githubClickHandler);
    this.cleanupFns.push(() =>
      document.removeEventListener("click", githubClickHandler)
    );
  }

  private trackContactSubmissions() {
    // Track contact form submissions
    const submitHandler = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const form = target.closest("[data-contact-form]") as HTMLFormElement | null;
      if (form) {
        const formType = form.getAttribute("data-form-type") || "contact";

        this.trackEvent({
          type: "contact_submission",
          properties: {
            formType,
          },
        });
      }
    };
    document.addEventListener("submit", submitHandler);
    this.cleanupFns.push(() => document.removeEventListener("submit", submitHandler));
  }

  private trackSocialMediaClicks() {
    // Track social media clicks
    const clickHandler = (event: Event) => {
      const target = this.getMatchingElement(event, "[data-social-link]");
      if (target) {
        const platform = target.getAttribute("data-social-platform");
        const linkType = target.getAttribute("data-link-type") || "profile";

        this.trackEvent({
          type: "social_media_click",
          properties: {
            platform,
            linkType,
            url: target.getAttribute("href"),
          },
        });
      }
    };
    document.addEventListener("click", clickHandler);
    this.cleanupFns.push(() => document.removeEventListener("click", clickHandler));
  }

  private trackWebVitals() {
    // Implementation for Core Web Vitals tracking
    // This would typically use the web-vitals library
  }

  private trackResourceTiming() {
    if (typeof PerformanceObserver === "undefined") {
      return;
    }

    const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];
    if (!supportedEntryTypes.includes("resource")) {
      return;
    }

    // Track resource loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "resource") {
          const resourceEntry = entry as PerformanceResourceTiming;
          this.trackEvent({
            type: "resource_timing",
            properties: {
              name: resourceEntry.name,
              duration: resourceEntry.duration,
              size: resourceEntry.transferSize || 0,
            },
          });
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });
    this.cleanupFns.push(() => observer.disconnect());
  }

  private trackEvent(event: TrackingEvent) {
    const timestamp = event.timestamp ?? new Date();

    const enrichedEvent: TrackingEvent = {
      ...event,
      timestamp,
      properties: {
        ...event.properties,
        portfolioId: this.config.portfolioId,
        userId: this.config.userId,
        sessionId: this.sessionId,
        crossDeviceId: this.crossDeviceId,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp,
      },
    };

    if (this.isOnline) {
      this.sendEvent(enrichedEvent);
    } else {
      this.enqueueEvent(enrichedEvent);
    }
  }

  private async sendEvent(event: TrackingEvent) {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while sending tracking event`);
      }
    } catch (error) {
      console.error("Failed to send tracking event:", error);
      this.enqueueEvent(event);
    }
  }

  private async flushEventQueue() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      const response = await fetch(`${this.config.apiEndpoint}/events/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while flushing event queue`);
      }
    } catch (error) {
      console.error("Failed to flush event queue:", error);
      this.eventQueue = [...events, ...this.eventQueue].slice(
        -PortfolioTracker.MAX_QUEUE_SIZE
      );
    }
  }

  private enqueueEvent(event: TrackingEvent) {
    if (this.eventQueue.length >= PortfolioTracker.MAX_QUEUE_SIZE) {
      this.eventQueue.shift();
    }
    this.eventQueue.push(event);
  }

  private getMatchingElement(event: Event, selector: string): HTMLElement | null {
    const target = event.target;
    if (!(target instanceof Element)) {
      return null;
    }

    return target.closest(selector) as HTMLElement | null;
  }

  private createId(prefix: string): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `${prefix}_${crypto.randomUUID()}`;
    }

    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(12);
      crypto.getRandomValues(bytes);
      const random = Array.from(bytes, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
      return `${prefix}_${random}_${Date.now().toString(36)}`;
    }

    return `${prefix}_${Math.random().toString(36).slice(2, 11)}_${Date.now().toString(36)}`;
  }

  private generateSessionId(): string {
    return this.createId("session");
  }

  private getCrossDeviceId(): string {
    let crossDeviceId = localStorage.getItem("portfolio_cross_device_id");
    if (!crossDeviceId) {
      crossDeviceId = this.createId("cd");
    }
    return crossDeviceId;
  }

  // Public methods for manual tracking
  public trackCustomEvent(type: string, properties: Record<string, unknown>) {
    this.trackEvent({
      type,
      properties,
      timestamp: new Date(),
    });
  }

  public trackGoal(goalType: string, goalValue: number) {
    this.trackEvent({
      type: "goal_completion",
      properties: {
        goalType,
        goalValue,
        timestamp: new Date(),
      },
    });
  }

  public trackConversion(conversionType: string, conversionValue?: number) {
    this.trackEvent({
      type: "conversion",
      properties: {
        conversionType,
        conversionValue,
        timestamp: new Date(),
      },
    });
  }

  public destroy() {
    for (const cleanup of this.cleanupFns.splice(0)) {
      cleanup();
    }
  }
}

// Initialize tracking when script loads
export function initializePortfolioTracking(config: TrackingConfig) {
  return new PortfolioTracker(config);
}

// Export for use in React components
export { PortfolioTracker };
