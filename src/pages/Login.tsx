import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ArrowLeft,
  Code2,
  Eye,
  EyeOff,
} from "lucide-react";
import { UnifiedLayout } from "../components/UnifiedLayout";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialLoading, setSocialLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If user is already logged in, redirect to dashboard
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isSignup) {
        // Registration logic - Use real API
        if (form.password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        // Use real API for registration
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

        const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const result = await response.json();

        // Auto-login after successful registration
        const loginResponse = await fetch(`${apiBaseUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        if (!loginResponse.ok) {
          throw new Error("Registration successful but login failed. Please log in manually.");
        }

        const loginResult = await loginResponse.json();

        // Store user data in localStorage
        localStorage.setItem("token", "authenticated");
        localStorage.setItem("user", JSON.stringify(loginResult.user));

        setSuccess("Account created successfully!");

        // Redirect to profile setup if not completed
        setTimeout(() => {
          if (!loginResult.user.profileCompleted || !loginResult.user.username) {
            navigate("/profile-setup");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        // Login logic - Use real API
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

        const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Invalid email or password");
        }

        const result = await response.json();

        // Store user data in localStorage
        localStorage.setItem("token", "authenticated");
        localStorage.setItem("user", JSON.stringify(result.user));

        setSuccess("Login successful!");

        // Redirect to profile setup if not completed, otherwise to dashboard
        setTimeout(() => {
          if (!result.user.profileCompleted || !result.user.username) {
            navigate("/profile-setup");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(isSignup ? "Signup failed" : "Login failed");
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    setSocialLoading(provider);
    console.log(`${provider} OAuth login initiated`);

    // Get API base URL from environment or use fallback
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    // Redirect to backend OAuth endpoints (mounted at /api/auth)
    if (provider === "google") {
      window.location.href = `${apiBaseUrl}/api/auth/google`;
    } else if (provider === "github") {
      window.location.href = `${apiBaseUrl}/api/auth/github`;
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  const LeftPanelContent = (
    <div className="flex-grow flex flex-col justify-center pt-8">
      <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
        Discover Your Potential
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-300">
        What are your career aspirations? Let us help you map your journey and showcase your achievements.
      </p>
      <div className="mt-10 space-y-4">
        {[
          {
            title: "Find my next job",
            desc: "Perfect for active job seekers",
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7v3h4v8h-8v-8h4V7zm-2-2h4a2 2 0 012 2v1h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2h4V7a2 2 0 012-2z" />
              </svg>
            )
          },
          {
            title: "Build my portfolio",
            desc: "Showcase your skills and projects",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            )
          },
          {
            title: "Grow my network",
            desc: "Connect with peers and mentors",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          }
        ].map((item, index) => (
          <button key={index} className="w-full text-left p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-4 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <UnifiedLayout activePage="login" showAuthButtons={true}>
      <div className="flex h-full w-full overflow-hidden">
        {/* Left Section - Internal Illustration Split */}
        <div className="hidden xl:flex w-1/2 bg-[#0F172A] text-white p-12 flex-col justify-center relative overflow-hidden h-full">
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "-5s" }}></div>
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "-3s" }}></div>

            {/* Subtle Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </div>
          <div className="relative z-10">
            {LeftPanelContent}
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 scrollbar-hide-container">
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
          <div className="max-w-md mx-auto py-12 px-6 md:px-12 flex flex-col min-h-full">
            <div className="w-full animate-fade-in-up my-auto">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-8 group hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  ShowWork
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {isSignup ? "Create your account" : "Log in to your account"}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  {isSignup
                    ? "Join thousands of developers showcasing their work"
                    : "Welcome back to ShowWork"}
                </p>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={socialLoading !== ""}
                    className={`flex items-center justify-center py-3 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-medium hover:scale-105 hover:shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ${socialLoading === "google"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                      }`}
                  >
                    {socialLoading === "google" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    disabled={socialLoading !== ""}
                    className={`flex items-center justify-center py-3 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-medium hover:scale-105 hover:shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ${socialLoading === "github"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                      }`}
                  >
                    {socialLoading === "github" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    ) : (
                      <Github className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Form Fields */}
                {isSignup && (
                  <div className="mb-4">
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email or Username"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 mb-4"
                >
                  {isSignup ? "Create Account" : "Log In"}
                </button>

                {/* Forgot Password Link */}
                {!isSignup && (
                  <div className="text-center mb-6">
                    <button
                      type="button"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors"
                      onClick={() => {
                        /* Handle forgot password */
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Error/Success Messages */}
                {error && (
                  <p className="text-red-600 dark:text-red-400 text-center mt-2 font-medium animate-fade-in">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-600 dark:text-green-400 text-center mt-2 font-medium animate-fade-in">
                    {success}
                  </p>
                )}

                {/* Toggle Sign Up/Sign In */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                  {isSignup ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 dark:text-blue-400 hover:opacity-80 font-medium transition-colors"
                        onClick={() => setIsSignup(false)}
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 dark:text-blue-400 hover:opacity-80 font-medium transition-colors"
                        onClick={() => setIsSignup(true)}
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}
