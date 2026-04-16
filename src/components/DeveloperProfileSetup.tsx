import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Code2,
  Globe,
  Users,
  Star,
  Zap,
  Database,
  Server,
  Layers,
  Terminal,
  Brain,
  Shield,
  Loader,
  CheckCircle,
  XCircle,
  X,
  ArrowLeft,
  Target,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LinkedInIcon,
  TwitterIcon,
  GitHubIcon,
  InstagramIcon,
  RedditIcon,
} from "./BrandIcons";
import {
  QUESTION_BANK,
  getEnhancedQuestionsForTechStacks,
} from "@/utils/questionBank";
import type { Question as QuizQuestion } from "@/utils/questionBank";
import { getHybridQuestions } from "@/utils/webQuestionService";
import { UnifiedLayout } from "./UnifiedLayout";

// Types
interface TechStack {
  id: string;
  name: string;
  icon: React.ReactNode;
  category:
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "devops"
  | "language";
  color: string;
}

interface Question {
  id: string;
  techId: string;
  question: string;
  type: "multiple-choice" | "slider" | "input";
  options?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface Answer {
  questionId: string;
  value: string | number;
}

interface ProfileData {
  username: string;
  fullName: string;
  bio: string;
}

interface DeveloperProfileSetupProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    username?: string;
    bio?: string;
    techStack?: string[];
    platformPreferences?: string[];
  };
  onComplete?: (setupData?: ProfileData) => void;
}

// Tech Stack Data - Enhanced with more technologies
const TECH_STACKS: TechStack[] = [
  // Frontend Frameworks
  {
    id: "react",
    name: "React",
    icon: <Code2 className="w-5 h-5" />,
    category: "frontend",
    color: "bg-blue-500",
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: <Layers className="w-5 h-5" />,
    category: "frontend",
    color: "bg-green-500",
  },
  {
    id: "angular",
    name: "Angular",
    icon: <Shield className="w-5 h-5" />,
    category: "frontend",
    color: "bg-red-500",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: <Zap className="w-5 h-5" />,
    category: "frontend",
    color: "bg-gray-800",
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: <Layers className="w-5 h-5" />,
    category: "frontend",
    color: "bg-orange-500",
  },
  {
    id: "nuxt",
    name: "Nuxt.js",
    icon: <Layers className="w-5 h-5" />,
    category: "frontend",
    color: "bg-green-600",
  },

  // Backend Technologies
  {
    id: "nodejs",
    name: "Node.js",
    icon: <Server className="w-5 h-5" />,
    category: "backend",
    color: "bg-green-600",
  },
  {
    id: "express",
    name: "Express.js",
    icon: <Server className="w-5 h-5" />,
    category: "backend",
    color: "bg-gray-700",
  },
  {
    id: "nestjs",
    name: "NestJS",
    icon: <Shield className="w-5 h-5" />,
    category: "backend",
    color: "bg-red-600",
  },
  {
    id: "django",
    name: "Django",
    icon: <Server className="w-5 h-5" />,
    category: "backend",
    color: "bg-green-700",
  },
  {
    id: "flask",
    name: "Flask",
    icon: <Server className="w-5 h-5" />,
    category: "backend",
    color: "bg-gray-600",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    icon: <Zap className="w-5 h-5" />,
    category: "backend",
    color: "bg-teal-600",
  },
  {
    id: "spring",
    name: "Spring Boot",
    icon: <Layers className="w-5 h-5" />,
    category: "backend",
    color: "bg-green-500",
  },
  {
    id: "dotnet",
    name: ".NET Core",
    icon: <Server className="w-5 h-5" />,
    category: "backend",
    color: "bg-purple-600",
  },

  // Programming Languages
  {
    id: "html",
    name: "HTML",
    icon: <Globe className="w-5 h-5" />,
    category: "language",
    color: "bg-orange-500",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: <Terminal className="w-5 h-5" />,
    category: "language",
    color: "bg-yellow-400",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: <Code2 className="w-5 h-5" />,
    category: "language",
    color: "bg-blue-600",
  },
  {
    id: "python",
    name: "Python",
    icon: <Brain className="w-5 h-5" />,
    category: "language",
    color: "bg-yellow-500",
  },
  {
    id: "java",
    name: "Java",
    icon: <Code2 className="w-5 h-5" />,
    category: "language",
    color: "bg-red-600",
  },
  {
    id: "csharp",
    name: "C#",
    icon: <Code2 className="w-5 h-5" />,
    category: "language",
    color: "bg-purple-500",
  },
  {
    id: "go",
    name: "Go",
    icon: <Zap className="w-5 h-5" />,
    category: "language",
    color: "bg-cyan-500",
  },
  {
    id: "rust",
    name: "Rust",
    icon: <Shield className="w-5 h-5" />,
    category: "language",
    color: "bg-orange-600",
  },
  {
    id: "php",
    name: "PHP",
    icon: <Globe className="w-5 h-5" />,
    category: "language",
    color: "bg-indigo-600",
  },

  // Mobile Development
  {
    id: "reactnative",
    name: "React Native",
    icon: <Code2 className="w-5 h-5" />,
    category: "mobile",
    color: "bg-blue-400",
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: <Layers className="w-5 h-5" />,
    category: "mobile",
    color: "bg-blue-300",
  },
  {
    id: "swift",
    name: "Swift",
    icon: <Code2 className="w-5 h-5" />,
    category: "mobile",
    color: "bg-orange-500",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: <Code2 className="w-5 h-5" />,
    category: "mobile",
    color: "bg-purple-400",
  },

  // Databases
  {
    id: "mongodb",
    name: "MongoDB",
    icon: <Database className="w-5 h-5" />,
    category: "database",
    color: "bg-green-700",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: <Database className="w-5 h-5" />,
    category: "database",
    color: "bg-blue-700",
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: <Database className="w-5 h-5" />,
    category: "database",
    color: "bg-orange-600",
  },
  {
    id: "redis",
    name: "Redis",
    icon: <Database className="w-5 h-5" />,
    category: "database",
    color: "bg-red-500",
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: <Zap className="w-5 h-5" />,
    category: "database",
    color: "bg-yellow-600",
  },

  // DevOps & Cloud
  {
    id: "docker",
    name: "Docker",
    icon: <Layers className="w-5 h-5" />,
    category: "devops",
    color: "bg-blue-400",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: <Server className="w-5 h-5" />,
    category: "devops",
    color: "bg-blue-600",
  },
  {
    id: "aws",
    name: "AWS",
    icon: <Globe className="w-5 h-5" />,
    category: "devops",
    color: "bg-orange-500",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    icon: <Globe className="w-5 h-5" />,
    category: "devops",
    color: "bg-blue-500",
  },
  {
    id: "azure",
    name: "Azure",
    icon: <Globe className="w-5 h-5" />,
    category: "devops",
    color: "bg-blue-600",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: <Zap className="w-5 h-5" />,
    category: "devops",
    color: "bg-gray-800",
  },
  {
    id: "netlify",
    name: "Netlify",
    icon: <Globe className="w-5 h-5" />,
    category: "devops",
    color: "bg-teal-500",
  },
];

