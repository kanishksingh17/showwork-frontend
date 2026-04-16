import React, { useState, useEffect } from 'react';
import {
    Rocket,
    ArrowLeft,
    Layout,
    Eye,
    EyeOff,
    Monitor,
    Smartphone,
    Tablet,
    Undo,
    Redo,
    RotateCcw,
    Layers,
    Settings,
    FileText,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PortfolioTemplateInner } from './templates/PortfolioTemplate';
import type { UserPortfolio, PortfolioTemplate } from '@/types/portfolio';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import {
    selectTemplate,
    setJobRole,
    setSections,
    updateSectionCustomData,
    updateTheme,
    updateUserData,
    togglePreviewMode,
    setEditorMode,
    resetPortfolio,
    savePortfolioDraft // Import the new thunk
} from '@/store/portfolio/portfolioSlice';

import { RightContextPanel } from './editor/panels/RightContextPanel';
import { PagesPanel } from './editor/panels/PagesPanel';
import { ResumePreview } from './ResumePreview';
import { ThemePanel } from './editor/panels/ThemePanel';
import { SectionVariantsPanel } from './editor/panels/SectionVariantsPanel';
import { SettingsPanel } from './editor/panels/SettingsPanel';
import { cn } from '@/lib/utils';

interface ModernPortfolioEditorProps {
    template: PortfolioTemplate;
    userData: any;
    projects: any[];
    jobRole?: any;
    onSave?: (portfolio: UserPortfolio) => void;
    onPublish?: () => void;
    onClose?: () => void;
}

