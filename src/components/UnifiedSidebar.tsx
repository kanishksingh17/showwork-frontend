import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Users,
  FolderOpen,
  Settings,
  LogOut,
  Briefcase,
  Plug,
  FileText,
  PanelLeftClose,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

interface UnifiedSidebarProps {
  currentPage?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  showAuthButtons?: boolean;
}

export const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  currentPage,
  isOpen = true, // Default to true if not provided
  onToggle,
  showAuthButtons = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // NOTE: This sidebar is completely static - navigation items never change order or position

  // Determine current page from location
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    const path = location.pathname;
    
    // Exact matches or startsWith for both demo and main routes
    if (path === "/dashboard" || path === "/") return "dashboard";
    if (path === "/content" || path.startsWith("/content/") || path === "/demo-content") return "content";
    if (path === "/showcase" || path.startsWith("/showcase/") || path === "/demo-showcase") return "showcase";
    if (path === "/analytics" || path === "/demo-analytics") return "analytics";
    if (path === "/community") return "community";
    if (path === "/integrations") return "integrations";
    if (path === "/portfolio/manage") return "portfolio-manage";
    if (path === "/portfolio" || path.startsWith("/portfolio/") || path === "/demo-portfolio") {
      return "portfolio";
    }
    if (path === "/resume" || path.startsWith("/resume/") || path === "/demo-resume") return "resume";
    
    return "dashboard";
  };

  const activePage = getCurrentPage();

  const handleLogout = async () => {
    try {
      await logout();
      // Clear specific app draft data not handled by AuthContext
      localStorage.removeItem("project-draft-unified");
      
      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Sidebar logout error:", error);
      navigate("/login");
    }
  };

  // Grouped navigation items with requested hierarchy
  const allNavigationGroups = [
    {
      title: "WORKSPACE",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { id: "portfolio", label: "Portfolio", icon: FolderOpen, path: "/portfolio" },
        { id: "resume", label: "Resume", icon: User, path: "/resume" },
        { id: "showcase", label: "Showcase", icon: Package, path: "/showcase" },
        { id: "portfolio-manage", label: "Asset Manager", icon: Briefcase, path: "/portfolio/manage" },
        { id: "content", label: "Content", icon: FileText, path: "/content" },
      ]
    },
    {
      title: "GROWTH",
      items: [
        { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
        { id: "community", label: "Community", icon: Users, path: "/community" },
      ]
    },

    {
      title: "SYSTEM",
      items: [
        { id: "integrations", label: "Integrations", icon: Plug, path: "/integrations" },
        { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
      ]
    }
  ];

  // Filter groups for onboarding mode (when showAuthButtons is true OR we are on the login/landing/demo pages)
  const isOnboardingMode = showAuthButtons ||
    !isAuthenticated ||
    location.pathname === '/login' ||
    location.pathname.startsWith('/demo-') ||
    location.pathname === '/';

  const navigationGroups = isOnboardingMode
    ? allNavigationGroups.map(group => ({
      ...group,
      items: group.items
        .filter(item => ['dashboard', 'portfolio', 'content', 'showcase', 'analytics', 'resume'].includes(item.id))
        .map(item => {
          if (item.id === 'dashboard') return { ...item, path: "/", state: { fromDemo: true } };
          if (item.id === 'portfolio') return { ...item, path: "/demo-portfolio" };
          if (item.id === 'showcase') return { ...item, path: "/demo-showcase" };
          if (item.id === 'content') return { ...item, path: "/demo-content" };
          if (item.id === 'analytics') return { ...item, path: "/demo-analytics" };
          if (item.id === 'resume') return { ...item, path: "/demo-resume" };
          return item;
        })
    })).filter(group => group.items.length > 0)
    : allNavigationGroups;

  return (
    <aside
      className={`h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex flex-col rounded-[2.5rem] shadow-lg overflow-hidden border border-slate-200/10 dark:border-slate-800 transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"
        }`}
    >
      {/* Logo Section - Fixed Position */}
      <div
        className={`flex items-center ${isOpen ? "p-6 pb-3 gap-12 justify-between" : "justify-center pt-6 pb-3"}`}
        data-sidebar-open={isOpen}
      >
        {isOpen ? (
          <>
            <div className="flex items-center space-x-3 flex-1">
              <img src="/favicon.svg" alt="ShowWork Logo" className="w-9 h-9 object-contain" />
              <h1 className="text-xl font-extrabold text-white animate-in fade-in duration-200">ShowWork</h1>
            </div>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white lg:block hidden shrink-0"
                aria-label="Collapse Sidebar"
              >
                <PanelLeftClose className="size-5" />
              </button>
            )}
          </>
        ) : (
          <div
            className="relative group cursor-pointer flex justify-center items-center w-full px-1"
            onClick={onToggle}
            title="Expand Sidebar"
          >
            {/* Logo that scales on hover/state */}
            <img
              src="/favicon.svg"
              alt="ShowWork Logo"
              className="w-8 h-8 object-contain transition-all duration-300 group-hover:opacity-20 group-hover:scale-90"
            />

            {/* Overlay Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
              <PanelLeftClose className="size-6 text-white rotate-180" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Section - Grouped */}
      <nav
        className="flex-1 px-4 py-2 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {navigationGroups.map((group) => (
          <div key={group.title}>
            {isOpen && (
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 animate-in fade-in duration-200">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePage === item.id;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center ${isOpen ? "px-4" : "justify-center px-0"} py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                      }`}
                    onClick={() => navigate(item.path, { state: (item as any).state })}
                    title={!isOpen ? item.label : undefined}
                  >
                    <IconComponent className={`w-5 h-5 ${isOpen ? "mr-3" : ""}`} />
                    {isOpen && <span className="animate-in fade-in duration-200">{item.label}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section - Fixed Utility Links, Static Order */}
      <div className="px-4 py-2 border-t border-gray-700">
        {showAuthButtons ? (
          <div className="space-y-2">
            <div
              className={`flex items-center ${isOpen ? "px-4" : "justify-center px-0"} py-2.5 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200`}
              onClick={() => navigate("/login")}
              title={!isOpen ? "Sign In" : undefined}
            >
              <LogOut className={`w-5 h-5 ${isOpen ? "mr-3" : ""} rotate-180`} />
              {isOpen && <span className="animate-in fade-in duration-200">Sign In</span>}
            </div>
            {isOpen && (
              <button
                onClick={() => navigate("/login")} // Assuming /login handles both or there's no separate /signup route based on imports. If /signup exists, change this.
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                Sign Up
              </button>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center ${isOpen ? "px-4" : "justify-center px-0"} py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200`}
            onClick={handleLogout}
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className={`w-5 h-5 ${isOpen ? "mr-3" : ""}`} />
            {isOpen && <span className="animate-in fade-in duration-200">Logout</span>}
          </div>
        )}
      </div>
    </aside>
  );
};
