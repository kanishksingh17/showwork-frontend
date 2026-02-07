import React from 'react';
import { UnifiedSidebar } from "../components/UnifiedSidebar";
import { ComprehensiveAnalyticsDashboard } from "../components/analytics/ComprehensiveAnalyticsDashboard";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UnifiedSidebar currentPage="analytics" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <ComprehensiveAnalyticsDashboard portfolioId="current_user" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
