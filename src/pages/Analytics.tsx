import { UnifiedLayout } from "../components/UnifiedLayout";
import { ComprehensiveAnalyticsDashboard } from "../components/analytics/ComprehensiveAnalyticsDashboard";

interface AnalyticsProps {
  isDemo?: boolean;
}

import { ComingSoonOverlay } from "../components/ui/ComingSoonOverlay";

const Analytics = ({ isDemo = false }: AnalyticsProps) => {
  return (
    <UnifiedLayout activePage="analytics" isDemo={isDemo}>
      <ComingSoonOverlay
        title="Predictive Analytics"
        description="Data that drives decisions. Monitor your reach, engagement, and profile performance with advanced AI-driven insights."
        imagePath="/assets/coming-soon/analytics.png"
      >
        <div className="h-full overflow-hidden">
          <ComprehensiveAnalyticsDashboard portfolioId="current_user" isDemo={isDemo} />
        </div>
      </ComingSoonOverlay>
    </UnifiedLayout>
  );
};

export default Analytics;
