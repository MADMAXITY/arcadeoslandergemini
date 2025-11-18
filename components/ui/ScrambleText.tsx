"use client";

import { useEffect, useState } from "react";

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function ScrambleText({ 
  text, 
  className = "",
  duration = 2000,
  delay = 0
}: { 
  text: string; 
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      setIsAnimating(true);
      let startTime = Date.now();

      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < text.length * progress) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (progress >= 1) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 50);
    };

    timeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, duration, delay]);

  return <span className={className}>{displayText}</span>;
}
