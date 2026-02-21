import React, { useState, useEffect } from "react";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { XIcon, RedditIcon } from "@/components/BrandIcons";
import { motion } from "framer-motion";

// Types
interface IntegrationStatus {
  platform: string;
  connected: boolean;
  expired: boolean;
  connectedAt: string | null;
  expiresAt: string | null;
}

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isNew?: boolean;
  comingSoon?: boolean;
  category: "Developer tools" | "Design tools" | "Communication" | "Productivity" | "Browser tools";
}

// Data
const INTEGRATIONS: IntegrationItem[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your repositories and contributions.",
    icon: Github,
    color: "bg-gray-900",
    category: "Developer tools"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Share your projects professionally.",
    icon: Linkedin,
    color: "bg-blue-600",
    category: "Communication"
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    description: "Tweet your updates and projects.",
    icon: XIcon,
    color: "bg-black",
    comingSoon: true,
    category: "Communication"
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Share visual content and updates.",
    icon: Instagram,
    color: "bg-pink-600",
    comingSoon: true,
    category: "Communication"
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Post to your Facebook pages.",
    icon: Facebook,
    color: "bg-blue-700",
    comingSoon: true,
    category: "Communication"
  },
  {
    id: "reddit",
    name: "Reddit",
    description: "Share projects on Reddit.",
    icon: RedditIcon,
    color: "bg-orange-600",
    comingSoon: true,
    category: "Communication"
  }
];

// Initial Grid State with unique IDs
const INITIAL_GRID_ICONS = [
  { id: "x-1", icon: XIcon, color: "bg-black", row: 1, col: 0 },
  { id: "reddit-1", icon: RedditIcon, color: "bg-orange-600", row: 0, col: 2 },
  { id: "github-1", icon: Github, color: "bg-gray-800", row: 2, col: 1 },
  { id: "linkedin-1", icon: Linkedin, color: "bg-blue-600", row: 3, col: 3 },
  { id: "instagram-1", icon: Instagram, color: "bg-pink-600", row: 4, col: 0 },
  { id: "facebook-1", icon: Facebook, color: "bg-blue-700", row: 5, col: 2 },
  { id: "github-2", icon: Github, color: "bg-gray-900", row: 1, col: 4 },
  { id: "reddit-2", icon: RedditIcon, color: "bg-orange-500", row: 3, col: 0 },
  { id: "x-2", icon: XIcon, color: "bg-gray-800", row: 5, col: 4 },
  { id: "linkedin-2", icon: Linkedin, color: "bg-blue-700", row: 2, col: 3 },
  { id: "facebook-2", icon: Facebook, color: "bg-blue-800", row: 0, col: 4 },
  { id: "instagram-2", icon: Instagram, color: "bg-pink-500", row: 4, col: 2 },
];

export default function Integrations() {
  const queryClient = useQueryClient();
  const [gridIcons, setGridIcons] = useState(INITIAL_GRID_ICONS);
  const [activeIconId, setActiveIconId] = useState<string | null>(null);

  // Check URL params for OAuth callback success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");
    const success = params.get("success");
    const saved = params.get("saved");

    if (connected && success) {
      queryClient.invalidateQueries({ queryKey: ["integrationStatus"] });
      if (saved === "true") {
        toast.success(`${connected} connected successfully!`);
      } else {
        toast.warning(`${connected} authorization completed, but token may not be saved.`);
      }
      window.history.replaceState({}, "", "/integrations");
    }
  }, [queryClient]);

  // Fetch statuses
  const { data } = useQuery<{ success: boolean; statuses: IntegrationStatus[] }>({
    queryKey: ["integrationStatus"],
    queryFn: async () => {
      const response = await fetch("/api/integrations/status", {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch status");
      return response.json();
    },
  });

  const getStatus = (platformId: string) => {
    if (!data?.statuses) return false;
    return data.statuses.find((s) => s.platform === platformId)?.connected || false;
  };

  // Connect/Disconnect Mutations
  const connectMutation = useMutation({
    mutationFn: async (platform: string) => {
      toast.info(`Connecting to ${platform}...`);
      const response = await fetch(`/api/integrations/connect/${platform}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else if (data.authUrl) window.location.href = data.authUrl;
      else toast.error("Could not initiate connection");
    },
    onError: (err) => toast.error("Connection failed")
  });

  const disconnectMutation = useMutation({
    mutationFn: async (platform: string) => {
      const response = await fetch(`/api/integrations/disconnect/${platform}`, { method: "POST" });
      if (!response.ok) throw new Error();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrationStatus"] });
      toast.success("Disconnected successfully");
    },
    onError: () => toast.error("Disconnection failed")
  });

  const handleToggle = (id: string, currentState: boolean) => {
    console.log(`Toggling ${id}. Current state: ${currentState}`);
    if (currentState) {
      disconnectMutation.mutate(id);
    } else {
      connectMutation.mutate(id);
    }
  };

  const handleIconHover = (id: string) => {
    setActiveIconId(id);
  };

  const handleEmptyCellHover = (row: number, col: number) => {
    if (activeIconId) {
      setGridIcons((prev) =>
        prev.map((icon) =>
          icon.id === activeIconId ? { ...icon, row, col } : icon
        )
      );
    }
  };

  return (
    <UnifiedLayout activePage="integrations">
      <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto">

        {/* LEFT SIDE - GRID */}
        <div className="hidden md:block w-5/12 bg-gray-50 dark:bg-gray-900/50 p-8 relative overflow-hidden border-r border-gray-100 dark:border-gray-700">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-6 gap-4 p-8">
            {/* Grid Cells - acting as drop zones/triggers */}
            {Array.from({ length: 30 }).map((_, i) => {
              const row = Math.floor(i / 5);
              const col = i % 5;
              return (
                <div
                  key={i}
                  onMouseEnter={() => handleEmptyCellHover(row, col)}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 w-full h-full aspect-square shadow-sm opacity-40 mix-blend-multiply dark:mix-blend-normal transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50"
                />
              );
            })}
          </div>

          {/* Floating Icons State */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-6 gap-4 p-8 pointer-events-none">
            {gridIcons.map((item) => (
              <div
                key={item.id}
                style={{ gridColumn: item.col + 1, gridRow: item.row + 1 }}
                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto"
                onMouseEnter={() => handleIconHover(item.id)}
              >
                <motion.div
                  layoutId={item.id}
                  className={`w-14 h-14 ${item.color} rounded-xl shadow-lg flex items-center justify-center cursor-move`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add integrations</h1>
              <p className="text-gray-500 mt-1">Connect your favorite tools to supercharge your workflow.</p>
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            {INTEGRATIONS.map((item) => {
              const isConnected = getStatus(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => !item.comingSoon && handleToggle(item.id, isConnected)}
                  className={`group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        {item.comingSoon ? (
                          <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-gray-100 text-gray-500 hover:bg-gray-100">Coming Soon</Badge>
                        ) : item.isNew && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-green-100 text-green-700 hover:bg-green-100">NEW</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-snug max-w-sm mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <Switch
                    checked={isConnected}
                    disabled={!!item.comingSoon}
                    onCheckedChange={() => { }} // Handle via parent div onClick
                    className="data-[state=checked]:bg-blue-600 pointer-events-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}
