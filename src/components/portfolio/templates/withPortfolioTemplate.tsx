import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import { updateUserData } from '@/store/portfolio/portfolioSlice';
// preloader removed as per user request

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

        const [userData, setUserData] = useState<any>(storeUserData || {});
        const [projects, setProjects] = useState<any[]>([]);

        useEffect(() => {
            let cancelled = false;

            fetch('/api/portfolio/data', { credentials: 'include' })
                .then(res => res.ok ? res.json() : Promise.resolve(null))
                .then(json => {
                    if (cancelled || !json?.data?.user) return;

                    const backendUser = json.data.user;
                    // Build enriched user data object
                    const getString = (val: any, fallback = '') => {
                        if (!val) return fallback;
                        if (typeof val === 'object') return val.name || val.title || val.description || val.label || fallback;
                        return String(val);
                    };

                    const enriched = {
                        name: getString(backendUser.name),
                        title: getString(backendUser.title) || (backendUser.techStack?.[0] ? `${getString(backendUser.techStack[0])} Developer` : 'Software Developer'),
                        bio: getString(backendUser.bio),
                        headline: getString(backendUser.professionalHeadline || backendUser.headline),
                        professionalHeadline: getString(backendUser.professionalHeadline),
                        professionalBio: getString(backendUser.professionalBio || backendUser.bio),
                        profileImage: backendUser.avatar || '',
                        avatar: backendUser.avatar || '',
                        techStack: (backendUser.techStack || []).map((t: any) => getString(t)),
                        // Provide multiple keys for resilience
                        socials: backendUser.socials || {},
                        socialLinks: backendUser.socials || {},
                        email: getString(backendUser.email),
                        experience: (json.data.experience || []).map((exp: any) => ({
                            ...exp,
                            company: getString(exp.company),
                            role: getString(exp.role || exp.position),
                            description: getString(exp.description || exp.summary)
                        })),
                        education: (json.data.education || []).map((edu: any) => ({
                            ...edu,
                            school: getString(edu.school || edu.institution),
                            degree: getString(edu.degree),
                            description: getString(edu.description)
                        })),
                    };

                    const sanitizedProjects = (json.data.projects || []).map((p: any) => ({
                        ...p,
                        title: getString(p.title || p.name),
                        description: getString(p.description || p.summary),
                        category: getString(p.category || p.cat),
                        tech: (p.tech || p.technologies || []).map((t: any) => getString(t))
                    }));

                    setUserData(enriched);
                    setProjects(sanitizedProjects);

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


        // Merge any passed props with the fetched data
        const templateProps = {
            ...props,
            userData: userData,
            projects,
        } as T;

        return (
            <WrappedTemplate {...templateProps} />
        );
    };

    WithPortfolioTemplate.displayName = `withPortfolioTemplate(${displayName})`;
    return WithPortfolioTemplate;
}
