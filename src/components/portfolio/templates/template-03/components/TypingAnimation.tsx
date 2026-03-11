"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
    text: string;
    duration?: number;
    className?: string;
}

export default function TypingAnimation({
    text,
    duration = 200,
    className,
}: TypingAnimationProps) {
    const [displayedText, setDisplayedText] = useState<string>("");

    useEffect(() => {
        if (!text) return;
        setDisplayedText("");
        let index = 0;
        const typingEffect = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [duration, text]);

    return (
        <span
            className={cn(
                "font-display font-bold tracking-[-0.02em] inline-block",
                className,
            )}
        >
            {displayedText}
        </span>
    );
}
