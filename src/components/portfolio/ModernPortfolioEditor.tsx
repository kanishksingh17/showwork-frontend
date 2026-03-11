import React, { useState } from 'react';
import {
    Monitor,
    Smartphone,
    Tablet,
    Undo,
    Redo,
    Rocket,
    ArrowLeft,
    Layout,
    Layers as LayersIcon,
    Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PortfolioTemplateInner } from './templates/PortfolioTemplate';
import type { UserPortfolio, PortfolioTemplate } from '@/types/portfolio';

interface ModernPortfolioEditorProps {
    template: PortfolioTemplate;
    userData: any;
    projects: any[];
    jobRole?: any;
    onSave?: (portfolio: UserPortfolio) => void;
    onPublish?: () => void;
    onClose?: () => void;
}

import { useEffect } from 'react';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import {
    selectTemplate,
    setJobRole,
    setSections,
    updateTheme,
    setEditorMode,
} from '@/store/portfolio/portfolioSlice';

import { PagesPanel } from './editor/panels/PagesPanel';
import { SettingsPanel } from './editor/panels/SettingsPanel';
import { ResumeTemplatesPanel } from './editor/panels/ResumeTemplatesPanel';
import { ResumePreview } from './ResumePreview';
import { SectionVariantsPanel } from './editor/panels/SectionVariantsPanel';
import { ThemePanel } from './editor/panels/ThemePanel';

