import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiJson } from '@/lib/apiClient';

// Thunks
export const enhanceSectionAI = createAsyncThunk(
    'portfolio/enhanceSection',
    async ({ id, type, content, userPrompt }: { id: string; type: string; content: string; userPrompt?: string }) => {
        const response = await apiJson('/api/ai/enhance-section', {
            method: 'POST',
            body: JSON.stringify({ section: type, content, userPrompt })
        });
        return { id, enhancedContent: response.data.section };
    }
);

export const syncLinkedInProfile = createAsyncThunk(
    'portfolio/syncLinkedIn',
    async () => {
        // First trigger the sync on backend
        await apiJson('/api/integrations/linkedin/sync', { method: 'POST' });
        // Then get the profile data
        const response = await apiJson('/api/integrations/linkedin/profile', { method: 'GET' });
        return response.profile;
    }
);

import type { PortfolioSection } from '@/types/portfolio';

// Section configuration for portfolio templates (extends the base type)
export interface SectionConfig extends PortfolioSection {
    isVisible: boolean;
}

// Portfolio state interface
export interface PortfolioState {
    // Template selection
    selectedTemplateId: string | null;
    detectedJobRole: string | null;

    // Active sections in current portfolio
    sections: SectionConfig[];

    // Customization data
    theme: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        mode: 'light' | 'dark';
    };

    // User content
    userData: {
        name: string;
        title: string;
        bio: string;
        profileImage: string;
        resumeUrl?: string; // URL to resume PDF
        socialLinks: Record<string, string>;
    };

    // Preview mode
    isPreviewMode: boolean;
    activeSection: string | null;

    // Editor mode (Portfolio vs Resume)
    editorMode: 'portfolio' | 'resume';
    resumeTemplateId: string | null;

    // AI Status
    enhancingSections: Record<string, boolean>;
}

