import React, { useState } from 'react';
import { TemplateRenderer, UserData } from '@/services/templateRenderer';
import { AIEnhancer } from './AIEnhancer';
import { Wand2, Edit2 } from 'lucide-react';

interface EditableSectionProps {
  section: any;
  userData: UserData;
  projects: any[];
  onUpdate: (sectionId: string, field: string, value: any) => void;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  section,
  userData,
  projects,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content || '');

  const handleBlur = () => {
    onUpdate(section.id, 'content', content);
    setIsEditing(false);
  };

  const handleAIEnhanced = (enhanced: string) => {
    setContent(enhanced);
    onUpdate(section.id, 'content', enhanced);
  };

  // Render preview
  const renderer = new TemplateRenderer();
  const rendered = renderer.renderSectionHTML(
    section.type,
    content,
    userData
  );

  return (
    <section
      className="mb-8 relative group border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 rounded-lg transition-colors"
    >
      {/* Edit Mode */}
      {isEditing ? (
        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
            className="w-full min-h-[200px] p-4 border-2 border-blue-500 dark:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            autoFocus
            placeholder={`Enter your ${section.title || section.type} content...`}
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleBlur}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setContent(section.content || '');
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Preview */}
          <div
            onClick={() => setIsEditing(true)}
            className="cursor-text hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-lg transition-colors"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />

          {/* Edit Controls - Show on Hover */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow-md transition-shadow"
              title="Edit section"
            >
              <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
            <AIEnhancer
              sectionId={section.id}
              sectionType={section.type}
              currentContent={content}
              userData={userData}
              projects={projects}
              onEnhanced={handleAIEnhanced}
            />
          </div>
        </div>
      )}

      {/* Section Label */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {section.title || section.type}
      </div>
    </section>
  );
};

