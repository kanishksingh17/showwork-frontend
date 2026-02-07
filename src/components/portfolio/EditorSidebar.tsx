import React from 'react';
import { Save, Palette, Type, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIEnhancer } from './AIEnhancer';
import { UserData } from '@/services/templateRenderer';

interface EditorSidebarProps {
  sections: any[];
  styles: any;
  colors: any;
  fonts: any;
  onUpdateSection: (sectionId: string, field: string, value: any) => void;
  onUpdateColor: (colorKey: string, value: string) => void;
  onUpdateFont: (fontKey: string, value: string) => void;
  onSave: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  sections,
  styles,
  colors,
  fonts,
  onUpdateSection,
  onUpdateColor,
  onUpdateFont,
  onSave
}) => {
  return (
    <div className="p-4 space-y-6 h-full">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold">Editor</h2>
        <Button onClick={onSave} size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4 mt-4">
          {sections.map((section: any) => (
            <div key={section.id} className="space-y-2 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">{section.title || section.type}</Label>
                {section.isRequired && (
                  <span className="text-xs text-gray-500">Required</span>
                )}
              </div>
              <Textarea
                value={section.content || ''}
                onChange={(e) => onUpdateSection(section.id, 'content', e.target.value)}
                className="min-h-[100px] text-sm"
                placeholder={`Enter ${section.title || section.type} content...`}
              />
              <AIEnhancer
                sectionId={section.id}
                sectionType={section.type}
                currentContent={section.content || ''}
                userData={{ name: '', bio: '', skills: [], projects: [] }}
                projects={[]}
                onEnhanced={(enhanced) => onUpdateSection(section.id, 'content', enhanced)}
              />
            </div>
          ))}
        </TabsContent>

        {/* Design Tab */}
        <TabsContent value="design" className="space-y-4 mt-4">
          {/* Colors */}
          <div className="space-y-3 p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <Label className="font-semibold">Colors</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Primary</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colors.primary || '#1D4ED8'}
                    onChange={(e) => onUpdateColor('primary', e.target.value)}
                    className="h-10 w-16"
                  />
                  <Input
                    type="text"
                    value={colors.primary || '#1D4ED8'}
                    onChange={(e) => onUpdateColor('primary', e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Secondary</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colors.secondary || '#64748b'}
                    onChange={(e) => onUpdateColor('secondary', e.target.value)}
                    className="h-10 w-16"
                  />
                  <Input
                    type="text"
                    value={colors.secondary || '#64748b'}
                    onChange={(e) => onUpdateColor('secondary', e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Accent</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colors.accent || '#f59e0b'}
                    onChange={(e) => onUpdateColor('accent', e.target.value)}
                    className="h-10 w-16"
                  />
                  <Input
                    type="text"
                    value={colors.accent || '#f59e0b'}
                    onChange={(e) => onUpdateColor('accent', e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Background</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colors.background || '#ffffff'}
                    onChange={(e) => onUpdateColor('background', e.target.value)}
                    className="h-10 w-16"
                  />
                  <Input
                    type="text"
                    value={colors.background || '#ffffff'}
                    onChange={(e) => onUpdateColor('background', e.target.value)}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fonts */}
          <div className="space-y-3 p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <Label className="font-semibold">Typography</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label className="text-xs">Heading Font</Label>
                <Select
                  value={fonts.heading || 'Inter'}
                  onValueChange={(value) => onUpdateFont('heading', value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Body Font</Label>
                <Select
                  value={fonts.body || 'Inter'}
                  onValueChange={(value) => onUpdateFont('body', value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4 mt-4">
          <div className="space-y-3 p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <Label className="font-semibold">Layout Settings</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label className="text-xs">Spacing</Label>
                <Select
                  value={styles.spacing || 'normal'}
                  onValueChange={(value) => {
                    // Update spacing in styles
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Alignment</Label>
                <Select
                  value={styles.alignment || 'left'}
                  onValueChange={(value) => {
                    // Update alignment in styles
                  }}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

