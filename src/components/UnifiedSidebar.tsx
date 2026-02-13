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
} from "lucide-react";

interface UnifiedSidebarProps {
  currentPage?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  currentPage,
  isOpen,
  onToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // NOTE: This sidebar is completely static - navigation items never change order or position

  // Determine current page from location
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/content" || path.startsWith("/content/")) return "content";
    if (path === "/showcase" || path.startsWith("/showcase/"))
      return "showcase";
    if (path === "/analytics") return "analytics";
    if (path === "/community") return "community";
    if (path === "/integrations") return "integrations";
    if (path === "/portfolio" || path.startsWith("/portfolio/"))
      return "portfolio";
    return "dashboard";
  };

  const activePage = getCurrentPage();

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint to destroy session
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("project-draft-unified");

      // Redirect to login
      navigate("/login");
    }
  };

  // Grouped navigation items with requested hierarchy
  const navigationGroups = [
    {
      title: "WORKSPACE",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { id: "portfolio", label: "Portfolio", icon: FolderOpen, path: "/portfolio" },
        { id: "portfolio-manage", label: "Manager", icon: Briefcase, path: "/portfolio/manage" },
        { id: "content", label: "Content", icon: FileText, path: "/content" },
        { id: "showcase", label: "Showcase", icon: Package, path: "/showcase" },
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

  return (
    <aside className="w-64 h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex flex-col rounded-[2.5rem] shadow-lg overflow-hidden border border-slate-200/10 dark:border-slate-800">
      {/* Logo Section - Fixed Position */}
      <div
        className="p-8 pb-4 flex items-center gap-12"
        data-sidebar-open={isOpen}
      >
        <div className="flex items-center space-x-3 flex-1">
          <img src="/favicon.svg" alt="ShowWork Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-extrabold text-white">ShowWork</h1>
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
      </div>

      {/* Navigation Section - Static Order, Never Changes */}
      {/* Navigation Section - Grouped */}
      <nav
        className="flex-1 px-4 py-2 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePage === item.id;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                      }`}
                    onClick={() => navigate(item.path)}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section - Fixed Utility Links, Static Order */}
      <div className="px-4 py-2 border-t border-gray-700">
        {/* Settings moved to main nav */}
        <div
          className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </div>
      </div>
    </aside>
  );
};
