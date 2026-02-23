/**
 * Template Customization Registry
 * 
 * Each template declares ONLY what it actually supports.
 * The editor sidebar reads this config — no unused controls shown.
 * 
 * Architecture:
 *   Dashboard saves theme → PATCH /api/auth/me (themeConfig field)
 *   Template fetches GET /api/portfolio/{username} → reads themeConfig
 *   Template applies CSS variables from themeConfig
 */

export interface TemplateThemeConfig {
    /** Primary brand color */
    primaryColor: string;
    /** Background style */
    backgroundStyle: 'light' | 'dark' | 'auto';
    /** Font family */
    fontFamily: 'inter' | 'geist' | 'space-grotesk' | 'fira-code';
    /** Border radius style */
    borderRadius: 'none' | 'sm' | 'md' | 'xl' | '2xl';
}

export interface TemplateControl {
    key: keyof TemplateThemeConfig | string;
    label: string;
    type: 'color' | 'select' | 'toggle' | 'range';
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
}

export interface TemplateConfig {
    id: string;
    name: string;
    engine: 'external' | 'section';
    port: number;
    /** Default theme values for this template */
    defaultTheme: TemplateThemeConfig;
    /** Controls the editor sidebar should show for this template */
    controls: TemplateControl[];
    /** Sections the user can toggle visibility for */
    toggleableSections: { id: string; label: string; defaultVisible: boolean }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Template Configs
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
    'recommended-fullstack': {
        id: 'recommended-fullstack',
        name: 'Full-Stack Developer',
        engine: 'external',
        port: 3003,
        defaultTheme: {
            primaryColor: '#2563eb',
            backgroundStyle: 'light',
            fontFamily: 'inter',
            borderRadius: 'xl',
        },
        controls: [
            {
                key: 'primaryColor',
                label: 'Accent Color',
                type: 'color',
            },
            {
                key: 'backgroundStyle',
                label: 'Appearance',
                type: 'select',
                options: [
                    { value: 'light', label: '☀️ Light' },
                    { value: 'dark', label: '🌙 Dark' },
                    { value: 'auto', label: '💻 System' },
                ],
            },
            {
                key: 'fontFamily',
                label: 'Font',
                type: 'select',
                options: [
                    { value: 'inter', label: 'Inter' },
                    { value: 'geist', label: 'Geist' },
                    { value: 'space-grotesk', label: 'Space Grotesk' },
                ],
            },
        ],
        toggleableSections: [
            { id: 'hero', label: 'Hero / Intro', defaultVisible: true },
            { id: 'github-contrib', label: 'GitHub Activity', defaultVisible: true },
            { id: 'projects', label: 'Projects', defaultVisible: true },
            { id: 'open-source', label: 'Open Source', defaultVisible: true },
            { id: 'blog', label: 'Blog Posts', defaultVisible: true },
            { id: 'linkedin-feed', label: 'LinkedIn Feed', defaultVisible: true },
        ],
    },

    'professional-exec': {
        id: 'professional-exec',
        name: 'Professional Portfolio',
        engine: 'external',
        port: 3001,
        defaultTheme: {
            primaryColor: '#0f172a',
            backgroundStyle: 'light',
            fontFamily: 'inter',
            borderRadius: 'md',
        },
        controls: [
            { key: 'primaryColor', label: 'Brand Color', type: 'color' },
            {
                key: 'backgroundStyle',
                label: 'Appearance',
                type: 'select',
                options: [
                    { value: 'light', label: '☀️ Light' },
                    { value: 'dark', label: '🌙 Dark' },
                ],
            },
            {
                key: 'fontFamily',
                label: 'Font',
                type: 'select',
                options: [
                    { value: 'inter', label: 'Inter' },
                    { value: 'geist', label: 'Geist' },
                ],
            },
        ],
        toggleableSections: [
            { id: 'hero', label: 'Hero', defaultVisible: true },
            { id: 'projects', label: 'Projects', defaultVisible: true },
            { id: 'experience', label: 'Experience', defaultVisible: true },
        ],
    },

    'creative-designer': {
        id: 'creative-designer',
        name: 'Creative Developer',
        engine: 'external',
        port: 3002,
        defaultTheme: {
            primaryColor: '#7c3aed',
            backgroundStyle: 'dark',
            fontFamily: 'space-grotesk',
            borderRadius: '2xl',
        },
        controls: [
            { key: 'primaryColor', label: 'Glow Color', type: 'color' },
            {
                key: 'backgroundStyle',
                label: 'Appearance',
                type: 'select',
                options: [
                    { value: 'dark', label: '🌙 Dark' },
                    { value: 'light', label: '☀️ Light' },
                ],
            },
            {
                key: 'borderRadius',
                label: 'Card Style',
                type: 'select',
                options: [
                    { value: '2xl', label: 'Rounded' },
                    { value: 'none', label: 'Sharp' },
                ],
            },
        ],
        toggleableSections: [
            { id: 'hero', label: 'Hero', defaultVisible: true },
            { id: 'projects', label: 'Projects', defaultVisible: true },
            { id: 'skills', label: 'Tech Stack', defaultVisible: true },
        ],
    },
};

export function getTemplateConfig(templateId: string): TemplateConfig | undefined {
    return TEMPLATE_CONFIGS[templateId];
}

export const DEFAULT_THEME: TemplateThemeConfig = {
    primaryColor: '#2563eb',
    backgroundStyle: 'light',
    fontFamily: 'inter',
    borderRadius: 'xl',
};
