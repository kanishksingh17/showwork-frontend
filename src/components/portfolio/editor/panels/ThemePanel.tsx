import React, { useState } from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateTheme } from '@/store/portfolio/portfolioSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const COLOR_PALETTES = [
    ['#60A5FA', '#1E3A8A'], // Blue
    ['#6366F1', '#312E81'], // Indigo
    ['#60A5FA', '#1E40AF'], // Blue dark
    ['#1E40AF', '#1E3A8A'], // Navy
    ['#34D399', '#065F46'], // Green
    ['#10B981', '#064E3B'], // Emerald
    ['#A78BFA', '#5B21B6'], // Purple
    ['#8B5CF6', '#4C1D95'], // Violet
    ['#FCA5A5', '#7F1D1D'], // Red light
    ['#DC2626', '#7F1D1D'], // Red
    ['#FCA5A5', '#991B1B'], // Red pink
    ['#7F1D1D', '#450A0A'], // Dark red
    ['#FBBF24', '#92400E'], // Yellow
    ['#F59E0B', '#78350F'], // Amber
    ['#D1D5DB', '#111827'], // Gray
    ['#FBBF24', '#F59E0B'], // Yellow-Orange
];

const FONT_PREVIEWS = [
    { value: 'Inter', label: 'Aa' },
    { value: 'Poppins', label: 'Aa' },
    { value: 'Roboto', label: 'Aa' },
];

