import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { setRightPanelOpen } from '@/store/portfolio/portfolioSlice';
import { X, Settings, Sparkles, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { BlockSettingsPanel } from './BlockSettingsPanel';
import { ScrollArea } from '@/components/ui/scroll-area';

export const RightContextPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const isOpen = usePortfolioSelector(state => state.portfolio.isRightPanelOpen);
    const activeSectionId = usePortfolioSelector(state => state.portfolio.activeSection);
    const sections = usePortfolioSelector(state => state.portfolio.sections);

    const activeSection = sections.find(s => s.id === activeSectionId);

    const handleClose = () => {
        dispatch(setRightPanelOpen(false));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.aside
                    initial={{ x: 350, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 350, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="fixed right-6 top-20 bottom-6 w-[350px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-white/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-500 rounded-lg text-white">
                                <Settings className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Content Editor</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                                    {activeSection?.type || 'Section'} Settings
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        {activeSection ? (
                            <div className="space-y-8 pb-12">
                                <BlockSettingsPanel />

                                {/* AI Enhancement Shortcut */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg overflow-hidden relative group">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="w-4 h-4" />
                                            <h4 className="text-sm font-bold">AI Impact Refresh</h4>
                                        </div>
                                        <p className="text-xs text-white/80 mb-4 leading-relaxed">
                                            Let AI regenerate this entire section based on your most recent project updates.
                                        </p>
                                        <Button
                                            size="sm"
                                            className="w-full bg-white text-indigo-600 hover:bg-gray-100 border-none font-bold"
                                        >
                                            Generate with AI
                                        </Button>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                                        <Layout className="w-16 h-16" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-20 grayscale opacity-40">
                                <Settings className="w-12 h-12 mb-4 animate-spin-slow" />
                                <p className="text-sm text-gray-500">Pick a block to start editing content.</p>
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer / Status */}
                    <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-center">
                        <p className="text-[10px] text-gray-400 font-medium">Auto-sync enabled</p>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};