// Questions Data - Enhanced with more comprehensive questions
const QUESTIONS: Question[] = [
  // React Questions
  {
    id: "react-1",
    techId: "react",
    question: "How would you rate your React experience?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "react-2",
    techId: "react",
    question: "Which React patterns do you use most frequently?",
    type: "multiple-choice",
    options: [
      "Hooks",
      "Context API",
      "Higher-Order Components",
      "Render Props",
      "Custom Hooks",
    ],
  },
  {
    id: "react-3",
    techId: "react",
    question: "What type of React projects do you prefer building?",
    type: "multiple-choice",
    options: [
      "Single Page Applications",
      "E-commerce Sites",
      "Admin Dashboards",
      "Social Media Apps",
      "Portfolio Sites",
    ],
  },

  // Node.js Questions
  {
    id: "nodejs-1",
    techId: "nodejs",
    question: "Rate your Node.js proficiency",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "nodejs-2",
    techId: "nodejs",
    question: "Which Node.js frameworks do you prefer?",
    type: "multiple-choice",
    options: ["Express.js", "Fastify", "Koa.js", "NestJS", "Hapi.js"],
  },
  {
    id: "nodejs-3",
    techId: "nodejs",
    question: "What do you primarily use Node.js for?",
    type: "multiple-choice",
    options: [
      "REST APIs",
      "GraphQL APIs",
      "Microservices",
      "Real-time Applications",
      "CLI Tools",
    ],
  },

  // Python Questions
  {
    id: "python-1",
    techId: "python",
    question: "Your Python experience level?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "python-2",
    techId: "python",
    question: "Which Python areas interest you most?",
    type: "multiple-choice",
    options: [
      "Web Development",
      "Data Science",
      "Machine Learning",
      "Automation/Scripting",
      "API Development",
    ],
  },
  {
    id: "python-3",
    techId: "python",
    question: "Which Python frameworks do you use?",
    type: "multiple-choice",
    options: ["Django", "Flask", "FastAPI", "Pyramid", "Tornado"],
  },

  // TypeScript Questions
  {
    id: "typescript-1",
    techId: "typescript",
    question: "How comfortable are you with TypeScript?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "typescript-2",
    techId: "typescript",
    question: "Which TypeScript features do you use most?",
    type: "multiple-choice",
    options: [
      "Type Annotations",
      "Interfaces",
      "Generics",
      "Union Types",
      "Decorators",
    ],
  },

  // HTML Questions
  {
    id: "html-1",
    techId: "html",
    question: "How would you rate your HTML experience?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "html-2",
    techId: "html",
    question: "Which HTML features do you work with most?",
    type: "multiple-choice",
    options: [
      "Semantic Elements",
      "Forms & Validation",
      "APIs (Canvas, Geolocation)",
      "Accessibility (ARIA)",
      "Web Components",
    ],
  },
  {
    id: "html-3",
    techId: "html",
    question: "What type of HTML projects do you build?",
    type: "multiple-choice",
    options: [
      "Landing Pages",
      "Web Applications",
      "Email Templates",
      "Documentation Sites",
      "E-commerce Sites",
    ],
  },

  // MongoDB Questions
  {
    id: "mongodb-1",
    techId: "mongodb",
    question: "Rate your MongoDB skills",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "mongodb-2",
    techId: "mongodb",
    question: "Which MongoDB features do you work with?",
    type: "multiple-choice",
    options: [
      "Aggregation Pipeline",
      "Indexing",
      "Sharding",
      "Replication",
      "GridFS",
    ],
  },

  // Vue.js Questions
  {
    id: "vue-1",
    techId: "vue",
    question: "How experienced are you with Vue.js?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "vue-2",
    techId: "vue",
    question: "Which Vue.js features do you prefer?",
    type: "multiple-choice",
    options: ["Composition API", "Options API", "Vuex", "Vue Router", "Pinia"],
  },

  // Docker Questions
  {
    id: "docker-1",
    techId: "docker",
    question: "How familiar are you with Docker?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "docker-2",
    techId: "docker",
    question: "What do you use Docker for?",
    type: "multiple-choice",
    options: [
      "Development Environment",
      "Production Deployment",
      "CI/CD Pipelines",
      "Microservices",
      "Testing",
    ],
  },

  // AWS Questions
  {
    id: "aws-1",
    techId: "aws",
    question: "Rate your AWS experience",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "aws-2",
    techId: "aws",
    question: "Which AWS services do you use most?",
    type: "multiple-choice",
    options: ["EC2", "S3", "Lambda", "RDS", "CloudFormation"],
  },

  // Next.js Questions
  {
    id: "nextjs-1",
    techId: "nextjs",
    question: "How comfortable are you with Next.js?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    id: "nextjs-2",
    techId: "nextjs",
    question: "Which Next.js features do you use?",
    type: "multiple-choice",
    options: [
      "Server-Side Rendering",
      "Static Site Generation",
      "API Routes",
      "Image Optimization",
      "App Router",
    ],
  },
];

