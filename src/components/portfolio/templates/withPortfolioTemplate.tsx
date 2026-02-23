import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import { updateUserData } from '@/store/portfolio/portfolioSlice';
import { Preloader } from './Preloader';

export interface PortfolioTemplateProps {
    userData: any;
    projects: any[];
}

/**
 * Higher-Order Component that provides common infrastructure to any portfolio template:
 * - Fetches /api/portfolio/data from the backend on mount
 * - Populates the Redux store with user data and projects
 * - Shows a preloader animation while data loads
 * - Passes userData and projects as props to the wrapped template
 *
 * Usage:
 *   const MyTemplate = withPortfolioTemplate(MyTemplateContent);
 */
export function withPortfolioTemplate<T extends PortfolioTemplateProps>(
    WrappedTemplate: ComponentType<T>
) {
    const displayName = WrappedTemplate.displayName || WrappedTemplate.name || 'Template';

    const WithPortfolioTemplate: React.FC<Omit<T, keyof PortfolioTemplateProps>> = (props) => {
        const dispatch = usePortfolioDispatch();
        const storeUserData = usePortfolioSelector(state => state.portfolio.userData);

        const [loading, setLoading] = useState(true);
        const [userData, setUserData] = useState<any>(storeUserData || {});
        const [projects, setProjects] = useState<any[]>([]);

        useEffect(() => {
            let cancelled = false;

            fetch('/api/portfolio/data', { credentials: 'include' })
                .then(res => res.ok ? res.json() : Promise.resolve(null))
                .then(json => {
                    if (cancelled || !json?.data?.user) return;

                    const backendUser = json.data.user;
                    const backendProjects = json.data.projects || [];

                    // Build enriched user data object
                    const enriched = {
                        name: backendUser.name || '',
                        title: backendUser.title || (backendUser.techStack?.[0] ? `${backendUser.techStack[0]} Developer` : 'Software Developer'),
                        bio: backendUser.bio || '',
                        profileImage: backendUser.avatar || '',
                        avatar: backendUser.avatar || '',
                        techStack: backendUser.techStack || [],
                        // Provide both `socials` and `socialLinks` keys for compatibility
                        socials: backendUser.socials || {},
                        socialLinks: backendUser.socials || {},
                        experience: json.data.experience || [],
                        education: json.data.education || [],
                    };

                    setUserData(enriched);
                    setProjects(backendProjects);

                    // Sync to Redux store so all organisms can read from it
                    dispatch(updateUserData(enriched as any));
                })
                .catch(() => {
                    // Not logged in or network error — use store data as fallback
                })
                .finally(() => {
                    if (!cancelled) {
                        // preloader's own timer handles the removal; we just mark data as loaded
                    }
                });

            return () => { cancelled = true; };
        }, [dispatch]);

        const handlePreloaderComplete = () => {
            setLoading(false);
        };

        // Merge any passed props with the fetched data
        const templateProps = {
            ...props,
            userData: userData,
            projects,
        } as T;

        return (
            <>
                {loading && <Preloader onComplete={handlePreloaderComplete} delay={1500} />}
                <WrappedTemplate {...templateProps} />
            </>
        );
    };

    WithPortfolioTemplate.displayName = `withPortfolioTemplate(${displayName})`;
    return WithPortfolioTemplate;
}
