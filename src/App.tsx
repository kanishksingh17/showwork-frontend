import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import EnhancedProjectCreation from "./pages/EnhancedProjectCreation";
import ShowcaseDashboard from "./pages/ShowcaseDashboard";
import ManualProjectForm from "./app/showcase/ManualProjectForm";
import ProjectForm from "./app/showcase/ProjectForm";
import QuickAdd from "./pages/QuickAdd";
import ContentManagement from "./pages/ContentManagement";
import ErrorBoundary from "./components/preview/ErrorBoundary";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Portfolio from "./pages/Portfolio";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import PortfolioDemo from "./pages/PortfolioDemo";
import PortfolioPreviewFull from "./pages/PortfolioPreviewFull";

// ... existing code ...


import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import ShowWorkLanding from "./components/ShowWorkLanding";
import Login from "./pages/Login";
import DeveloperSetupPage from "./pages/DeveloperSetupPage";
import ProjectDetail from "./app/showcase/ProjectDetail";
import { CustomCursor } from "./components/ui/custom-cursor";
import showworkLogo from "/showwork-logo.svg";

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
  // Check for auth bypass flag (development only)
  const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === "true";

  // If bypass is enabled, render children immediately without auth checks
  if (AUTH_BYPASS) {
    return <>{children}</>;
  }

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // First, check localStorage (for local auth)
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
          setIsAuthenticated(true);
          return;
        }

        // If no localStorage, check for session-based authentication (OAuth)
        try {
          const response = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include', // Important: send cookies
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.user) {
              // Session exists, store user info in localStorage for consistency
              localStorage.setItem('authToken', 'session_token');
              localStorage.setItem('user', JSON.stringify(data.user));
              setIsAuthenticated(true);
              return;
            }
          }
        } catch (sessionError) {
          console.log('Session check failed (user not logged in via OAuth):', sessionError);
        }

        // No authentication found
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <a href="/" target="_blank">
            <img src={showworkLogo} className="logo" alt="ShowWork logo" />
          </a>
        </div>
        <h1>ShowWork</h1>
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
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ShowWorkLanding />} />
          <Route path="/login" element={<Login />} />

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
              <EnhancedProjectCreation />
            </ProtectedRoute>
          } />
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
              <ProjectForm />
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
              <Navigate to="/portfolio/builder" replace />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/builder" element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/demo/*" element={
            <ProtectedRoute>
              <PortfolioDemo />
            </ProtectedRoute>
          } />
          <Route path="/portfolio/preview-full" element={
            <ProtectedRoute>
              <PortfolioPreviewFull />
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
        </Routes>
      </Router>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