export const ThemePanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const theme = usePortfolioSelector(state => state.portfolio.theme);

    const [buttonSettings, setButtonSettings] = useState({
        radius: 10,
        borderSize: 1,
        horizontalPadding: 32,
        verticalPadding: 12,
        fontSize: 14,
    });

    const [fontSizes, setFontSizes] = useState({
        h1: 48,
        h2: 48,
        h3: 24,
        subtitle: 16,
        content: 16,
    });

    const [inputSettings, setInputSettings] = useState({
        radius: 10,
        borderSize: 1,
        horizontalPadding: 20,
        verticalPadding: 15,
        labelFontSize: 12,
        labelFontWeight: 400,
        labelBottomMargin: 5,
        inputFontSize: 14,
        inputFontWeight: 400,
    });

    const [cardSettings, setCardSettings] = useState({
        radius: 10,
        shadow: 'Default',
    });

    const [spacing, setSpacing] = useState({
        extraVerticalSpace: 0,
    });

    const [customCSS, setCustomCSS] = useState('/* custom CSS */');

    const handleColorChange = (key: 'primaryColor' | 'secondaryColor', value: string) => {
        dispatch(updateTheme({ [key]: value }));
    };

    const handleFontChange = (value: string) => {
        dispatch(updateTheme({ fontFamily: value }));
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-lg font-semibold">Theme</h3>
            </div>

            <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="space-y-8 pb-6">
                    {/* Colors Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Colors</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {COLOR_PALETTES.map((palette, index) => (
                                <button
                                    key={index}
                                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
                                    onClick={() => handleColorChange('primaryColor', palette[0])}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-200"
                                        style={{ backgroundColor: palette[0] }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-200"
                                        style={{ backgroundColor: palette[1] }}
                                    />
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full">
                            Custom
                        </Button>
                    </div>

                    {/* Fonts Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Fonts</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {FONT_PREVIEWS.map((font) => (
                                <button
                                    key={font.value}
                                    className={`
                                        flex items-center justify-center p-4 rounded-lg border transition-all
                                        ${theme.fontFamily === font.value
                                            ? 'border-gray-900 bg-gray-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                        }
                                    `}
                                    style={{ fontFamily: font.value }}
                                    onClick={() => handleFontChange(font.value)}
                                >
                                    <span className="text-2xl font-medium">{font.label}</span>
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full">
                            Custom
                        </Button>
                    </div>

                    {/* Font Size Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Font size</Label>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                            <div style={{ fontSize: `${fontSizes.h1}px`, fontFamily: theme.fontFamily }} className="font-bold">
                                H1 Title
                            </div>
                            <div style={{ fontSize: `${fontSizes.h2}px`, fontFamily: theme.fontFamily }} className="font-bold">
                                H2 Title
                            </div>
                            <div style={{ fontSize: `${fontSizes.h3}px`, fontFamily: theme.fontFamily }} className="font-bold">
                                H3 Title
                            </div>
                            <div style={{ fontSize: `${fontSizes.subtitle}px`, fontFamily: theme.fontFamily }} className="text-gray-600">
                                Subtitle text
                            </div>
                            <div style={{ fontSize: `${fontSizes.content}px`, fontFamily: theme.fontFamily }} className="text-gray-700">
                                Content text
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">H1 title</Label>
                                <Input
                                    type="number"
                                    value={fontSizes.h1}
                                    onChange={(e) => setFontSizes(prev => ({ ...prev, h1: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">H2 titles</Label>
                                <Input
                                    type="number"
                                    value={fontSizes.h2}
                                    onChange={(e) => setFontSizes(prev => ({ ...prev, h2: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">H3 titles</Label>
                                <Input
                                    type="number"
                                    value={fontSizes.h3}
                                    onChange={(e) => setFontSizes(prev => ({ ...prev, h3: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Subtitles</Label>
                                <Input
                                    type="number"
                                    value={fontSizes.subtitle}
                                    onChange={(e) => setFontSizes(prev => ({ ...prev, subtitle: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Content</Label>
                                <Input
                                    type="number"
                                    value={fontSizes.content}
                                    onChange={(e) => setFontSizes(prev => ({ ...prev, content: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Buttons</Label>
                        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <button
                                style={{
                                    backgroundColor: theme.primaryColor,
                                    borderRadius: `${buttonSettings.radius}px`,
                                    border: `${buttonSettings.borderSize}px solid transparent`,
                                    paddingLeft: `${buttonSettings.horizontalPadding}px`,
                                    paddingRight: `${buttonSettings.horizontalPadding}px`,
                                    paddingTop: `${buttonSettings.verticalPadding}px`,
                                    paddingBottom: `${buttonSettings.verticalPadding}px`,
                                    fontSize: `${buttonSettings.fontSize}px`,
                                    fontFamily: theme.fontFamily,
                                }}
                                className="text-white font-medium shadow-md"
                            >
                                Example button
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Radius</Label>
                                <Input
                                    type="number"
                                    value={buttonSettings.radius}
                                    onChange={(e) => setButtonSettings(prev => ({ ...prev, radius: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Border size</Label>
                                <Input
                                    type="number"
                                    value={buttonSettings.borderSize}
                                    onChange={(e) => setButtonSettings(prev => ({ ...prev, borderSize: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Horizontal padding</Label>
                                <Input
                                    type="number"
                                    value={buttonSettings.horizontalPadding}
                                    onChange={(e) => setButtonSettings(prev => ({ ...prev, horizontalPadding: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Vertical padding</Label>
                                <Input
                                    type="number"
                                    value={buttonSettings.verticalPadding}
                                    onChange={(e) => setButtonSettings(prev => ({ ...prev, verticalPadding: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Font size</Label>
                                <Input
                                    type="number"
                                    value={buttonSettings.fontSize}
                                    onChange={(e) => setButtonSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inputs Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Inputs</Label>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <label
                                style={{
                                    fontSize: `${inputSettings.labelFontSize}px`,
                                    fontWeight: inputSettings.labelFontWeight,
                                    marginBottom: `${inputSettings.labelBottomMargin}px`,
                                    display: 'block'
                                }}
                                className="text-gray-700"
                            >
                                Label
                            </label>
                            <input
                                placeholder="Placeholder"
                                style={{
                                    borderRadius: `${inputSettings.radius}px`,
                                    border: `${inputSettings.borderSize}px solid #d1d5db`,
                                    paddingLeft: `${inputSettings.horizontalPadding}px`,
                                    paddingRight: `${inputSettings.horizontalPadding}px`,
                                    paddingTop: `${inputSettings.verticalPadding}px`,
                                    paddingBottom: `${inputSettings.verticalPadding}px`,
                                    fontSize: `${inputSettings.inputFontSize}px`,
                                    fontWeight: inputSettings.inputFontWeight,
                                    fontFamily: theme.fontFamily,
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Radius</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.radius}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, radius: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Border size</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.borderSize}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, borderSize: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Horizontal padding</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.horizontalPadding}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, horizontalPadding: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Vertical padding</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.verticalPadding}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, verticalPadding: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Label font size</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.labelFontSize}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, labelFontSize: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Label font weight</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.labelFontWeight}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, labelFontWeight: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Label bottom margin</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.labelBottomMargin}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, labelBottomMargin: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Input font size</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.inputFontSize}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, inputFontSize: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Input font weight</Label>
                                <Input
                                    type="number"
                                    value={inputSettings.inputFontWeight}
                                    onChange={(e) => setInputSettings(prev => ({ ...prev, inputFontWeight: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Cards</Label>
                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                            <div
                                className="bg-white p-6 shadow-md"
                                style={{ borderRadius: `${cardSettings.radius}px` }}
                            >
                                <div className="text-lg font-bold mb-2">Card</div>
                                <div className="text-sm text-gray-600">Lorem ipsum</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Radius</Label>
                                <Input
                                    type="number"
                                    value={cardSettings.radius}
                                    onChange={(e) => setCardSettings(prev => ({ ...prev, radius: parseInt(e.target.value) || 0 }))}
                                    className="w-20 h-8 text-right"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-sm text-gray-600">Shadow</Label>
                                <Select value={cardSettings.shadow} onValueChange={(value) => setCardSettings(prev => ({ ...prev, shadow: value }))}>
                                    <SelectTrigger className="w-32 h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Default">Default</SelectItem>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Small">Small</SelectItem>
                                        <SelectItem value="Large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Spacing Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Spacing</Label>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-300" />
                            <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-300" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label className="text-sm text-gray-600">Extra vertical space</Label>
                            <Input
                                type="number"
                                value={spacing.extraVerticalSpace}
                                onChange={(e) => setSpacing(prev => ({ ...prev, extraVerticalSpace: parseInt(e.target.value) || 0 }))}
                                className="w-20 h-8 text-right"
                            />
                        </div>
                    </div>

                    {/* Custom CSS Section */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">Custom CSS</Label>
                        <textarea
                            value={customCSS}
                            onChange={(e) => setCustomCSS(e.target.value)}
                            className="w-full h-24 p-3 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border border-gray-700 resize-none"
                            style={{ fontFamily: 'monospace' }}
                        />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
