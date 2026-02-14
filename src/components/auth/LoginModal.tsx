import React, { useState } from "react";
import { X, Github, Eye, EyeOff, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onLoginSuccess,
}) => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [socialLoading, setSocialLoading] = useState("");

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSocialLogin = (provider: "google" | "github") => {
        setSocialLoading(provider);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        if (provider === "google") {
            window.location.href = `${apiBaseUrl}/api/auth/google`;
        } else if (provider === "github") {
            window.location.href = `${apiBaseUrl}/api/auth/github`;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
            const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login";

            const body = isSignup
                ? { name: form.name, email: form.email, password: form.password }
                : { email: form.email, password: form.password };

            const response = await fetch(`${apiBaseUrl}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Authentication failed");
            }

            const result = await response.json();

            // If signup successful, we might need to auto-login depending on backend implementation
            // For now assuming response returns user and token or session cookie is set

            localStorage.setItem("token", "authenticated");
            localStorage.setItem("user", JSON.stringify(result.user || {}));

            onLoginSuccess();
            onClose(); // Close modal on success
            navigate("/dashboard"); // Redirect to dashboard or refresh

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200 p-4">
            <div className="relative w-full md:max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex transform transition-all scale-100 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side - Feature Panel */}
                <div className="hidden md:flex flex-col w-5/12 bg-[#172554] p-8 text-white justify-start pt-20 relative overflow-hidden">

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Discover Your Potential</h2>
                        <p className="text-blue-200 mb-8 text-sm leading-relaxed">
                            What are your career aspirations? Let us help you map your journey and showcase your achievements.
                        </p>

                        <div className="space-y-3">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-default group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Find my next job</h3>
                                        <p className="text-xs text-blue-200">Perfect for active job seekers</p>
                                    </div>
                                    <svg className="w-4 h-4 text-blue-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-default group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Build my portfolio</h3>
                                        <p className="text-xs text-blue-200">Showcase your skills and projects</p>
                                    </div>
                                    <svg className="w-4 h-4 text-blue-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-default group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Grow my network</h3>
                                        <p className="text-xs text-blue-200">Connect with peers and mentors</p>
                                    </div>
                                    <svg className="w-4 h-4 text-blue-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-blue-600 rounded p-1">
                                <Code2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">ShowWork</span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {isSignup ? "Create your account" : "Log in to your account"}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            {isSignup ? "Welcome! Please enter your details." : "Welcome back to ShowWork"}
                        </p>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("google")}
                                disabled={socialLoading !== ""}
                                className={`flex items-center justify-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${socialLoading === "google" ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {socialLoading === "google" ? (
                                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
                                className="flex items-center justify-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignup && (
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>
                            )}

                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder={isSignup ? "Email address" : "Email or Username"}
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? "Processing..." : (isSignup ? "Sign Up" : "Log In")}
                            </button>
                        </form>

                        <div className="mt-6 text-center space-y-4">
                            {!isSignup && (
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </button>
                            )}

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    onClick={() => setIsSignup(!isSignup)}
                                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
                                >
                                    {isSignup ? "Log in" : "Sign up"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
