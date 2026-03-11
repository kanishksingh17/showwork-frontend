import React from 'react';
import { SystemIntegrityPanel } from './SystemIntegrityPanel';
import { HeroTitle } from './HeroTitle';
import { LivePipelinePanel } from './LivePipelinePanel';
import { SqlModelPanel } from './SqlModelPanel';
import { BioCtaPanel } from './BioCtaPanel';
import { RevenuePanel } from './RevenuePanel';
import { ImpactMetrics } from './ImpactMetrics';

export const DashboardGrid: React.FC = () => {
    return (
        <div className="container mx-auto max-w-7xl h-full grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min lg:grid-rows-[auto_1fr_auto]">
            <SystemIntegrityPanel />
            <HeroTitle />
            <LivePipelinePanel />
            <SqlModelPanel />
            <BioCtaPanel />
            <RevenuePanel />
            <ImpactMetrics />
        </div>
    );
};
