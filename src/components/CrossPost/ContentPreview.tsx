import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, AlertCircle, Edit2 } from "lucide-react";
import type { GeneratedContent } from "@/lib/services/contentGenerator";

interface ContentPreviewProps {
  content: GeneratedContent;
  onEdit?: (platform: string, newMessage: string) => void;
  platformName: string;
  platformColor: string;
  platformIcon: React.ReactNode;
}

export function ContentPreview({
  content,
  onEdit,
  platformName,
  platformColor,
  platformIcon,
}: ContentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(content.message);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // For Reddit, copy title + message, for others just message
    const textToCopy = content.platform === "reddit" && content.metadata.title
      ? `${content.metadata.title}\n\n${content.message}`
      : content.message;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(content.platform, editedMessage);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMessage(content.message);
    setIsEditing(false);
  };

  const getCharacterCountColor = () => {
    const rules = getPlatformRules(content.platform);
    const percentage = (content.metadata.characterCount / rules.maxLength) * 100;

    if (percentage > 95) return "text-red-600";
    if (percentage > 80) return "text-yellow-600";
    return "text-gray-600";
  };

  const getPlatformRules = (platform: string) => {
    const rules: Record<string, { maxLength: number }> = {
      linkedin: { maxLength: 1300 },
      twitter: { maxLength: 280 },
      instagram: { maxLength: 2200 },
      facebook: { maxLength: 5000 },
      reddit: { maxLength: 40000 },
      github: { maxLength: 500 },
    };
    return rules[platform] || { maxLength: 1000 };
  };

  return (
    <Card className={`border-2 ${content.metadata.isValid ? '' : 'border-yellow-400'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: `${platformColor}20` }}
            >
              <div style={{ color: platformColor }}>{platformIcon}</div>
            </div>
            <span>{platformName}</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {content.metadata.warnings && content.metadata.warnings.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Warning
              </Badge>
            )}
            {content.metadata.isValid && (
              <Badge variant="outline" className="text-xs bg-green-50">
                Valid
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={6}
              className="font-mono text-sm"
            />
            <div className="flex items-center justify-between">
              <span className={`text-xs ${getCharacterCountColor()}`}>
                {editedMessage.length} / {getPlatformRules(content.platform).maxLength} characters
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Reddit Title Field */}
            {content.platform === "reddit" && content.metadata.title && (
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  Post Title:
                </label>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {content.metadata.title}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 min-h-[120px]">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {content.message}
              </pre>
            </div>

            {content.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {content.hashtags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-4">
                <span className={`text-xs ${getCharacterCountColor()}`}>
                  {content.metadata.characterCount} chars
                </span>
                {content.metadata.warnings && (
                  <span className="text-xs text-yellow-600">
                    {content.metadata.warnings.join(", ")}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}