export const ModernPortfolioEditor: React.FC<ModernPortfolioEditorProps> = ({
    template,
    userData,
    projects,
    jobRole,
    onPublish,
    onClose
}) => {
    const dispatch = usePortfolioDispatch();
    const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [activeTab, setActiveTab] = useState<'pages' | 'styles' | 'settings'>('pages');
    const [isSaving, setIsSaving] = useState(false);

    const sections = usePortfolioSelector(state => state.portfolio.sections);
    const theme = usePortfolioSelector(state => state.portfolio.theme);
    const portfolioId = usePortfolioSelector(state => state.portfolio.id);
    const storeUserData = usePortfolioSelector(state => state.portfolio.userData);
    const isPreviewMode = usePortfolioSelector(state => state.portfolio.isPreviewMode);
    const editorMode = usePortfolioSelector(state => state.portfolio.editorMode);
    const detectedJobRole = usePortfolioSelector(state => state.portfolio.detectedJobRole);

    useEffect(() => {
        if (template) {
            dispatch(selectTemplate(template.id));
            if (template.sections && (!sections || sections.length === 0)) {
                dispatch(setSections(template.sections));
            }
            if (template.theme) {
                dispatch(updateTheme({
                    primaryColor: template.theme.primary,
                    secondaryColor: template.theme.secondary,
                    fontFamily: template.theme.font,
                    mode: template.theme.mode || 'light'
                }));
            }
        }
        if (jobRole) {
            dispatch(setJobRole(jobRole.id));
        }

        // --- AUTO-PILOT SYNC ---
        // Only run if we have data and we haven't already customized these sections
        if (sections.length > 0) {
            // 0. Migration: Ensure 'blogs' section has the correct type (for legacy portfolios)
            const legacyBlogSec = sections.find(s => s.id === 'blogs' && s.type === 'contact');
            if (legacyBlogSec) {
                const updatedSections = sections.map(s =>
                    s.id === 'blogs' ? { ...s, type: 'blogs' as any, variant: 'BlogsMain' } : s
                );
                dispatch(setSections(updatedSections));
            }

            // 1. Sync About/Bio
            const aboutSec = sections.find(s => s.type === 'about');
            if (aboutSec && aboutSec.customData?.isAutoSynced !== true && (userData?.resumeBio || userData?.professionalBio || userData?.bio)) {
                dispatch(updateSectionCustomData({
                    id: aboutSec.id,
                    data: {
                        ...aboutSec.customData,
                        headline: userData.professionalHeadline || userData.title || "Software Developer",
                        bio: userData.resumeBio || userData.professionalBio || userData.bio,
                        socialLinks: userData.socialLinks || {},
                        isAutoSynced: true
                    }
                }));
            }

            // 2. Sync Projects from GitHub
            const projectsSec = sections.find(s => s.type === 'projects');
            const hasProjects = projects?.length > 0;
            const availableGHUser = userData?.githubUsername || userData?.username || "";

            if (projectsSec && projectsSec.customData?.isAutoSynced !== true && (hasProjects || availableGHUser)) {
                const mappedProjects = (projects || []).slice(0, 6).map((p: any) => ({
                    name: p.name,
                    description: p.description || "Open source project on GitHub",
                    link: { href: p.htmlUrl || p.githubUrl || p.liveUrl || "#", label: "View Source" },
                    logo: p.logo || `https://www.google.com/s2/favicons?domain=${p.liveUrl || 'github.com'}&sz=128`,
                    tags: p.language ? [p.language] : (p.topics || []),
                    isGithubRepo: true,
                    stargazers_count: p.stargazers_count || p.gitStars || 0,
                    forks_count: p.forks_count || p.gitForks || 0
                }));

                dispatch(updateSectionCustomData({
                    id: projectsSec.id,
                    data: {
                        ...projectsSec.customData,
                        githubUsername: availableGHUser.replace(/\s+/g, '').toLowerCase(),
                        manualProjects: mappedProjects.length > 0 ? mappedProjects : (projectsSec.customData?.manualProjects || []),
                        isAutoSynced: true
                    }
                }));
            }

            // 3. Sync Resume (Experience & Education)
            const resumeSec = sections.find(s => s.type === 'resume');
            const hasRealExp = userData?.experience && userData.experience.length > 0;
            const hasRealEdu = userData?.education && userData.education.length > 0;

            if (resumeSec && (hasRealExp || hasRealEdu)) {
                const currentExp = resumeSec.customData?.experiences || [];
                const currentEdu = resumeSec.customData?.educations || [];

                // Construct mapped data for comparison
                const mappedExp = (userData?.experience || []).map((e: any) => ({
                    company: e.companyName || e.company,
                    title: e.title,
                    start: e.startDate || e.start,
                    end: e.endDate || e.end || "Present"
                }));
                const mappedEdu = (userData?.education || []).map((e: any) => ({
                    school: e.schoolName || e.school,
                    major: e.degreeName || e.major,
                    start: e.startDate || e.start,
                    end: e.endDate || e.end
                }));

                // Only sync if the current length is 0 (first time)
                // OR if we have real items and we haven't flagged this as "real data" yet
                const isPlaceholder = resumeSec.customData?.isAutoSynced !== true;

                if (isPlaceholder && (mappedExp.length > 0 || mappedEdu.length > 0)) {
                    dispatch(updateSectionCustomData({
                        id: resumeSec.id,
                        data: {
                            ...resumeSec.customData,
                            experiences: mappedExp.length > 0 ? mappedExp : currentExp,
                            educations: mappedEdu.length > 0 ? mappedEdu : currentEdu,
                            isAutoSynced: true // Guard against loops
                        }
                    }));
                }
            }

            // 4. Sync Skills from Project Stack
            const skillsSec = sections.find(s => s.type === 'skills');
            if (skillsSec && skillsSec.customData?.isAutoSynced !== true && projects?.length > 0) {
                const languages = projects.map((p: any) => p.language?.toLowerCase()).filter(Boolean);
                const uniqueLangs = Array.from(new Set(languages)).slice(0, 15);
                if (uniqueLangs.length > 0) {
                    dispatch(updateSectionCustomData({
                        id: skillsSec.id,
                        data: {
                            ...skillsSec.customData,
                            techSlugs: uniqueLangs,
                            isAutoSynced: true
                        }
                    }));
                }
            }
        }

        // Sync user data to store if it's empty
        if (userData && !storeUserData?.name) {
            dispatch(updateUserData({
                name: userData.name || userData.username || '',
                profileImage: userData.avatarUrl || userData.profilePicture || ''
            }));
        }
    }, [template, jobRole, dispatch, userData, storeUserData?.name, sections, projects]);

    // --- AUTO-SAVE REGISTRY ---
    useEffect(() => {
        // Don't auto-save if we're in preview mode or just loaded the template
        if (isPreviewMode || !sections.length) return;

        const timer = setTimeout(async () => {
            setIsSaving(true);
            try {
                await dispatch(savePortfolioDraft()).unwrap();
            } catch (error) {
                console.error("Auto-save failed:", error);
            } finally {
                setIsSaving(false);
            }
        }, 3000); // 3 second debounce

        return () => clearTimeout(timer);
    }, [sections, theme, dispatch, isPreviewMode]);

    const renderTemplate = () => (
        <PortfolioTemplateInner
            userData={storeUserData}
            projects={projects}
            sections={sections}
        />
    );

    const handleStartOver = () => {
        if (window.confirm("Are you sure? This will reset all your portfolio customizations.")) {
            dispatch(resetPortfolio());
        }
    };

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
            {/* Left Sidebar - Hidden in Preview */}
            {!isPreviewMode && (
                <div className="w-80 flex-none border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col shadow-xl z-20 overflow-y-auto scrollbar-hide">
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Workspace</span>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {editorMode === 'portfolio' ? (
                            <>
                                {/* Tab Switcher */}
                                <div className="flex px-4 py-3 gap-1 bg-zinc-50/50 dark:bg-zinc-800/20 border-b border-zinc-100 dark:border-zinc-800">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setActiveTab('pages')}
                                        className={cn(
                                            "flex-1 gap-2 h-9 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                            activeTab === 'pages' ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700" : "text-zinc-400 hover:text-zinc-600"
                                        )}
                                    >
                                        <Layout className="w-3.5 h-3.5" />
                                        Pages
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setActiveTab('styles')}
                                        className={cn(
                                            "flex-1 gap-2 h-9 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                            activeTab === 'styles' ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700" : "text-zinc-400 hover:text-zinc-600"
                                        )}
                                    >
                                        <Layers className="w-3.5 h-3.5" />
                                        Style
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setActiveTab('settings')}
                                        className={cn(
                                            "flex-1 gap-2 h-9 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                            activeTab === 'settings' ? "bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700" : "text-zinc-400 hover:text-zinc-600"
                                        )}
                                    >
                                        <Settings className="w-3.5 h-3.5" />
                                        Setup
                                    </Button>
                                </div>

                                {/* Panel Content */}
                                <div className="p-4">
                                    {activeTab === 'pages' && <PagesPanel />}
                                    {activeTab === 'styles' && (
                                        <div className="space-y-6">
                                            <ThemePanel templateId={template.id} />
                                            <SectionVariantsPanel />
                                        </div>
                                    )}
                                    {activeTab === 'settings' && <SettingsPanel />}
                                </div>
                            </>
                        ) : (
                            <div className="p-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Resume Mode Active</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px] mx-auto">
                                    You are currently editing your downloadable resume. Switch back to Portfolio to edit your live site.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content Component */}
            <div className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-zinc-950 relative">
                {/* Fixed Top Bar */}
                <div className="h-16 flex-none bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 z-30">
                    <div className="flex items-center gap-6">
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="shrink-0">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[180px]">
                                {(storeUserData?.name || userData?.name || userData?.username)
                                    ? `${storeUserData?.name || userData?.name || userData?.username}'s Portfolio`
                                    : (detectedJobRole || 'Professional Portfolio')}
                            </h2>
                            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">
                                {isSaving ? "Saving..." : (isPreviewMode ? "Live Preview" : (editorMode === 'portfolio' ? "Latest Draft" : "Resume Builder"))}
                            </p>
                        </div>
                    </div>

                    {/* Editor Mode Toggle - Center */}
                    {!isPreviewMode && (
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dispatch(setEditorMode('portfolio'))}
                                className={cn(
                                    "h-8 rounded-lg px-4 text-[10px] font-black uppercase tracking-wider transition-all gap-2",
                                    editorMode === 'portfolio' ? "bg-white dark:bg-zinc-700 text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600" : "text-zinc-500 hover:text-zinc-900"
                                )}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                Portfolio
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dispatch(setEditorMode('resume'))}
                                className={cn(
                                    "h-8 rounded-lg px-4 text-[10px] font-black uppercase tracking-wider transition-all gap-2",
                                    editorMode === 'resume' ? "bg-white dark:bg-zinc-700 text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-600" : "text-zinc-500 hover:text-zinc-900"
                                )}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                Resume
                            </Button>
                        </div>
                    )}

                    {/* Device View Toggles - Hidden in Preview */}
                    {!isPreviewMode && (
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                            <button
                                onClick={() => setDeviceView('desktop')}
                                className={cn("p-1.5 rounded-lg transition-all", deviceView === 'desktop' ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-600" : "text-zinc-500 hover:text-zinc-700")}
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeviceView('tablet')}
                                className={cn("p-1.5 rounded-lg transition-all", deviceView === 'tablet' ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-600" : "text-zinc-500 hover:text-zinc-700")}
                            >
                                <Tablet className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeviceView('mobile')}
                                className={cn("p-1.5 rounded-lg transition-all", deviceView === 'mobile' ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-600" : "text-zinc-500 hover:text-zinc-700")}
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        {!isPreviewMode && (
                            <>
                                <div className="flex items-center gap-2 mr-2">
                                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400"><Undo className="w-4 h-4" /></button>
                                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400"><Redo className="w-4 h-4" /></button>
                                </div>
                                <Separator orientation="vertical" className="h-6" />
                            </>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(togglePreviewMode())}
                            className={cn(
                                "gap-2 font-bold text-xs px-4 rounded-xl transition-all",
                                isPreviewMode ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20" : "text-zinc-500 hover:text-indigo-600"
                            )}
                        >
                            {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {isPreviewMode ? "Back to Editor" : "Preview Site"}
                        </Button>
                        {!isPreviewMode && (
                            <Button variant="outline" size="sm" onClick={handleStartOver} className="h-9 px-4 rounded-xl text-xs font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 gap-2">
                                <RotateCcw className="w-3.5 h-3.5" />
                                Start Over
                            </Button>
                        )}
                        <Button onClick={onPublish} variant="default" size="sm" className="h-9 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 gap-2">
                            <Rocket className="w-4 h-4" />
                            Publish
                        </Button>
                    </div>
                </div>

                {/* Canvas Container */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide p-4 md:p-8 flex items-start justify-center bg-zinc-50 dark:bg-zinc-950">
                    <div className={cn(
                        "transition-all duration-500 w-full",
                        deviceView === 'desktop' ? (isPreviewMode ? "max-w-7xl" : "max-w-6xl") : "",
                        deviceView === 'tablet' ? "max-w-[768px]" : "",
                        deviceView === 'mobile' ? "max-w-[420px]" : ""
                    )}>
                        <div className={cn(
                            "bg-white dark:bg-zinc-900 transition-all duration-500 overflow-hidden",
                            isPreviewMode ? "rounded-none" : "rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
                        )}>
                            {editorMode === 'portfolio' ? (
                                renderTemplate()
                            ) : (
                                <div className="p-8 md:p-16 bg-zinc-100/30">
                                    <ResumePreview userData={userData} projects={projects} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Floating Contextual Panel - Hidden in Preview */}
                {!isPreviewMode && <RightContextPanel />}
            </div>
        </div>
    );
};
