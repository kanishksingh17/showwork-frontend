import { UnifiedLayout } from "../components/UnifiedLayout";
import { ComprehensiveAnalyticsDashboard } from "../components/analytics/ComprehensiveAnalyticsDashboard";

interface AnalyticsProps {
  isDemo?: boolean;
}

const Analytics = ({ isDemo = false }: AnalyticsProps) => {
  return (
    <UnifiedLayout activePage="analytics" isDemo={isDemo}>
      <div className="h-full overflow-hidden">
        <ComprehensiveAnalyticsDashboard portfolioId="current_user" isDemo={isDemo} />
      </div>
    </UnifiedLayout>
  );
};

export default Analytics;