const initialState: PortfolioState = {
    selectedTemplateId: null,
    detectedJobRole: null,
    sections: [],
    theme: {
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        fontFamily: 'Inter',
        mode: 'light',
    },
    userData: {
        name: '',
        title: '',
        bio: '',
        profileImage: '',
        resumeUrl: '',
        socialLinks: {},
    },
    isPreviewMode: false,
    activeSection: null,
    editorMode: 'portfolio',
    resumeTemplateId: 'resume-minimal',
    enhancingSections: {},
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        // Template selection
        selectTemplate: (state, action: PayloadAction<string>) => {
            state.selectedTemplateId = action.payload;
        },

        setJobRole: (state, action: PayloadAction<string>) => {
            state.detectedJobRole = action.payload;
        },

        // Section management
        setSections: (state, action: PayloadAction<SectionConfig[]>) => {
            state.sections = action.payload;
        },

        addSection: (state, action: PayloadAction<SectionConfig>) => {
            state.sections.push(action.payload);
        },

        insertSection: (state, action: PayloadAction<{ section: SectionConfig; index: number }>) => {
            const { section, index } = action.payload;
            state.sections.splice(index, 0, section);
            // Re-order based on new array positions
            state.sections.forEach((s, i) => { s.order = i; });
        },

        removeSection: (state, action: PayloadAction<string>) => {
            state.sections = state.sections.filter(s => s.id !== action.payload);
        },

        toggleSectionVisibility: (state, action: PayloadAction<string>) => {
            const section = state.sections.find(s => s.id === action.payload);
            if (section) {
                section.isVisible = !section.isVisible;
            }
        },

        reorderSections: (state, action: PayloadAction<string[]>) => {
            const orderMap = new Map(action.payload.map((id, idx) => [id, idx]));
            state.sections.forEach(section => {
                const newOrder = orderMap.get(section.id);
                if (newOrder !== undefined) {
                    section.order = newOrder;
                }
            });
            state.sections.sort((a, b) => a.order - b.order);
        },

        moveSection: (state, action: PayloadAction<{ id: string; direction: 'up' | 'down' }>) => {
            const index = state.sections.findIndex(s => s.id === action.payload.id);
            if (index === -1) return;

            const newIndex = action.payload.direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= state.sections.length) return;

            const [movedSection] = state.sections.splice(index, 1);
            state.sections.splice(newIndex, 0, movedSection);

            // Update order properties
            state.sections.forEach((s, i) => { s.order = i; });
        },

        updateSectionVariant: (state, action: PayloadAction<{ id: string; variant: string }>) => {
            const section = state.sections.find(s => s.id === action.payload.id);
            if (section) {
                section.variant = action.payload.variant;
            }
        },

        updateSectionCustomData: (state, action: PayloadAction<{ id: string; data: Record<string, any> }>) => {
            const section = state.sections.find(s => s.id === action.payload.id);
            if (section) {
                section.customData = { ...section.customData, ...action.payload.data };
            }
        },

        // Theme customization
        updateTheme: (state, action: PayloadAction<Partial<PortfolioState['theme']>>) => {
            state.theme = { ...state.theme, ...action.payload };
        },

        // User data
        updateUserData: (state, action: PayloadAction<Partial<PortfolioState['userData']>>) => {
            state.userData = { ...state.userData, ...action.payload };
        },

        // Targeted Updating System - Surgical content updates
        changeWebsitePageComponentContent: (state, action: PayloadAction<{
            componentId: string;
            content: any;
            merge?: boolean;
        }>) => {
            const { componentId, content, merge = true } = action.payload;
            const section = state.sections.find(s => s.id === componentId);
            if (section) {
                if (merge && typeof section.customData === 'object' && typeof content === 'object') {
                    section.customData = { ...section.customData, ...content };
                } else {
                    section.customData = content;
                }
            }
        },

        // Preview mode
        togglePreviewMode: (state) => {
            state.isPreviewMode = !state.isPreviewMode;
        },

        setActiveSection: (state, action: PayloadAction<string | null>) => {
            state.activeSection = action.payload;
        },

        // Initialize with default sections
        initializeDefaultSections: (state) => {
            state.sections = [
                { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
                { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
                { id: 'skills', type: 'skills', variant: 'SkillsMain', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
                { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
                { id: 'resume', type: 'resume', variant: 'ResumeMain', isVisible: true, order: 4, title: 'Resume', content: '', isRequired: true },
                { id: 'contact', type: 'contact', variant: 'ContactMain', isVisible: true, order: 5, title: 'Contact', content: '', isRequired: true },
                { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 6, title: 'Footer', content: '', isRequired: true },
            ];
        },

        // Editor mode
        setEditorMode: (state, action: PayloadAction<'portfolio' | 'resume'>) => {
            state.editorMode = action.payload;
        },

        setResumeTemplateId: (state, action: PayloadAction<string>) => {
            state.resumeTemplateId = action.payload;
        },

        // Reset
        resetPortfolio: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(enhanceSectionAI.pending, (state, action) => {
                state.enhancingSections[action.meta.arg.id] = true;
            })
            .addCase(enhanceSectionAI.fulfilled, (state, action) => {
                state.enhancingSections[action.payload.id] = false;
                const section = state.sections.find(s => s.id === action.payload.id);
                if (section) {
                    section.customData = {
                        ...section.customData,
                        enhancedContent: action.payload.enhancedContent,
                        useAI: true
                    };

                    // Specific mapping for about/bio if needed
                    if (section.type === 'about' || section.type === 'hero') {
                        state.userData.bio = action.payload.enhancedContent;
                    }
                }
            })
            .addCase(enhanceSectionAI.rejected, (state, action) => {
                state.enhancingSections[action.meta.arg.id] = false;
            })
            .addCase(syncLinkedInProfile.fulfilled, (state, action) => {
                const profile = action.payload;
                if (profile) {
                    if (profile.headline) state.userData.title = profile.headline;
                    if (profile.summary) state.userData.bio = profile.summary;
                    // Note: Name is usually already set, but we could update it if needed
                    // state.userData.name = profile.name;
                }
            });
    },
});

export const {
    selectTemplate,
    setJobRole,
    setSections,
    addSection,
    removeSection,
    toggleSectionVisibility,
    reorderSections,
    moveSection,
    insertSection,
    updateSectionVariant,
    updateSectionCustomData,
    updateTheme,
    updateUserData,
    changeWebsitePageComponentContent,
    togglePreviewMode,
    setActiveSection,
    setEditorMode,
    setResumeTemplateId,
    initializeDefaultSections,
    resetPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
