import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { HoverGradientNavTabs, createContentManagementTabs } from "@/components/ui/hover-gradient-nav-tabs";
import { UnifiedLayout } from "../components/UnifiedLayout";
import ContentCalendar from "../components/ContentManagement/ContentCalendar";
import { CrossPostComposer } from "../components/CrossPost/CrossPostComposer";
import {
  FileText,
  RefreshCw,
  Settings,
  Plus,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { PublishedPostCard } from "../components/ContentManagement/PublishedPostCard";

interface PublishedPost {
  id: string;
  projectId: string;
  projectName?: string;
  projectImage?: string;
  platforms: string[];
  messages: Record<string, string>;
  platformResults: Record<string, {
    postId?: string;
    url?: string;
    status: string;
    publishedAt: string;
  }>;
  status: "posted" | "partial";
  publishedAt: string;
  createdAt: string;
  scheduledPostId?: string;
  mediaUrls: string[];
  feedback?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

import { ToneSelector } from "../components/ContentManagement/ToneSelector";
import type { ToneType } from "../components/ContentManagement/ToneSelector";
import { ContentTemplatesAI } from "@/components/ContentManagement/ContentTemplates";
import { LoginModal } from "@/components/auth/LoginModal";

interface ContentManagementProps {
  isDemo?: boolean;
}

export default function ContentManagement({ isDemo = false }: ContentManagementProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Mock Data for "Creative Flow" style preview
  // Mock Data for "Creative Flow" style preview
  const MOCK_POSTS: PublishedPost[] = [
    {
      id: "1",
      projectId: "p1",
      projectName: "Style Spotlight",
      projectImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      platforms: ["instagram"],
      messages: { instagram: "Focus on a particular product or collection that you want to highlight. Showcase its unique features." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 85, negative: 5, neutral: 10 }
    },
    {
      id: "2",
      projectId: "p2",
      projectName: "Trend Alert",
      projectImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      platforms: ["instagram", "twitter", "linkedin"],
      messages: { instagram: "Discuss current trends..." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 65, negative: 15, neutral: 20 }
    },
    {
      id: "3",
      projectId: "p3",
      projectName: "Exclusive Preview",
      projectImage: "https://images.unsplash.com/photo-1542272454374-d52b86419020?q=80&w=800&auto=format&fit=crop",
      platforms: ["linkedin", "twitter"],
      messages: { instagram: "Build anticipation by offering a sneak peek at upcoming products or collections." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1542272454374-d52b86419020?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 92, negative: 2, neutral: 6 }
    },
    {
      id: "4",
      projectId: "p4",
      projectName: "Behind the Scenes",
      projectImage: "https://images.unsplash.com/photo-1493612276216-9c783798533d?q=80&w=800&auto=format&fit=crop",
      platforms: ["instagram"],
      messages: { instagram: "Give your audience an insider look at the creative process, whether it's designing..." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1493612276216-9c783798533d?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 45, negative: 40, neutral: 15 }
    },
    {
      id: "5",
      projectId: "p5",
      projectName: "Customer Favorites",
      projectImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
      platforms: ["instagram"],
      messages: { instagram: "Showcase products that are popular with your customers. Include testimonials or reviews." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 98, negative: 0, neutral: 2 }
    },
    {
      id: "6",
      projectId: "p6",
      projectName: "Limited Edition",
      projectImage: "https://images.unsplash.com/photo-1549413645-8ebcae6aaa2d?q=80&w=800&auto=format&fit=crop",
      platforms: ["instagram"],
      messages: { instagram: "Create a sense of urgency by emphasizing the limited availability of a product." },
      platformResults: { instagram: { status: "success", url: "#", publishedAt: new Date().toISOString() } },
      status: "posted",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mediaUrls: ["https://images.unsplash.com/photo-1549413645-8ebcae6aaa2d?q=80&w=800&auto=format&fit=crop"],
      feedback: { positive: 70, negative: 10, neutral: 20 }
    }
  ];

  const [publishedPosts, setPublishedPosts] = useState<PublishedPost[]>(isDemo ? [] : MOCK_POSTS);
  const [activeTab, setActiveTab] = useState("cross-post");
  const [selectedTone, setSelectedTone] = useState<ToneType>("casual");

  const tabItems = createContentManagementTabs();

  const fetchPublishedPosts = async () => {
    if (isDemo) {
      setPublishedPosts([]);
      return;
    }

    try {
      const response = await fetch("/api/content/published-posts", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send session cookies
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.posts)) {
          // Transform backend data to frontend interface if needed
          // The backend returns: ID, ProjectName, ProjectImage, Platforms, PublishedAt, Results, Content
          // Frontend expects: id, projectId, projectName, projectImage, platforms, status, publishedAt, createdAt, mediaUrls, feedback, messages, platformResults

          const transformedPosts: PublishedPost[] = data.posts.map((p: any) => ({
            id: p.id,
            projectId: p.id, // Fallback
            projectName: p.projectName,
            projectImage: p.projectImage || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", // Fallback image
            platforms: p.platforms || [],
            messages: { instagram: p.content || "" },
            platformResults: p.results ? p.results.reduce((acc: any, r: any) => ({ ...acc, [r.platform]: { status: "success", url: r.url, publishedAt: p.publishedAt } }), {}) : {},
            status: "posted",
            publishedAt: p.publishedAt,
            createdAt: p.publishedAt,
            mediaUrls: p.projectImage ? [p.projectImage] : [],
            feedback: { positive: 0, negative: 0, neutral: 0 }
          }));

          setPublishedPosts(transformedPosts.length > 0 ? transformedPosts : MOCK_POSTS);
          return;
        }
      }
      console.warn("Failed to fetch published posts, using mock data");
      setPublishedPosts(MOCK_POSTS);
    } catch (error) {
      console.error("Error fetching published posts:", error);
      setPublishedPosts(MOCK_POSTS);
    }
  };

  return (
    <UnifiedLayout activePage="content" showAuthButtons={isDemo}>
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950">

        {/* Unified Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-slate-950">
          <HoverGradientNavTabs
            items={tabItems}
            activeId={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              if (value === "published") {
                fetchPublishedPosts();
              }
            }}
          />
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => isDemo ? setShowLoginModal(true) : undefined}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              size="sm"
              onClick={() => isDemo ? setShowLoginModal(true) : undefined}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full flex flex-col" onValueChange={(value) => {
            setActiveTab(value);
            if (value === "published") {
              fetchPublishedPosts();
            }
          }}>

            {/* Create Post Tab (merged Cross-Post and Post Generator) */}
            <TabsContent value="cross-post" className="h-full mt-0 data-[state=active]:flex flex-col">
              <React.Suspense fallback={<div className="text-center py-12"><RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" /><p className="text-gray-600">Loading composer...</p></div>}>
                <CrossPostComposer isDemo={isDemo} />
              </React.Suspense>
            </TabsContent>

            {/* Content Calendar Tab */}
            <TabsContent value="calendar" className="h-full mt-0 overflow-hidden flex flex-col">
              <div className="h-full p-6 overflow-hidden">
                <ContentCalendar compact={false} isDemo={isDemo} onShowLogin={() => setShowLoginModal(true)} />
              </div>
            </TabsContent>

            {/* Published Posts Tab */}
            <TabsContent value="published" className="flex-1 mt-0 flex flex-col h-full">
              {/* Compact Filter Bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950 shrink-0">
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm w-56 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={fetchPublishedPosts} className="rounded-full h-8">
                  <RefreshCw className="w-3.5 h-3.5 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {publishedPosts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">No Published Posts</h3>
                    <p className="text-sm text-gray-500">Your published content will appear here in a gallery view.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {publishedPosts.map((post) => (
                      <PublishedPostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="flex-1 mt-0 flex flex-col h-full">
              <div className="h-full overflow-y-auto p-8 scrollbar-hide relative">
                {isDemo && (
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                    aria-label="Click to login"
                  />
                )}
                <ContentTemplatesAI />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Login Modal for Demo Mode */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          window.location.href = '/login';
        }}
      />
    </UnifiedLayout>
  );
}




