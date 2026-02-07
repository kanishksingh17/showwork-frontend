import React, { ComponentType } from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';

export interface WithPortfolioData {
    userData: {
        name: string;
        title: string;
        bio: string;
        profileImage: string;
        socialLinks: Record<string, string>;
    };
    theme: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
    };
    sections: any[];
}

/**
 * HOC that injects portfolio data from Redux store into a component
 * Usage: const EnhancedComponent = withPortfolioData(MyComponent);
 */
export function withPortfolioData<P extends object>(
    Component: ComponentType<P & Partial<WithPortfolioData>>
) {
    return function PortfolioDataComponent(props: P) {
        const userData = usePortfolioSelector(state => state.portfolio.userData);
        const theme = usePortfolioSelector(state => state.portfolio.theme);
        const sections = usePortfolioSelector(state => state.portfolio.sections);

        return (
            <Component
                {...props}
                userData={userData}
                theme={theme}
                sections={sections}
            />
        );
    };
}
