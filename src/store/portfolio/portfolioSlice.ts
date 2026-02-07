import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Section configuration for portfolio templates
export interface SectionConfig {
    id: string;
    type: 'header' | 'about' | 'skills' | 'certifications' | 'projects' | 'footer';
    variant: string; // e.g., 'Header01', 'Header02', etc.
    isVisible: boolean;
    order: number;
    customData?: Record<string, any>;
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
                { id: 'header', type: 'header', variant: 'Header01', isVisible: true, order: 0 },
                { id: 'about', type: 'about', variant: 'Hero01', isVisible: true, order: 1 },
                { id: 'skills', type: 'skills', variant: 'Skills01', isVisible: true, order: 2 },
                { id: 'certifications', type: 'certifications', variant: 'Cert01', isVisible: true, order: 3 },
                { id: 'projects', type: 'projects', variant: 'Projects01', isVisible: true, order: 4 },
                { id: 'footer', type: 'footer', variant: 'Footer01', isVisible: true, order: 5 },
            ];
        },

        // Reset
        resetPortfolio: () => initialState,
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
    updateSectionVariant,
    updateSectionCustomData,
    updateTheme,
    updateUserData,
    togglePreviewMode,
    setActiveSection,
    initializeDefaultSections,
    resetPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
