import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authState";

export interface AuthUser {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  image?: string;
  username?: string;
  bio?: string;
  techStack?: string[];
  platformPreferences?: string[];
  createdAt?: string;
  profileCompleted?: boolean;
  [key: string]: unknown;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasHydratedUser, setHasHydratedUser] = useState(false);

  const refreshUser = useCallback(async () => {
    const AUTH_BYPASS = import.meta.env.VITE_AUTH_BYPASS === "true";

    if (AUTH_BYPASS) {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          localStorage.setItem("authToken", "session_token");
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setIsAuthenticated(true);
          return;
        }
      }

      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Hydrate auth state from localStorage first to avoid unnecessary initial auth fetch.
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        void refreshUser();
      }
    } catch {
      void refreshUser();
    } finally {
      setHasHydratedUser(true);
    }
  }, [refreshUser]);

  useEffect(() => {
    if (!hasHydratedUser) return;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [hasHydratedUser, user]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Auth logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated, setUser, refreshUser, logout }),
    [user, isLoading, isAuthenticated, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

