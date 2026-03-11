import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Smartphone,
  Monitor,
  Tablet,
  Share2,
  Edit,
  ExternalLink,
  Eye,
} from "lucide-react";
import type { UserPortfolio } from "../../types/portfolio";

interface PortfolioPreviewProps {
  portfolio: UserPortfolio;
  onEdit?: () => void;
  onPublish?: () => void;
  isGenerating?: boolean;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    images?: string[];
    tags?: string[];
    category?: string;
    teamMembers?: Array<{
      id: string;
      name: string;
      role: string;
      avatar?: string;
    }>;
  }>;
}

import { PortfolioTemplateInner } from './templates/PortfolioTemplate';

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolio,
  onEdit,
  onPublish,
  isGenerating = false,
  projects = [],
}) => {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getDeviceStyles = () => {
    switch (deviceView) {
      case "mobile":
        return { width: "375px", minHeight: "667px" };
      case "tablet":
        return { width: "768px", minHeight: "1024px" };
      default:
        return { width: "100%", minHeight: "100vh" };
    }
  };

  const renderPortfolioContent = () => {
    if (!portfolio || !portfolio.sections) {
      return (
        <div className="flex items-center justify-center" style={getDeviceStyles()}>
          <p className="text-gray-500">No portfolio content available</p>
        </div>
      );
    }

    return (
      <div className="w-full min-h-full relative transform-gpu" style={getDeviceStyles()}>
        <div className="w-full h-full p-0">
          <PortfolioTemplateInner
            userData={(portfolio as any).userData || {}}
            projects={projects}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Portfolio Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={onPublish}>
                <Share2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Device Preview:</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={deviceView === "desktop" ? "default" : "outline"}
                  onClick={() => setDeviceView("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={deviceView === "tablet" ? "default" : "outline"}
                  onClick={() => setDeviceView("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={deviceView === "mobile" ? "default" : "outline"}
                  onClick={() => setDeviceView("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Preview */}
      <div
        className={`border rounded-lg overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}
      >
        <div className="bg-gray-100 p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-gray-600">
              Portfolio Preview
            </span>
          </div>
        </div>
        <div className="bg-gray-50 p-4">
          <div
            className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${isFullscreen ? "" : "max-h-[80vh] overflow-y-auto"}`}
          >
            {renderPortfolioContent()}
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600">ATS Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">4.8/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">2.1s</div>
            <div className="text-sm text-gray-600">Load Time</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
