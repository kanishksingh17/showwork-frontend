import React, { useState, useEffect } from 'react';
import { TemplateCanvas } from './TemplateCanvas';
import { EditorSidebar } from './EditorSidebar';
import { TemplateMetadata } from '@/services/templateManager';
import type { UserPortfolio } from '@/types/portfolio';

interface TemplateEditorProps {
  template: TemplateMetadata;
  userData: any;
  projects: any[];
  onSave: (customData: any) => void;
  onPreview?: (portfolio: UserPortfolio) => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  userData,
  projects,
  onSave,
  onPreview
}) => {
  const [customData, setCustomData] = useState({
    sections: template.layoutJson?.sections || [],
    styles: template.layoutJson?.styles || {},
    colors: template.layoutJson?.styles?.colors || {
      primary: '#1D4ED8',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: template.layoutJson?.styles?.fonts || {
      heading: 'Inter',
      body: 'Inter'
    }
  });

  const updateSection = (sectionId: string, field: string, value: any) => {
    setCustomData(prev => ({
      ...prev,
      sections: prev.sections.map((s: any) =>
        s.id === sectionId ? { ...s, [field]: value } : s
      )
    }));
  };

  const updateColor = (colorKey: string, value: string) => {
    setCustomData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        colors: { ...prev.colors, [colorKey]: value }
      },
      colors: { ...prev.colors, [colorKey]: value }
    }));
  };

  const updateFont = (fontKey: string, value: string) => {
    setCustomData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        fonts: { ...prev.fonts, [fontKey]: value }
      },
      fonts: { ...prev.fonts, [fontKey]: value }
    }));
  };

  const handleSave = () => {
    onSave(customData);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Canvas - Live Preview */}
      <div className="flex-1 overflow-auto">
        <TemplateCanvas
          template={template}
          userData={userData}
          projects={projects}
          customData={customData}
          onUpdateSection={updateSection}
        />
      </div>

      {/* Editor Sidebar */}
      <div className="w-80 border-l bg-white dark:bg-gray-800 overflow-y-auto">
        <EditorSidebar
          sections={customData.sections}
          styles={customData.styles}
          colors={customData.colors}
          fonts={customData.fonts}
          onUpdateSection={updateSection}
          onUpdateColor={updateColor}
          onUpdateFont={updateFont}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

