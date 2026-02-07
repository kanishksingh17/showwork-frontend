import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { UserData } from '@/services/templateRenderer';

interface AIEnhancerProps {
  sectionId: string;
  sectionType: string;
  currentContent: string;
  userData: UserData;
  projects: any[];
  onEnhanced: (content: string) => void;
}

export const AIEnhancer: React.FC<AIEnhancerProps> = ({
  sectionId,
  sectionType,
  currentContent,
  userData,
  projects,
  onEnhanced
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enhance = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/enhance-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          sectionType,
          content: currentContent,
          userData: {
            name: userData.name,
            bio: userData.bio,
            skills: userData.skills,
            projects: projects.slice(0, 5) // Limit to top 5 projects
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }

      const { enhanced } = await response.json();
      onEnhanced(enhanced);
    } catch (err) {
      console.error('AI enhancement failed:', err);
      setError('Failed to enhance content. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={enhance}
        disabled={isGenerating}
        className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        title="Enhance with AI"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
        ) : (
          <Wand2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        )}
      </button>

      {error && (
        <div className="absolute top-full right-0 mt-2 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded shadow-lg z-10 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

