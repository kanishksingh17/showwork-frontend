/**
 * Portfolio Health Score Component
 * Displays portfolio health metrics with progress bars and recommendations
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  RefreshCw,
  TrendingUp,
  Target,
  Award,
  Briefcase,
  Code,
  Star,
  AlertCircle,
} from "lucide-react";
import { PortfolioHealthData } from "@/hooks/usePortfolioHealth";

interface PortfolioHealthScoreProps {
  health: PortfolioHealthData | null;
  loading: boolean;
  onRefresh: () => void;
  onRecompute: () => void;
}

export default function PortfolioHealthScore({
  health,
  loading,
  onRefresh,
  onRecompute,
}: PortfolioHealthScoreProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Work":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading && !health) {
    return (
      <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full">
        <CardHeader className="flex items-center justify-between pb-2 flex-shrink-0">
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">
              Portfolio Health Score
            </CardTitle>
            <p className="text-xs text-gray-500">
              AI-powered analysis of your portfolio strength
            </p>
          </div>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" disabled className="h-6 w-6 p-0">
              <RefreshCw className="w-3 h-3" />
            </Button>
            <Button size="sm" disabled className="h-6 w-6 p-0">
              <Brain className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (!health) {
    return (
      <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full">
        <CardHeader className="flex items-center justify-between pb-2.5 flex-shrink-0">
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900">
              Portfolio Health Score
            </CardTitle>
            <p className="text-xs text-gray-500">
              AI-powered analysis of your portfolio strength
            </p>
          </div>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" onClick={onRefresh} className="h-6 w-6 p-0">
              <RefreshCw className="w-3 h-3" />
            </Button>
            <Button size="sm" onClick={onRecompute} className="h-6 w-6 p-0">
              <Brain className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex-1 flex flex-col items-center justify-center text-gray-400">
          <AlertCircle className="h-6 w-6 mb-1.5" />
          <p className="text-xs mb-3">No health data available</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRecompute}
            className="text-xs h-6"
          >
            Get AI Insights
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full">
      <CardHeader className="flex items-center justify-between pb-2.5 flex-shrink-0">
        <div>
          <CardTitle className="text-sm font-semibold text-gray-900">
            Portfolio Health Score
          </CardTitle>
          <p className="text-xs text-gray-500">
            AI-powered analysis of your portfolio strength
          </p>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="h-6 w-6 p-0"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={onRecompute} disabled={loading} className="h-6 w-6 p-0">
            <Brain className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 overflow-y-auto">
        {/* Overall Score */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500">Overall Portfolio Health</p>
          <div className="flex items-center gap-1.5">
            <h3
              className={`text-2xl font-bold ${getScoreColor(health.overall)}`}
            >
              {health.overall}/100
            </h3>
            <Badge className={getStatusColor(health.status)}>
              {health.status}
            </Badge>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2.5">
          {Object.entries(health.breakdown).map(([key, score]) => {
            const labels: Record<string, string> = {
              technicalSkills: "Technical Skills",
              projectQuality: "Project Quality",
              portfolioPresentation: "Portfolio Presentation",
              experience: "Experience",
              industryAlignment: "Industry Alignment",
              certifications: "Certifications",
            };

            const icons: Record<string, React.ReactNode> = {
              technicalSkills: <Code className="w-3 h-3" />,
              projectQuality: <Star className="w-3 h-3" />,
              portfolioPresentation: <Target className="w-3 h-3" />,
              experience: <Briefcase className="w-3 h-3" />,
              industryAlignment: <TrendingUp className="w-3 h-3" />,
              certifications: <Award className="w-3 h-3" />,
            };

            return (
              <div key={key}>
                <div className="flex justify-between text-[10px] text-gray-600 mb-0.5">
                  <div className="flex items-center gap-1">
                    {icons[key]}
                    <span>{labels[key]}</span>
                  </div>
                  <span className={getScoreColor(score)}>{score}</span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full">
                  <div
                    className={`h-1 rounded-full ${getProgressColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        {health.recommendedImprovements && health.recommendedImprovements.length > 0 && (
          <div className="mt-3 p-2.5 bg-blue-50 rounded-lg">
            <h4 className="text-xs font-medium text-blue-900 mb-1.5">
              Recommended Improvements
            </h4>
            <ul className="text-[10px] text-blue-700 space-y-0.5">
              {health.recommendedImprovements
                .slice(0, 3)
                .map((improvement, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-2.5 text-[10px] text-gray-500">
          Last updated: {new Date(health.lastComputedAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
