import React, { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number; // milliseconds per word
  className?: string;
  onComplete?: () => void;
  isTyping?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  className = "",
  onComplete,
  isTyping = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    if (!isTyping || !text) {
      setDisplayedText(text);
      return;
    }

    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        const newText = words.slice(0, currentWordIndex + 1).join(" ");
        setDisplayedText(newText);
        setCurrentWordIndex(currentWordIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentWordIndex === words.length && onComplete) {
      onComplete();
    }
  }, [currentWordIndex, isTyping, text, words, speed, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentWordIndex(0);
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && currentWordIndex < words.length && (
        <span className="animate-pulse text-blue-500">|</span>
      )}
    </span>
  );
};


