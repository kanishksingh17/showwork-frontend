import { UnifiedLayout } from "../components/UnifiedLayout";
import { ComprehensiveAnalyticsDashboard } from "../components/analytics/ComprehensiveAnalyticsDashboard";

const Analytics = () => {
  return (
    <UnifiedLayout activePage="analytics">
      <div className="h-full overflow-hidden">
        <ComprehensiveAnalyticsDashboard portfolioId="current_user" />
      </div>
    </UnifiedLayout>
  );
};

export default Analytics;
