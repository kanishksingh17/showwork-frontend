import React from "react";
import type { GeneratedContent } from "@/lib/services/contentGenerator";
import { ContentPreview } from "./ContentPreview";
import { Loader2 } from "lucide-react";

interface PostCardsGridProps {
    generatedContent: Record<string, GeneratedContent>;
    platforms: Array<{ id: string; name: string; icon: React.ReactNode; color: string }>;
    isLoading: boolean;
    onEdit: (platform: string, content: GeneratedContent) => void;
}

export function PostCardsGrid({
    generatedContent,
    platforms,
    isLoading,
    onEdit,
}: PostCardsGridProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Generating content...</p>
            </div>
        );
    }

    const hasContent = Object.keys(generatedContent).length > 0;

    if (!hasContent) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                <p>Select platforms and click Generate to create posts</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {platforms.map((platform) => {
                const content = generatedContent[platform.id];
                if (!content) return null;

                return (
                    <ContentPreview
                        key={platform.id}
                        content={content}
                        platformName={platform.name}
                        platformColor={platform.color}
                        platformIcon={platform.icon}
                        onEdit={(platformId, newMessage) => {
                            const updatedContent = { ...content, message: newMessage };
                            onEdit(platformId, updatedContent);
                        }}
                    />
                );
            })}
        </div>
    );
}
