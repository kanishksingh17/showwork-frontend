import React, { useState } from 'react';
import { TemplateMetadata } from '@/services/templateManager';
import { TemplateRenderer, UserData } from '@/services/templateRenderer';
import { EditableSection } from './EditableSection';

interface TemplateCanvasProps {
  template: TemplateMetadata;
  userData: any;
  projects: any[];
  customData: any;
  onUpdateSection: (sectionId: string, field: string, value: any) => void;
}

export const TemplateCanvas: React.FC<TemplateCanvasProps> = ({
  template,
  userData,
  projects,
  customData,
  onUpdateSection
}) => {
  const renderer = new TemplateRenderer();

  // Convert userData to UserData format
  const formattedUserData: UserData = {
    name: userData?.name || 'Developer',
    email: userData?.email,
    bio: userData?.bio || userData?.tagline,
    tagline: userData?.tagline,
    skills: userData?.skills || [],
    projects: projects.map((p: any) => ({
      name: p.name || p.title,
      description: p.description || '',
      technologies: p.technologies || [],
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      imageUrl: p.imageUrl
    })),
    socials: userData?.socials || {}
  };

  // Render template with custom data
  const rendered = renderer.render(
    {
      ...template,
      layoutJson: {
        sections: customData.sections,
        styles: customData.styles
      }
    },
    formattedUserData
  );

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white dark:bg-gray-800 min-h-full">
      <style dangerouslySetInnerHTML={{ __html: rendered.css }} />
      
      {/* Render sections dynamically with editing capability */}
      {customData.sections.map((section: any) => (
        <EditableSection
          key={section.id}
          section={section}
          userData={formattedUserData}
          projects={projects}
          onUpdate={onUpdateSection}
        />
      ))}
    </div>
  );
};