export const ModernPortfolioEditor: React.FC<ModernPortfolioEditorProps> = ({
    template,
    userData,
    projects,
    jobRole,
    onPublish,
    onClose
}) => {
    const dispatch = usePortfolioDispatch();
    const [activeTab, setActiveTab] = useState<'settings' | 'pages' | 'styles'>('pages');
    const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const currentTheme = usePortfolioSelector(state => state.portfolio.theme);
    const editorMode = usePortfolioSelector(state => state.portfolio.editorMode);
    const sections = usePortfolioSelector(state => state.portfolio.sections);
    const storeUserData = usePortfolioSelector(state => state.portfolio.userData);

    useEffect(() => {
        if (template) {
            dispatch(selectTemplate(template.id));
            // Only set default sections if the store doesn't already have sections populated
            // This prevents overwriting AI-generated content or user edits
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
    }, [template, jobRole, dispatch, sections]);

    const activeSection = usePortfolioSelector(state => state.portfolio.activeSection);

    // Effect to switch tab when a section is activated from the canvas
    useEffect(() => {
        if (activeSection) {
            setActiveTab('styles');
        }
    }, [activeSection]);

    // Effect to refresh iframe when systematic content changes (AI enhancement)
    useEffect(() => {
        if (template.templateEngine === 'external' && iframeRef.current) {
            const currentUrl = iframeRef.current.src;
            // Only reload if the URL contains the username (so we don't reload blank/default states)
            if (currentUrl.includes('username=')) {
                console.log("🔄 Systematic content changed, refreshing preview iframe...");
                iframeRef.current.src = currentUrl;
            }
        }
    }, [storeUserData.professionalHeadline, storeUserData.professionalBio, template.templateEngine]);

    return (
        <div className="flex h-full w-full bg-[#FAFAFA] overflow-hidden font-sans text-gray-900">
            {/* Left Sidebar */}
            <aside className="w-[320px] bg-white border-r border-gray-100 flex flex-col z-20 shadow-sm transition-all">
                {/* Sidebar Header */}
                <div className="h-14 flex items-center px-4 border-b border-gray-100 shrink-0 gap-2">
                    {onClose && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2" onClick={onClose}>
                            <ArrowLeft className="w-4 h-4 text-gray-500" />
                        </Button>
                    )}
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                        <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white shrink-0">
                            <Layout className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-sm truncate flex-1">{userData.name || 'My Portfolio'}</span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex p-2 gap-1 border-b border-gray-100 bg-gray-50/50 shrink-0">
                    <Button
                        variant={activeTab === 'pages' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1 gap-2 h-9 text-xs font-medium"
                        onClick={() => setActiveTab('pages')}
                    >
                        <Layout className="w-3.5 h-3.5" />
                        Pages
                    </Button>
                    <Button
                        variant={activeTab === 'styles' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1 gap-2 h-9 text-xs font-medium"
                        onClick={() => setActiveTab('styles')}
                    >
                        <LayersIcon className="w-3.5 h-3.5" />
                        Style
                    </Button>
                    <Button
                        variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1 gap-2 h-9 text-xs font-medium"
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings className="w-3.5 h-3.5" />
                        Settings
                    </Button>
                </div>

                {/* Main Panel Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {editorMode === 'portfolio' ? (
                        <>
                            {activeTab === 'pages' && (
                                template.templateEngine === 'external'
                                    ? <ThemePanel templateId={template.id} iframeRef={iframeRef} />
                                    : <PagesPanel />
                            )}
                            {activeTab === 'styles' && (
                                template.templateEngine === 'external'
                                    ? <ThemePanel templateId={template.id} iframeRef={iframeRef} />
                                    : <SectionVariantsPanel />
                            )}
                            {activeTab === 'settings' && <SettingsPanel />}
                        </>
                    ) : (
                        <>
                            <ResumeTemplatesPanel />
                        </>
                    )}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-100 shrink-0 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-500">Changes saved automatically</span>
                    </div>

                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800" onClick={onPublish}>
                        {editorMode === 'portfolio' ? 'Publish Portfolio' : 'Download Resume'}
                    </Button>
                </div>
            </aside>

            {/* ... rest of the component ... */}

            {/* Main Canvas Area */}
            <main className="flex-1 flex flex-col h-full relative bg-gray-50/50">

                {/* Top Toolbar */}
                <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                        <button
                            className={`p-1.5 rounded-md transition-all ${deviceView === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setDeviceView('desktop')}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            className={`p-1.5 rounded-md transition-all ${deviceView === 'tablet' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setDeviceView('tablet')}
                        >
                            <Tablet className="w-4 h-4" />
                        </button>
                        <button
                            className={`p-1.5 rounded-md transition-all ${deviceView === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setDeviceView('mobile')}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
                        <Button
                            variant={editorMode === 'portfolio' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={`h-8 rounded-full px-4 text-xs font-medium transition-all ${editorMode === 'portfolio' ? 'bg-white shadow-sm border-gray-200' : ''}`}
                            onClick={() => dispatch(setEditorMode('portfolio'))}
                        >
                            Portfolio
                        </Button>
                        <Button
                            variant={editorMode === 'resume' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={`h-8 rounded-full px-4 text-xs font-medium transition-all ${editorMode === 'resume' ? 'bg-white shadow-sm border-gray-200' : ''}`}
                            onClick={() => dispatch(setEditorMode('resume'))}
                        >
                            Resume
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Undo className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Redo className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Separator orientation="vertical" className="h-6 mx-1" />
                        <Button variant="outline" size="sm" className="h-8 gap-2" onClick={() => window.open(template.previewUrl || '#', '_blank')}>
                            <Rocket className="w-3.5 h-3.5" />
                            Live Preview
                        </Button>
                    </div>
                </header>

                {/* Canvas */}
                <div className={`flex-1 overflow-hidden relative flex ${deviceView === 'desktop' ? '' : 'items-center justify-center p-8'}`}>
                    <div
                        className={`
                transition-all duration-300 ease-in-out relative transform-gpu overflow-hidden
                ${deviceView === 'desktop' ? 'w-full h-full' : 'shadow-2xl border border-gray-200'}
                ${deviceView === 'tablet' ? 'w-[768px] h-[90%] rounded-xl' : ''}
                ${deviceView === 'mobile' ? 'w-[375px] h-[90%] rounded-2xl' : ''}
                ${currentTheme.mode === 'dark' ? 'dark' : ''}
             `}
                    >
                        {/* This is where rendering happens */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar h-full">
                            {editorMode === 'portfolio' ? (
                                template.templateEngine === 'external' && template.previewUrl ? (
                                    // External (file-based) template — show live iframe
                                    <iframe
                                        ref={iframeRef}
                                        src={`${template.previewUrl}?username=${userData?.username || userData?.id || ''}`}
                                        className="w-full border-0"
                                        style={{ height: '100vh', minHeight: '600px' }}
                                        title={`${template.name} live preview`}
                                    />
                                ) : (
                                    // Section-based internal template
                                    <div className="min-h-full">
                                        <PortfolioTemplateInner
                                            userData={storeUserData}
                                            projects={projects}
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="pt-16">
                                    <ResumePreview userData={userData} projects={projects} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};
