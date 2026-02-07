"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SocialPostPreviewProps {
    post: any;
    platform: string;
    isVisible: boolean;
    onClose: () => void;
    position?: { x: number; y: number };
}

export function SocialPostPreview({
    post,
    platform,
    isVisible,
    onClose,
    position,
}: SocialPostPreviewProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Calculate position to keep it on screen
    const style: React.CSSProperties = position
        ? {
            position: "fixed",
            left: Math.min(window.innerWidth - 320, Math.max(20, position.x - 150)),
            top: Math.min(window.innerHeight - 400, Math.max(20, position.y + 20)),
            zIndex: 50,
        }
        : {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
        };

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={style}
                    className="w-[300px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                    onMouseLeave={onClose}
                >
                    {/* Header */}
                    <div className="p-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                {platform[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900">
                                    {post.projectName || "Project Update"}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    via {platform}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={onClose}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                            {post.content || "Check out my latest project update! #coding #developer"}
                        </p>

                        {post.imageUrl && (
                            <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
                                <img
                                    src={post.imageUrl}
                                    alt="Post content"
                                    className="w-full h-32 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-xs">Like</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-xs">Comment</span>
                            </button>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
