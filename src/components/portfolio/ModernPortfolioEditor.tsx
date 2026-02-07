import React, { useState } from 'react';
import {
    Settings,
    Palette,
    Layout,
    Home,
    Plus,
    ChevronDown,
    Monitor,
    Smartphone,
    Tablet,
    Undo,
    Redo,
    Rocket,
    ArrowLeft,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { Badge } from '@/components/ui/badge';
import { DynamicPortfolioRenderer } from './DynamicPortfolioRenderer';
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
import { updateUserData, selectTemplate, setJobRole, setSections, updateTheme } from '@/store/portfolio/portfolioSlice';

import { ThemePanel } from './editor/panels/ThemePanel';
import { PagesPanel } from './editor/panels/PagesPanel';
import { SettingsPanel } from './editor/panels/SettingsPanel';

export const ModernPortfolioEditor: React.FC<ModernPortfolioEditorProps> = ({
    template,
    userData,
    projects,
    jobRole,
    onPublish,
    onClose
}) => {
    const dispatch = usePortfolioDispatch();
    const [activeTab, setActiveTab] = useState<'settings' | 'theme' | 'pages'>('pages');
    const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const currentTheme = usePortfolioSelector(state => state.portfolio.theme);

    useEffect(() => {
        if (template) {
            dispatch(selectTemplate(template.id));
            if (template.sections) {
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
    }, [template, jobRole, dispatch]);

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
                        variant={activeTab === 'theme' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1 gap-2 h-9 text-xs font-medium"
                        onClick={() => setActiveTab('theme')}
                    >
                        <Palette className="w-3.5 h-3.5" />
                        Theme
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
                    {activeTab === 'pages' && <PagesPanel />}
                    {activeTab === 'theme' && <ThemePanel />}
                    {activeTab === 'settings' && <SettingsPanel />}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-100 shrink-0 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-500">Changes saved automatically</span>
                    </div>

                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800" onClick={onPublish}>
                        Publish Portfolio
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
                bg-white transition-all duration-300 ease-in-out overflow-hidden relative
                ${deviceView === 'desktop' ? 'w-full h-full' : 'shadow-2xl border border-gray-200'}
                ${deviceView === 'tablet' ? 'w-[768px] h-[90%] rounded-xl' : ''}
                ${deviceView === 'mobile' ? 'w-[375px] h-[90%] rounded-2xl' : ''}
                ${currentTheme.mode === 'dark' ? 'dark' : ''}
             `}
                    >
                        {/* This is where rendering happens */}
                        <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-900 custom-scrollbar">
                            <div className="min-h-full">
                                <DynamicPortfolioRenderer
                                    templateId={template.id}
                                    sections={template.sections || []}
                                    userData={userData}
                                    projects={projects}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};