// Platforms Data
const PLATFORMS: Platform[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <LinkedInIcon className="w-6 h-6" />,
    description: "Professional networking and career opportunities",
    color: "bg-blue-600",
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: <TwitterIcon className="w-6 h-6" />,
    description: "Tech discussions and industry updates",
    color: "bg-black",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <InstagramIcon className="w-6 h-6" />,
    description: "Visual content and behind-the-scenes",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: <RedditIcon className="w-6 h-6" />,
    description: "Community discussions and knowledge sharing",
    color: "bg-orange-600",
  },
];

export default function DeveloperProfileSetup({
  user,
  onComplete,
}: DeveloperProfileSetupProps = {}) {
  console.log("🚀 DeveloperProfileSetup component is rendering!");
  console.log("👤 User prop received:", user);
  const navigate = useNavigate();

  // Add loading state to prevent blank page
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log("🔧 DeveloperProfileSetup initializing...");
    setIsInitialized(true);
    console.log("✅ DeveloperProfileSetup initialized");
  }, []);

  // Update profile data when user prop changes
  useEffect(() => {
    if (user) {
      console.log("👤 Pre-populating form with user data:", user);

      // Generate a suggested username from Google name if no username exists
      const suggestedUsername =
        user.username ||
        (user.name
          ? user.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, 15)
          : "");

      setProfileData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        username: suggestedUsername || prev.username,
        bio: user.bio || prev.bio,
      }));

      // Pre-populate tech stack if available
      if (user.techStack && Array.isArray(user.techStack) && user.techStack.length > 0) {
        console.log("💻 Pre-populating tech stack:", user.techStack);
        setSelectedTechStacks(user.techStack);
      }

      // Pre-populate platforms if available
      if (user.platformPreferences && Array.isArray(user.platformPreferences) && user.platformPreferences.length > 0) {
        console.log("🌐 Pre-populating platforms:", user.platformPreferences);
        setSelectedPlatforms(user.platformPreferences);
      }
    }
  }, [user]);

  // State declarations MUST come before any early returns
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showSkillAssessmentIntro, setShowSkillAssessmentIntro] =
    useState(false);

  // Answer feedback state
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  } | null>(null);

  // Dynamic questions from API
  const [dynamicQuestions, setDynamicQuestions] = useState<QuizQuestion[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  // Profile data state - pre-populate with Google data
  const [profileData, setProfileData] = useState<ProfileData>({
    username: user?.username || "",
    fullName: user?.name || "",
    bio: "",
  });

  // Username validation state
  const [usernameValidation, setUsernameValidation] = useState<{
    isChecking: boolean;
    isValid: boolean | null;
    message: string;
  }>({
    isChecking: false,
    isValid: null,
    message: "",
  });

  // Username validation function
  const validateUsername = useCallback(
    (username: string): { isValid: boolean; message: string } => {
      if (!username) {
        return { isValid: false, message: "Username is required" };
      }
      if (username.length < 3) {
        return {
          isValid: false,
          message: "Username must be at least 3 characters",
        };
      }
      if (username.length > 20) {
        return {
          isValid: false,
          message: "Username must be less than 20 characters",
        };
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return {
          isValid: false,
          message:
            "Username can only contain letters, numbers, underscore and dash",
        };
      }
      if (/^[0-9]/.test(username)) {
        return {
          isValid: false,
          message: "Username cannot start with a number",
        };
      }
      return { isValid: true, message: "Username format is valid" };
    },
    [],
  );

  // Check username availability
  const checkUsernameAvailability = useCallback(
    async (username: string): Promise<boolean> => {
      // Don't check availability if it's the user's current username
      if (user?.username && username === user.username) {
        return true;
      }

      try {
        const response = await fetch(
          `/api/check-username?username=${encodeURIComponent(username)}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          return data.available;
        }

        // Fallback: simulate check with some common usernames being taken
        const takenUsernames = [
          "admin",
          "user",
          "test",
          "demo",
          "john",
          "jane",
          "developer",
          "coder",
        ];
        return !takenUsernames.includes(username.toLowerCase());
      } catch (error) {
        console.error("Username check failed:", error);
        // Fallback: assume available if API fails
        return true;
      }
    },
    [user?.username],
  );

  // Debounced username validation
  useEffect(() => {
    if (!profileData.username) {
      setUsernameValidation({
        isChecking: false,
        isValid: false,
        message: "Username is required",
      });
      return;
    }

    const formatValidation = validateUsername(profileData.username);
    if (!formatValidation.isValid) {
      setUsernameValidation({
        isChecking: false,
        isValid: false,
        message: formatValidation.message,
      });
      return;
    }

    setUsernameValidation({
      isChecking: true,
      isValid: null,
      message: "Checking availability...",
    });

    const timeoutId = setTimeout(async () => {
      const isAvailable = await checkUsernameAvailability(profileData.username);
      setUsernameValidation({
        isChecking: false,
        isValid: isAvailable,
        message: isAvailable
          ? "Username is available!"
          : "Username is already taken",
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [profileData.username, validateUsername, checkUsernameAvailability]);

  // Handle profile data changes
  const handleProfileDataChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch dynamic questions when tech stacks are selected
  const fetchQuestionsForTechStacks = useCallback(async () => {
    if (selectedTechStacks.length === 0) return;

    setQuestionsLoading(true);
    console.log(
      "🔄 Fetching dynamic questions for tech stacks:",
      selectedTechStacks,
    );

    try {
      const allQuestions: QuizQuestion[] = [];

      // Fetch 2 questions per tech stack from API
      for (const techId of selectedTechStacks) {
        // Map tech stack IDs to question bank tech stacks
        const techStackMapping: { [key: string]: string } = {
          react: "react",
          nodejs: "node",
          python: "python",
          javascript: "javascript",
          typescript: "typescript",
          vue: "vue",
          angular: "angular",
          java: "java",
          go: "go",
          rust: "rust",
          swift: "swift",
          kotlin: "kotlin",
          php: "php",
          mongodb: "mongodb",
          postgresql: "postgresql",
          mysql: "mysql",
          redis: "redis",
          docker: "docker",
          kubernetes: "kubernetes",
          aws: "aws",
          gcp: "gcp",
        };

        const mappedTechStack = techStackMapping[techId] || techId;

        try {
          // First try to get questions from API
          const apiQuestions = await getHybridQuestions(mappedTechStack, 2, []);
          if (apiQuestions.length > 0) {
            allQuestions.push(...apiQuestions);
            console.log(
              `✅ Fetched ${apiQuestions.length} API questions for ${mappedTechStack}`,
            );
          } else {
            // Fallback to local questions
            const localQuestions = QUESTION_BANK.filter(
              (q) => q.techStack === mappedTechStack,
            ).slice(0, 2);
            allQuestions.push(...localQuestions);
            console.log(
              `📚 Using ${localQuestions.length} local questions for ${mappedTechStack}`,
            );
          }
        } catch (error) {
          console.log(
            `⚠️ API failed for ${mappedTechStack}, using local questions`,
          );
          // Fallback to local questions on error
          const localQuestions = QUESTION_BANK.filter(
            (q) => q.techStack === mappedTechStack,
          ).slice(0, 2);
          allQuestions.push(...localQuestions);
        }
      }

      // Shuffle questions for variety
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      setDynamicQuestions(shuffledQuestions);
      console.log(`🎯 Total questions prepared: ${shuffledQuestions.length}`);
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      // Emergency fallback to local questions
      const fallbackQuestions = QUESTION_BANK.slice(
        0,
        selectedTechStacks.length * 2,
      );
      setDynamicQuestions(fallbackQuestions);
    } finally {
      setQuestionsLoading(false);
    }
  }, [selectedTechStacks]);

  // Fetch questions when tech stacks are selected and moving to quiz step
  useEffect(() => {
    if (
      currentStep === 2 &&
      !showSkillAssessmentIntro &&
      selectedTechStacks.length > 0 &&
      dynamicQuestions.length === 0
    ) {
      console.log("🎯 Fetching questions for quiz step...");
      fetchQuestionsForTechStacks();
    }
  }, [
    currentStep,
    showSkillAssessmentIntro,
    selectedTechStacks,
    dynamicQuestions.length,
    fetchQuestionsForTechStacks,
  ]);

  // Get questions for selected tech stacks
  const getQuestionsForSelectedTech = (): QuizQuestion[] => {
    return dynamicQuestions;
  };

  // Get current question
  const getCurrentQuestion = () => {
    const questions = getQuestionsForSelectedTech();
    return questions[currentQuestionIndex] || null;
  };

  // Calculate progress for Q&A step
  const calculateQAProgress = () => {
    const totalQuestions = getQuestionsForSelectedTech().length;
    return totalQuestions > 0
      ? (currentQuestionIndex / totalQuestions) * 100
      : 0;
  };

  // Handle tech stack selection
  const toggleTechStack = (techId: string) => {
    setSelectedTechStacks((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    );
  };

  // Handle platform selection
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId],
    );
  };

  // Handle answer submission with feedback and auto-continue
  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || showAnswerFeedback) return;

    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Store the answer feedback
    setLastAnswer({
      questionId: currentQuestion.id,
      selectedIndex,
      isCorrect,
    });

    // Store the answer
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === currentQuestion.id);
      if (existing) {
        return prev.map((a) =>
          a.questionId === currentQuestion.id
            ? { ...a, value: selectedIndex }
            : a,
        );
      }
      return [
        ...prev,
        { questionId: currentQuestion.id, value: selectedIndex },
      ];
    });

    // Show feedback immediately
    setShowAnswerFeedback(true);

    // Auto-continue after 1.5 seconds
    setTimeout(() => {
      setShowAnswerFeedback(false);
      setLastAnswer(null);
      nextQuestion();
    }, 1500);
  };

  // Auto-continue to next question
  const nextQuestion = () => {
    const questions = getQuestionsForSelectedTech();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentStep(3); // Move to platform selection
    }
  };

  // Navigation handlers
  const nextStep = () => {
    console.log(
      "🔄 nextStep called - currentStep:",
      currentStep,
      "selectedTechStacks:",
      selectedTechStacks.length,
    );
    if (currentStep === 0) {
      console.log("📝 Moving to step 1 (tech stack selection)");
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (selectedTechStacks.length > 0) {
        console.log("🎯 Showing quiz intro screen");
        setShowSkillAssessmentIntro(true);
      } else {
        console.log(
          "⏭️ Skipping quiz - no tech stacks selected, moving to step 3",
        );
        setCurrentStep(3);
      }
    } else if (currentStep === 2) {
      const questions = getQuestionsForSelectedTech();
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCurrentStep(3);
      }
    }
  };

  const prevStep = () => {
    if (showSkillAssessmentIntro) {
      setShowSkillAssessmentIntro(false);
    } else if (currentStep === 2 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentStep === 2 && currentQuestionIndex === 0) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      const questions = getQuestionsForSelectedTech();
      setCurrentStep(2);
      setCurrentQuestionIndex(questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    console.log(
      "canProceed check - currentStep:",
      currentStep,
      "showSkillAssessmentIntro:",
      showSkillAssessmentIntro,
    );
    if (showSkillAssessmentIntro) {
      console.log("Cannot proceed: on intro screen");
      return false; // No next button on intro screen
    }
    if (currentStep === 0) {
      // Username and full name are both required, and username must be valid and available
      const canProceedStep0 =
        profileData.username &&
        profileData.fullName &&
        usernameValidation.isValid === true &&
        !usernameValidation.isChecking;
      console.log("Step 0 canProceed:", canProceedStep0, {
        username: profileData.username,
        fullName: profileData.fullName,
        usernameValid: usernameValidation.isValid,
        checking: usernameValidation.isChecking,
      });
      return canProceedStep0;
    }
    if (currentStep === 1) {
      const canProceedStep1 = selectedTechStacks.length > 0;
      console.log(
        "Step 1 canProceed:",
        canProceedStep1,
        "selectedTechStacks:",
        selectedTechStacks.length,
      );
      return canProceedStep1;
    }
    if (currentStep === 2) {
      const currentQuestion = getCurrentQuestion();
      const questions = getQuestionsForSelectedTech();

      // If no current question, it means all questions are completed
      if (!currentQuestion) {
        console.log(
          "Step 2 canProceed: All questions completed, allowing proceed",
        );
        return true;
      }

      const canProceedStep2 =
        currentQuestion &&
        answers.some((a) => a.questionId === currentQuestion.id);
      console.log(
        "Step 2 canProceed:",
        canProceedStep2,
        "currentQuestion:",
        currentQuestion?.id,
        "answers:",
        answers.length,
      );
      return canProceedStep2;
    }
    if (currentStep === 3) {
      // For the final step, allow proceeding even without platform selection for testing
      console.log(
        "Step 3 (final) - allowing proceed, selectedPlatforms:",
        selectedPlatforms.length,
      );
      return true; // Always allow completion of final step
    }
    console.log("Default: allowing proceed");
    return true;
  };

  // Render Step 0: Profile Setup
  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <p className="text-gray-500 text-base">Essential details for your public profile</p>
        {user && (
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-3 max-w-sm mx-auto flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-green-700 text-xs text-left">
              <strong>Google Sync:</strong> Details automatically pre-filled to save your time.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Username *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Choose a unique username"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-400 pr-10 ${usernameValidation.isValid === false
                ? "border-red-300"
                : usernameValidation.isValid === true
                  ? "border-green-300"
                  : "border-gray-200"
                }`}
              required
              value={profileData.username}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/[^a-zA-Z0-9_-]/g, "");
                handleProfileDataChange("username", value);
              }}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {usernameValidation.isChecking && (
                <Loader className="h-4 w-4 text-gray-400 animate-spin" />
              )}
              {!usernameValidation.isChecking && usernameValidation.isValid === true && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              {!usernameValidation.isChecking && usernameValidation.isValid === false && profileData.username && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
          {usernameValidation.message && (
            <p className={`text-xs ml-1 ${usernameValidation.isValid === false ? "text-red-600" : "text-green-600"}`}>
              {usernameValidation.message}
            </p>
          )}
          {profileData.username && usernameValidation.isValid === true && (
            <div className="mt-2 py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Profile Preview</p>
              <p className="text-xs font-mono text-green-700 truncate">showwork.in/<strong>{profileData.username}</strong></p>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name *</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            required
            value={profileData.fullName}
            onChange={(e) => handleProfileDataChange("fullName", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Professional Bio</label>
          <textarea
            placeholder="Share a brief summary of your journey..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-900"
            value={profileData.bio}
            onChange={(e) => handleProfileDataChange("bio", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  // Render Skill Assessment Introduction
  const renderSkillAssessmentIntro = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Skill Assessment <span className="text-green-600 ml-2">• Validate Expertise</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Answer a quick question for each selected technology to personalize your showcase experience.
          </p>
        </div>

        {/* Selected Technologies Preview */}
        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
          <div className="flex flex-wrap justify-center gap-2">
            {selectedTechStacks.map((techId) => {
              const tech = TECH_STACKS.find((t) => t.id === techId);
              if (!tech) return null;
              return (
                <div
                  key={tech.id}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${tech.color} text-white text-xs font-medium shadow-sm`}
                >
                  <div className="bg-white/20 p-0.5 rounded-md">{tech.icon}</div>
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Information Cards - Premium Style */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">One question per tech</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quick, focused evaluation for each skill.</p>
            </div>
          </div>

          <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 flex items-center space-x-4">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Tailored Feedback</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personalized content based on your results.</p>
            </div>
          </div>
        </div>

        {/* Action Section - Merged & Compact */}
        <div className="text-center space-y-4 pt-2">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => {
                setShowSkillAssessmentIntro(false);
                setCurrentStep(2);
                setCurrentQuestionIndex(0);
                fetchQuestionsForTechStacks();
              }}
              disabled={questionsLoading}
              className={`group px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-3 ${questionsLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1E40AF] text-white hover:bg-[#1D4ED8]"
                }`}
            >
              {questionsLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <span>Start Quiz</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-xs text-gray-500">Ready to begin? You can update tech stack later.</p>
          </div>

          {/* Progress Mini Info */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 bg-gray-50/50 border border-gray-100 rounded-lg py-2 max-w-xs mx-auto">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#1E40AF]">{selectedTechStacks.length * 2}</span>
              <span>Questions</span>
            </div>
            <div className="w-px h-3 bg-gray-200" />
            <div className="flex items-center space-x-2">
              <span>Fresh API Data 🌐</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderTechStackSelection = () => {
    const categories = {
      frontend: "Frontend Frameworks",
      backend: "Backend & APIs",
      language: "Programming Languages",
      mobile: "Mobile Development",
      database: "Databases",
      devops: "DevOps & Cloud",
    };

    const groupedTechStacks = Object.entries(categories).map(
      ([categoryKey, categoryName]) => ({
        name: categoryName,
        technologies: TECH_STACKS.filter(
          (tech) => tech.category === categoryKey,
        ),
      }),
    );

    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Tech Stack</h2>
          <p className="text-gray-500 text-sm">Select the technologies you work with for a personalized profile.</p>
        </div>

        <div className="space-y-6">
          {groupedTechStacks.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center border-b border-gray-100 pb-1">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.technologies.map((tech) => {
                  const isSelected = selectedTechStacks.includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      onClick={() => toggleTechStack(tech.id)}
                      className={`group relative px-4 py-2 rounded-full border transition-all duration-300 transform flex items-center space-x-2 min-w-[120px] justify-center ${isSelected
                        ? `${tech.color} border-white/20 shadow-md scale-105`
                        : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded transition-all duration-300 ${isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-50 text-gray-500"
                          }`}
                      >
                        {tech.icon}
                      </div>
                      <span
                        className={`font-medium text-xs transition-all duration-300 ${isSelected
                          ? "text-white"
                          : "text-gray-600 group-hover:text-gray-900"
                          }`}
                      >
                        {tech.name}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-2.5 h-2.5 text-blue-600" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedTechStacks.length > 0 && (
          <div className="text-center bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#1E40AF] rounded-full animate-pulse"></div>
              <p className="text-[#1E40AF] font-bold text-xs uppercase tracking-wider">
                {selectedTechStacks.length} Selected
              </p>
            </div>
            <p className="text-gray-500 text-[10px] uppercase font-bold">
              🌐 Fresh Questions Prepared: {selectedTechStacks.length * 2}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render Step 2: Q&A
  const renderQuestionsStep = () => {
    const currentQuestion = getCurrentQuestion();
    const questions = getQuestionsForSelectedTech();
    const currentTech = currentQuestion
      ? TECH_STACKS.find(
        (t) =>
          t.id === currentQuestion.techStack ||
          selectedTechStacks.find((ts) =>
            ts.includes(currentQuestion.techStack),
          ),
      )
      : null;
    const currentAnswer = answers.find(
      (a) => a.questionId === currentQuestion?.id,
    );
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Show loading state while questions are being fetched
    if (questionsLoading) {
      return (
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <Loader className="w-12 h-12 animate-spin text-[#1E40AF]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Preparing Your Quiz
          </h3>
          <p className="text-gray-600">
            Fetching fresh questions from our database...
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 max-w-md mx-auto">
            <p className="text-[#1E40AF] text-sm font-medium">
              Getting {selectedTechStacks.length * 2} personalized questions for
              your selected technologies
            </p>
          </div>
        </div>
      );
    }

    if (!currentQuestion) {
      return (
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900">Great job!</h3>
          <p className="text-gray-600">
            You've answered all the questions for your selected technologies.
          </p>
        </div>
      );
    }

    // Find the appropriate tech for display
    const displayTech = TECH_STACKS.find(
      (t) =>
        (currentQuestion.techStack === "react" && t.id === "react") ||
        (currentQuestion.techStack === "node" && t.id === "nodejs") ||
        (currentQuestion.techStack === "javascript" && t.id === "javascript") ||
        (currentQuestion.techStack === "python" && t.id === "python") ||
        (currentQuestion.techStack === "typescript" && t.id === "typescript") ||
        (currentQuestion.techStack === "vue" && t.id === "vue") ||
        (currentQuestion.techStack === "angular" && t.id === "angular"),
    ) || {
      id: currentQuestion.techStack,
      name:
        currentQuestion.techStack.charAt(0).toUpperCase() +
        currentQuestion.techStack.slice(1),
      icon: <Code2 className="w-4 h-4" />,
      color: "bg-blue-500",
    };

    return (
      <div className="space-y-4">
        {/* Progress Header - Ultra Compact */}
        <div className="flex items-center justify-between px-1">
          <div className={`flex items-center space-x-2 px-2.5 py-1 rounded-full ${displayTech.color} text-white shadow-sm`}>
            {displayTech.icon && React.isValidElement(displayTech.icon) && (
              <div className="bg-white/20 p-0.5 rounded">
                {React.cloneElement(displayTech.icon as React.ReactElement, { className: 'w-3 h-3' })}
              </div>
            )}
            <span className="font-bold text-[10px] uppercase tracking-wider">{displayTech.name}</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="text-right">
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Step</p>
              <p className="text-xs font-bold text-slate-700">
                {currentQuestionIndex + 1}/{questions.length}
              </p>
            </div>
            <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card - Streamlined */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="grid gap-1.5">
              {currentQuestion.options.map((option, index) => {
                const isSelected = lastAnswer?.selectedIndex === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isWrong = showAnswerFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => !showAnswerFeedback && handleAnswer(index)}
                    disabled={showAnswerFeedback}
                    className={`group p-2.5 rounded-lg border transition-all duration-200 text-left relative overflow-hidden ${showAnswerFeedback
                      ? isCorrect
                        ? "border-green-500 bg-green-50/50 dark:bg-green-900/10"
                        : isWrong
                          ? "border-red-500 bg-red-50/50 dark:bg-red-900/10"
                          : "border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 opacity-60"
                      : isSelected
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${showAnswerFeedback
                          ? isCorrect
                            ? "border-green-500 bg-green-500 text-white"
                            : isWrong
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-slate-300 dark:border-slate-700"
                          : isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 dark:border-slate-700 group-hover:border-slate-400"
                          }`}
                      >
                        {(isSelected || (showAnswerFeedback && isCorrect)) && (
                          <Check className="w-2 h-2" />
                        )}
                        {!isSelected && showAnswerFeedback && isWrong && (
                          <X className="w-2 h-2" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${showAnswerFeedback
                          ? isCorrect
                            ? "text-green-900 dark:text-green-400"
                            : isWrong
                              ? "text-red-900 dark:text-red-400"
                              : "text-slate-400"
                          : isSelected
                            ? "text-blue-900 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300"
                          }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Step 3: Platform Selection
  const renderPlatformSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Connect Your Platforms</h2>
        <p className="text-gray-500 text-sm">Choose where you want to showcase your work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORMS.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const isComingSoon = platform.comingSoon;

          return (
            <button
              key={platform.id}
              onClick={() => !isComingSoon && togglePlatform(platform.id)}
              disabled={isComingSoon}
              className={`p-4 rounded-xl border transition-all duration-300 text-left flex flex-col h-full relative ${isComingSoon
                  ? "bg-gray-50/50 border-gray-100 opacity-80 cursor-not-allowed"
                  : isSelected
                    ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.02]"
                    : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm"
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${isComingSoon ? "bg-gray-300" : platform.color} text-white`}>
                  {React.cloneElement(platform.icon as React.ReactElement, { className: 'w-5 h-5' })}
                </div>
                {isSelected && !isComingSoon && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {isComingSoon && (
                  <span className="text-[9px] font-bold bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    Soon
                  </span>
                )}
              </div>
              <h3 className={`font-bold text-sm mb-1 ${isComingSoon ? "text-gray-400" : "text-slate-900"}`}>
                {platform.name}
              </h3>
              <p className={`text-[11px] leading-relaxed flex-1 ${isComingSoon ? "text-gray-400" : "text-slate-500"}`}>
                {platform.description}
              </p>
            </button>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="text-center bg-blue-50/50 border border-blue-100 rounded-lg py-2 max-w-sm mx-auto">
          <p className="text-[#1E40AF] font-bold text-xs uppercase tracking-wider">
            {selectedPlatforms.length} Platform{selectedPlatforms.length === 1 ? "" : "s"} Connected
          </p>
        </div>
      )}
    </div>
  );

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Loading Profile Setup
          </h2>
          <p className="text-gray-600">
            Preparing your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  const LeftPanelContent = (
    <div className="h-full flex flex-col justify-between py-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Login</span>
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Profile Setup</h1>
          </div>
          <p className="text-white/80 text-lg leading-relaxed">
            Complete your developer profile in 4 easy steps to showcase your
            skills and connect with opportunities.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-6 my-auto">
        {[
          {
            number: 1,
            title: "Basic Information",
            description: "Username and personal details",
            icon: <Users className="w-5 h-5" />,
          },
          {
            number: 2,
            title: "Tech Stack",
            description: "Select your technologies",
            icon: <Code2 className="w-5 h-5" />,
          },
          {
            number: 3,
            title: "Skill Assessment",
            description: "Quick skill evaluation",
            icon: <Brain className="w-5 h-5" />,
          },
          {
            number: 4,
            title: "Platform Selection",
            description: "Choose your platforms",
            icon: <Globe className="w-5 h-5" />,
          },
        ].map((step, index) => {
          const isActive = !showSkillAssessmentIntro && currentStep === index;
          const isCompleted =
            !showSkillAssessmentIntro && currentStep > index;
          const isIntroActive = showSkillAssessmentIntro && index === 2;

          return (
            <div key={step.number} className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${isCompleted
                  ? "bg-white text-[#1E40AF]"
                  : isActive || isIntroActive
                    ? "bg-white text-[#1E40AF] ring-4 ring-white/30"
                    : "bg-white/20 text-white/60"
                  }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : isActive || isIntroActive ? (
                  step.icon
                ) : (
                  step.number
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold transition-colors duration-300 ${isActive || isCompleted || isIntroActive
                    ? "text-white"
                    : "text-white/60"
                    }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${isActive || isCompleted || isIntroActive
                    ? "text-white/80"
                    : "text-white/40"
                    }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-white/80 text-sm mb-2">
          <span>Progress</span>
          <span>
            {showSkillAssessmentIntro
              ? "50%"
              : currentStep === 0
                ? "25%"
                : currentStep === 1
                  ? "50%"
                  : currentStep === 2
                    ? `${50 + calculateQAProgress() * 0.25}%`
                    : "100%"}
          </span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{
              width: showSkillAssessmentIntro
                ? "50%"
                : currentStep === 0
                  ? "25%"
                  : currentStep === 1
                    ? "50%"
                    : currentStep === 2
                      ? `${50 + calculateQAProgress() * 0.25}%`
                      : "100%",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <UnifiedLayout activePage="profile-setup" showAuthButtons={true}>
      <div className="flex h-full w-full overflow-hidden">
        {/* Left Section - Internal Illustration Split */}
        <div className="hidden xl:flex w-1/3 bg-[#0F172A] text-white p-12 flex-col justify-center relative overflow-hidden h-full">
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-600/15 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "-5s" }}></div>
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "-3s" }}></div>

            {/* Subtle Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          </div>
          <div className="relative z-10 h-full">
            {LeftPanelContent}
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col h-full overflow-hidden">
          <style dangerouslySetInnerHTML={{
            __html: `
            .scrollbar-hide-container::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide-container py-8 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                {(() => {
                  if (showSkillAssessmentIntro) {
                    return renderSkillAssessmentIntro();
                  } else if (currentStep === 0) {
                    return renderProfileStep();
                  } else if (currentStep === 1) {
                    return renderTechStackSelection();
                  } else if (currentStep === 2) {
                    return renderQuestionsStep();
                  } else if (currentStep === 3) {
                    return renderPlatformSelection();
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>

          {/* Navigation Footer - Sticky at bottom */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-6 md:px-12 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            {/* Previous Button */}
            <button
              onClick={prevStep}
              disabled={currentStep === 0 && !showSkillAssessmentIntro}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${currentStep === 0 && !showSkillAssessmentIntro
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {showSkillAssessmentIntro
                ? "Back to Tech Stack"
                : currentStep === 0
                  ? "Login"
                  : "Previous"}
            </button>

            {/* Next/Complete Button */}
            {!showSkillAssessmentIntro && (
              <button
                onClick={async () => {
                  if (currentStep === 3) {
                    setIsCompleting(true);
                    try {
                      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
                      const response = await fetch(`${apiBaseUrl}/api/profile/update`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                          name: profileData.fullName,
                          username: profileData.username,
                          bio: profileData.bio,
                          techStack: selectedTechStacks,
                          platformPreferences: selectedPlatforms,
                        }),
                      });

                      if (response.ok) {
                        const result = await response.json();
                        const updatedUser = {
                          ...result.user,
                          profileCompleted: true,
                        };
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        if (onComplete) {
                          onComplete(profileData);
                        } else {
                          navigate("/dashboard");
                        }
                      } else {
                        await response.json(); // Consuming the response without storing
                        alert("Failed to save profile. Please try again.");
                        setIsCompleting(false);
                      }
                    } catch (error) {
                      alert("An error occurred while saving your profile. Please try again.");
                      setIsCompleting(false);
                    }
                  } else {
                    nextStep();
                  }
                }}
                disabled={!canProceed()}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-300 ${canProceed() && !isCompleting
                  ? "bg-[#1E40AF] text-white hover:bg-[#1D4ED8]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {isCompleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Profile...
                  </>
                ) : (
                  <>
                    {currentStep === 3 ? "Complete Setup" : "Continue"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Custom Slider Styles - using regular CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #1E40AF;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #1E40AF;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
        `,
        }}
      />
    </UnifiedLayout >
  );
}
