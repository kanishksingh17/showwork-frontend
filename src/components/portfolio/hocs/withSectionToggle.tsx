import React, { ComponentType } from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';

export interface WithSectionToggle {
    sectionId: string;
}

/**
 * HOC that conditionally renders a component based on section visibility
 * Usage: const TogglableSection = withSectionToggle(MySection);
 */
export function withSectionToggle<P extends WithSectionToggle>(
    Component: ComponentType<P>
) {
    return function SectionToggleComponent(props: P) {
        const sections = usePortfolioSelector(state => state.portfolio.sections);
        const section = sections.find(s => s.id === props.sectionId);

        // Don't render if section doesn't exist or is not visible
        if (!section || !section.isVisible) {
            return null;
        }

        return <Component {...props} />;
    };
}
