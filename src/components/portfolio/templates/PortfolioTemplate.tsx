import React from 'react';
import { Provider } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
export { portfolioStore };
import { Template03Inner } from './template-03/Template03Inner';
import { Template02Inner } from './template-02/Template02Inner';
import { Template01Inner } from './template-01/Template01Inner';
import { Template04Inner } from './template-04/Template04Inner';
import { Template05Inner } from './template-05/Template05Inner';
import { Template06Inner } from './template-06/Template06Inner';
import { Template07Inner } from './template-07/Template07Inner';
import { Template08Inner } from './template-08/Template08Inner';
import { Template09Inner } from './template-09/Template09Inner';
import { Template10Inner } from './template-10/Template10Inner';
import { Template11Inner } from './template-11/Template11Inner';
import { Template12Inner } from './template-12/Template12Inner';
import { Template13Inner } from './template-13/Template13Inner';
import { Template14Inner } from './template-14/Template14Inner';
import { Template15Inner } from './template-15/Template15Inner';
import { Template16Inner } from './template-16/Template16Inner';
import { Template17Inner } from './template-17/Template17Inner';
import { Template18Inner } from './template-18/Template18Inner';

import { withPortfolioTemplate, type PortfolioTemplateProps } from './withPortfolioTemplate';

// ─── Theme Mapping ─────────────────────
const themeMap: Record<string, React.FC<PortfolioTemplateProps>> = {
    'modern-dev': Template02Inner,
    'recommended-fullstack': Template03Inner,
    'api-engineer': Template04Inner,
    'modern-minimalist': Template01Inner,
    'microservices-architect': Template05Inner,
    'cloud-architect': Template06Inner,
    'infra-architect': Template07Inner,
    'reliability-engineer': Template08Inner,
    'data-pipeline-engineer': Template09Inner,
    'mobile-engineer': Template10Inner,
    'analytics-engineer': Template11Inner,
    'blockchain-dev': Template12Inner,
    'mlops-pipeline': Template13Inner,
    'open-source-portfolio': Template14Inner,
    'security-architect-v2': Template15Inner,
    'research-portfolio': Template16Inner,
    'cli-portfolio': Template17Inner,
    'cli-tools': Template17Inner,
    'systems-programming': Template18Inner,
};

/**
 * ThemeSwitcher — selects the template based on the store's selectedTemplateId
 * Exported as PortfolioTemplateInner for compatibility with the editor/previewer.
 */
// ─── Portfolio Template Inner ─────────────────────
export const PortfolioTemplateInner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    const selectedTemplateId = usePortfolioSelector(state => state.portfolio.selectedTemplateId) || 'recommended-fullstack';
    const SpecificTemplate = themeMap[selectedTemplateId] || themeMap['recommended-fullstack'];

    return (
        <SpecificTemplate userData={userData} projects={projects} />
    );
};

PortfolioTemplateInner.displayName = 'PortfolioTemplateInner';

// Wrap the ThemeSwitcher with the HOC (handles data fetch + preloader)
const PortfolioTemplateWithHOC = withPortfolioTemplate(PortfolioTemplateInner);

/**
 * PortfolioTemplate — the main export.
 * Wraps everything in the Redux Provider so organisms can still
 * read from the store during the portfolio editor session.
 */
export const PortfolioTemplate: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioTemplateWithHOC />
    </Provider>
);
