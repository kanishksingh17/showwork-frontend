import React, { Suspense, lazy } from "react";
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
const PortfolioDemo = lazy(() => import("./pages/PortfolioDemo"));
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
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <Router>
        <Suspense fallback={<div className="p-6 text-center text-sm text-gray-500">Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ShowWorkLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/u/:username" element={<PublicProfile />} />
          <Route path="/demo-showcase" element={<ShowcaseDashboard isDemo={true} />} />
          <Route path="/demo-portfolio" element={<PortfolioBuilder isDemo={true} />} />
          <Route path="/demo-content" element={<ContentManagement isDemo={true} />} />
          <Route path="/demo-analytics" element={<Analytics isDemo={true} />} />
          <Route path="/demo/template-03" element={<PortfolioDemo />} />


          {/* Protected routes */}
          <Route path="/profile/setup" element={
            <ProtectedRoute>
              <DeveloperSetupPage />
            </ProtectedRoute>
          } />
          <Route path="/profile-setup" element={
            <ProtectedRoute>
              <DeveloperSetupPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/content" element={
            <ProtectedRoute>
              <ErrorBoundary>
                <ContentManagement />
              </ErrorBoundary>
            </ProtectedRoute>
          } />
          <Route path="/showcase" element={
            <ProtectedRoute>
              <ShowcaseDashboard />
            </ProtectedRoute>
          } />
          <Route path="/showcase/add" element={
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/add" element={<Navigate to="/showcase/add" replace />} />
          <Route path="/showcase/quick-add" element={
            <ProtectedRoute>
              <QuickAdd />
            </ProtectedRoute>
          } />
          <Route path="/showcase/manual-add" element={
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          } />
          <Route path="/showcase/view/:id" element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          } />
          <Route path="/showcase/edit/:id" element={
            <ProtectedRoute>
              <ManualProjectForm />
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/builder" element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/manage" element={
            <ProtectedRoute>
              <PortfolioManagement />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/demo/:templateId" element={
            <ProtectedRoute>
              <PortfolioDemo />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/demo" element={
            <ProtectedRoute>
              <PortfolioDemo />
            </ProtectedRoute>
          } />

          <Route path="/applications" element={
            <ProtectedRoute>
              <ApplicationTracker />
            </ProtectedRoute>
          } />
          <Route path="/interviews" element={
            <ProtectedRoute>
              <ApplicationTracker />
            </ProtectedRoute>
          } />

          <Route path="/integrations" element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />

        </Routes>
        </Suspense>
      </Router>
      <Toaster position="top-right" richColors />
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
