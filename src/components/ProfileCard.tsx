import React, { useRef, useEffect, useState } from "react";
import { LogOut, Copy, Plus, X, Globe, MapPin, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
    isOpen: boolean;
    onClose: () => void;
    userProfile: {
        name?: string;
        email?: string;
        avatar?: string;
        username?: string;
        bio?: string;
        [key: string]: any;
    } | null;
    onLogout: () => void;
    onProfileUpdate: (updatedProfile: any) => void;
    onNavigateToProfile?: () => void;
}

export function ProfileCard({
    isOpen,
    onClose,
    userProfile,
    onLogout,
    onNavigateToProfile,
}: ProfileCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Only close if clicking outside the card AND outside the trigger button (avatar) in dashboard
            // Note: The structure in Dashboard.tsx wraps both button and ProfileCard in a relative div.
            // But if the click is on the document body, we should close.
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleCopyEmail = () => {
        if (userProfile?.email) {
            navigator.clipboard.writeText(userProfile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isOpen || !userProfile) return null;

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="absolute top-16 right-0 z-[100] w-full max-w-[340px] min-w-[300px]" ref={cardRef}>
            <Card className="bg-[#1a1a1a] border-none text-white shadow-2xl overflow-hidden rounded-3xl animate-in fade-in zoom-in-95 duration-200">
                {/* Header Status Bar */}
                <div className="flex justify-between items-center px-5 pt-5 pb-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-gray-400 text-xs font-medium">Available for work</span>
                    </div>
                    {/* Logout in Header for space */}
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs font-medium">{formattedTime}</span>
                        <button onClick={onLogout} className="text-gray-500 hover:text-red-400 transition-colors" title="Sign Out">
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                <CardContent className="flex flex-col items-center pt-2 pb-5 px-5">
                    {/* Profile Image & Info Row */}
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <Avatar className="h-20 w-20 border-3 border-[#252525] shadow-lg">
                            <AvatarImage src={userProfile.avatar} alt={userProfile.name} className="object-cover" />
                            <AvatarFallback className="text-2xl bg-blue-600 text-white font-bold">
                                {(userProfile.name || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white">{userProfile.name || "Developer"}</h2>
                            <p className="text-gray-400 text-xs">{userProfile.bio || "UI/UX Designer & Developer"}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full mb-2">
                        <Button
                            className="flex-1 bg-[#252525] hover:bg-[#333] text-white h-10 text-xs rounded-xl border-none"
                            onClick={() => window.location.href = `mailto:${userProfile.email}`}
                        >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            Hire Me
                        </Button>
                        <Button
                            className="flex-1 bg-[#252525] hover:bg-[#333] text-white h-10 text-xs rounded-xl border-none"
                            onClick={handleCopyEmail}
                        >
                            {copied ? (
                                <span className="text-green-400 font-bold">Copied!</span>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                                    Copy Email
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>

                {/* Footer Bar - View Full Profile */}
                <div
                    className="bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer py-3 px-6 flex justify-between items-center group relative overflow-hidden"
                    onClick={() => {
                        if (onNavigateToProfile) {
                            onNavigateToProfile();
                        }
                        onClose();
                    }}
                >
                    <div className="flex items-center gap-2 text-white font-semibold text-sm relative z-10">
                        <span className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors"><User className="w-3 h-3 text-white" /></span>
                        View Full Profile
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />

                    {/* Gradient overlay for interaction */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                </div>
            </Card>
        </div>
    );
}
