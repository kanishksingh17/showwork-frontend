import React, { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Palette, Eye, EyeOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import {
    getTemplateConfig,
    type TemplateThemeConfig,
    DEFAULT_THEME,
} from '@/config/template-configs';

interface ThemePanelProps {
    templateId: string;
    iframeRef?: React.RefObject<HTMLIFrameElement>;
}

export const ThemePanel: React.FC<ThemePanelProps> = ({ templateId, iframeRef }) => {
    const config = getTemplateConfig(templateId);
    const [theme, setTheme] = useState<TemplateThemeConfig>(
        config?.defaultTheme ?? DEFAULT_THEME
    );
    const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>(
        () => Object.fromEntries(
            (config?.toggleableSections ?? []).map(s => [s.id, s.defaultVisible])
        )
    );
    const [isSaving, setIsSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<Date | null>(null);

    const handleThemeChange = useCallback((key: keyof TemplateThemeConfig, value: string) => {
        const updated = { ...theme, [key]: value };
        setTheme(updated);
        // Phase 2: real-time postMessage to the live iframe
        if (iframeRef?.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_THEME', payload: updated }, '*');
        }
    }, [theme, iframeRef]);

    const handleSectionToggle = useCallback((sectionId: string, visible: boolean) => {
        const updated = { ...sectionVisibility, [sectionId]: visible };
        setSectionVisibility(updated);
        if (iframeRef?.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_SECTIONS', payload: updated }, '*');
        }
    }, [sectionVisibility, iframeRef]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch('/api/auth/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ themeConfig: { ...theme, sectionVisibility, templateId } }),
            });
            setSavedAt(new Date());
        } catch (err) {
            console.error('Failed to save theme:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!config) {
        return (
            <div className="p-4 text-sm text-gray-500 text-center">
                <Palette className="w-8 h-8 mx-auto mb-2 opacity-30" />
                No theme controls for this template.
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="mb-5">
                <h3 className="text-lg font-semibold mb-1">Theme</h3>
                <p className="text-sm text-gray-500">
                    Customize <strong>{config.name}</strong> — only supported controls are shown.
                </p>
            </div>

            <ScrollArea className="flex-1 pr-2 -mr-2">
                <div className="space-y-6 pb-6">

                    {/* ── Appearance Controls ─────────────────────────────────────── */}
                    <section>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Appearance</p>
                        <div className="space-y-4">
                            {config.controls.map((control) => (
                                <div key={control.key} className="space-y-1.5">
                                    <Label className="text-sm font-medium">{control.label}</Label>

                                    {control.type === 'color' && (
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-9 h-9 rounded-lg border-2 border-white shadow-md cursor-pointer ring-1 ring-gray-200 overflow-hidden"
                                                style={{ backgroundColor: theme[control.key as keyof TemplateThemeConfig] as string }}
                                            >
                                                <input
                                                    type="color"
                                                    value={theme[control.key as keyof TemplateThemeConfig] as string}
                                                    onChange={(e) => handleThemeChange(control.key as keyof TemplateThemeConfig, e.target.value)}
                                                    className="opacity-0 w-full h-full cursor-pointer"
                                                />
                                            </div>
                                            <span className="text-sm font-mono text-gray-600">
                                                {theme[control.key as keyof TemplateThemeConfig] as string}
                                            </span>
                                        </div>
                                    )}

                                    {control.type === 'select' && (
                                        <div className="flex flex-wrap gap-2">
                                            {control.options?.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleThemeChange(control.key as keyof TemplateThemeConfig, opt.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${theme[control.key as keyof TemplateThemeConfig] === opt.value
                                                            ? 'bg-gray-900 text-white border-gray-900'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Section Toggles ─────────────────────────────────────────── */}
                    {config.toggleableSections.length > 0 && (
                        <section>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</p>
                            <div className="space-y-2">
                                {config.toggleableSections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${sectionVisibility[section.id]
                                                ? 'bg-white border-gray-200 shadow-sm'
                                                : 'bg-gray-50 border-gray-100 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {sectionVisibility[section.id]
                                                ? <Eye className="w-3.5 h-3.5 text-gray-400" />
                                                : <EyeOff className="w-3.5 h-3.5 text-gray-300" />}
                                            <span className="text-sm font-medium">{section.label}</span>
                                        </div>
                                        <Switch
                                            checked={sectionVisibility[section.id]}
                                            onCheckedChange={(val) => handleSectionToggle(section.id, val)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </ScrollArea>

            {/* Save */}
            <div className="pt-4 border-t border-gray-100 mt-2">
                {savedAt && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Saved {savedAt.toLocaleTimeString()}
                    </p>
                )}
                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 gap-2" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...</> : 'Save Theme'}
                </Button>
            </div>
        </div>
    );
};
