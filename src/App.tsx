import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "./components/preview/ErrorBoundary";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ShowcaseDashboard = lazy(() => import("./pages/ShowcaseDashboard"));
const ManualProjectForm = lazy(() => import("./app/showcase/ManualProjectForm"));
const QuickAdd = lazy(() => import("./pages/QuickAdd"));
const ContentManagement = lazy(() => import("./pages/ContentManagement"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Community = lazy(() => import("./pages/Community"));
const PortfolioBuilder = lazy(() => import("./pages/PortfolioBuilder"));
const PortfolioManagement = lazy(() => import("./pages/PortfolioManagement"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const ApplicationTracker = lazy(() => import("./pages/ApplicationTracker"));

// ... existing code ...

const Integrations = lazy(() => import("./pages/Integrations"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const ShowWorkLanding = lazy(() => import("./components/ShowWorkLanding"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DeveloperSetupPage = lazy(() => import("./pages/DeveloperSetupPage"));
const ProjectDetail = lazy(() => import("./app/showcase/ProjectDetail"));
import { CustomCursor } from "./components/ui/custom-cursor";
import { useAuth } from "./contexts/useAuth";

// Create QueryClient instance with smart defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute default
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Loading...</span>
    </div>
  </div>
);

const withRouteSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

// Authentication wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();

  // Check for auth bypass flag (development only)
  const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === "true";

  // If bypass is enabled, render children immediately without auth checks
  if (AUTH_BYPASS) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    const preloadLikelyRoutes = () => {
      void import("./pages/Dashboard");
      void import("./pages/ShowcaseDashboard");
      void import("./pages/ContentManagement");
      void import("./pages/Analytics");
      void import("./pages/PortfolioBuilder");
      void import("./pages/ApplicationTracker");
    };

    if (typeof window === "undefined") {
      return;
    }

    if ("requestIdleCallback" in window) {
      const idleId = (window as Window & {
        requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback: (id: number) => void;
      }).requestIdleCallback(preloadLikelyRoutes, { timeout: 1500 });

      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      };
    }

    const timeoutId = globalThis.setTimeout(preloadLikelyRoutes, 700);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={withRouteSuspense(<ShowWorkLanding />)} />
          <Route path="/login" element={withRouteSuspense(<Login />)} />
          <Route path="/u/:username" element={withRouteSuspense(<PublicProfile />)} />
          <Route path="/demo-showcase" element={withRouteSuspense(<ShowcaseDashboard isDemo={true} />)} />
          <Route path="/demo-portfolio" element={withRouteSuspense(<PortfolioBuilder isDemo={true} />)} />
          <Route path="/demo-content" element={withRouteSuspense(<ContentManagement isDemo={true} />)} />
          <Route path="/demo-analytics" element={withRouteSuspense(<Analytics isDemo={true} />)} />
          <Route path="/demo-resume" element={withRouteSuspense(<ResumeBuilder isDemo={true} />)} />
          <Route path="/demo/template-03" element={<Navigate to="/demo-portfolio" replace />} />


          {/* Protected routes */}
          <Route path="/profile/setup" element={withRouteSuspense(
            <ProtectedRoute>
              <DeveloperSetupPage />
            </ProtectedRoute>
          )} />
          <Route path="/profile-setup" element={withRouteSuspense(
            <ProtectedRoute>
              <DeveloperSetupPage />
            </ProtectedRoute>
          )} />
          <Route path="/dashboard" element={withRouteSuspense(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )} />
          <Route path="/content" element={withRouteSuspense(
            <ProtectedRoute>
              <ErrorBoundary>
                <ContentManagement />
              </ErrorBoundary>
            </ProtectedRoute>
          )} />
          <Route path="/showcase" element={withRouteSuspense(
            <ProtectedRoute>
              <ShowcaseDashboard />
            </ProtectedRoute>
          )} />
          <Route path="/showcase/add" element={withRouteSuspense(
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          )} />
          <Route path="/dashboard/add" element={<Navigate to="/showcase/add" replace />} />
          <Route path="/showcase/quick-add" element={withRouteSuspense(
            <ProtectedRoute>
              <QuickAdd />
            </ProtectedRoute>
          )} />
          <Route path="/showcase/manual-add" element={withRouteSuspense(
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          )} />
          <Route path="/showcase/view/:id" element={withRouteSuspense(
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          )} />
          <Route path="/showcase/edit/:id" element={withRouteSuspense(
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          )} />

          <Route path="/analytics" element={withRouteSuspense(
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          )} />
          <Route path="/community" element={withRouteSuspense(
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          )} />
          <Route path="/portfolio" element={withRouteSuspense(
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          )} />
          <Route path="/portfolio/builder" element={withRouteSuspense(
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          )} />
          <Route path="/portfolio/manage" element={withRouteSuspense(
            <ProtectedRoute>
              <PortfolioManagement />
            </ProtectedRoute>
          )} />
          <Route path="/resume" element={withRouteSuspense(
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          )} />

          <Route path="/applications" element={withRouteSuspense(
            <ProtectedRoute>
              <ApplicationTracker />
            </ProtectedRoute>
          )} />
          <Route path="/interviews" element={withRouteSuspense(
            <ProtectedRoute>
              <ApplicationTracker />
            </ProtectedRoute>
          )} />

          <Route path="/integrations" element={withRouteSuspense(
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          )} />
          <Route path="/settings" element={withRouteSuspense(
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          )} />
          <Route path="/profile" element={withRouteSuspense(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )} />

          <Route path="*" element={withRouteSuspense(<NotFound />)} />

        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
