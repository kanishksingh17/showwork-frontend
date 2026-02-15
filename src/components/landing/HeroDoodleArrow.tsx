import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroDoodleArrowProps {
    targetRef: React.RefObject<HTMLElement>;
    containerRef: React.RefObject<HTMLElement>;
}

const HeroDoodleArrow: React.FC<HeroDoodleArrowProps> = ({ targetRef, containerRef }) => {
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [targetInfo, setTargetInfo] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    // We no longer memoize target coords on resize because the layout might shift (e.g. sidebar)
    // causing the button to move relative to the container without a window resize.
    // Instead, we calculate both container and target rects on every mouse move.
    // This is slightly more expensive but ensures accuracy during layout transitions.

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !targetRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();

            // Calculate target center relative to container
            const newTargetInfo = {
                x: targetRect.left - containerRect.left + targetRect.width / 2,
                y: targetRect.top - containerRect.top + targetRect.height / 2,
                w: targetRect.width,
                h: targetRect.height
            };

            setTargetInfo(newTargetInfo);

            // Convert mouse viewport coords to container coords
            const relX = e.clientX - containerRect.left;
            const relY = e.clientY - containerRect.top;

            setMousePos({ x: relX, y: relY });

            // Check visibility
            // 1. Is mouse inside the container?
            const isInsideContainer =
                e.clientX >= containerRect.left &&
                e.clientX <= containerRect.right &&
                e.clientY >= containerRect.top &&
                e.clientY <= containerRect.bottom;

            // 2. Is near the target?
            const dist = Math.hypot(relX - newTargetInfo.x, relY - newTargetInfo.y);

            // 3. Is generally above the button (y check)
            const isAboveLowerLimit = relY < newTargetInfo.y + 150;

            setIsHovering(isInsideContainer && dist < 800 && dist > 50 && isAboveLowerLimit);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [targetRef, containerRef]);

    if (!mousePos || !targetInfo || !isHovering) return null;

    // Calculate dynamic target point on the button's boundary
    // Angle from center to mouse
    const angleToMouse = Math.atan2(mousePos.y - targetInfo.y, mousePos.x - targetInfo.x);

    // Ellipse approximation for pill shape
    // We want the arrow to stop AT the boundary, not inside.
    const pad = 25; // Padding: how far from the exact visual edge to stop
    const a = targetInfo.w / 2 + pad;
    const b = targetInfo.h / 2 + pad;

    // Radius at this angle
    const r = (a * b) / Math.sqrt(Math.pow(b * Math.cos(angleToMouse), 2) + Math.pow(a * Math.sin(angleToMouse), 2));

    const endX = targetInfo.x + r * Math.cos(angleToMouse);
    const endY = targetInfo.y + r * Math.sin(angleToMouse);

    const startX = mousePos.x;
    const startY = mousePos.y;

    // Side-Aware Curve Geometry
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dist = Math.hypot(endX - startX, endY - startY);

    // Determine side: Left or Right relative to button center
    const isLeft = startX < targetInfo.x;

    let controlX = midX;
    // Always arc upwards relative to the midpoint
    let controlY = midY - Math.min(dist * 0.4, 150);

    if (dist < 200) {
        // Flatten arc if very close
        controlY = midY - dist * 0.2;
    }

    // Side-specific pull
    const sidePull = Math.min(dist * 0.3, 120);
    if (isLeft) {
        controlX -= sidePull;
    } else {
        controlX += sidePull;
    }

    const pathD = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

    const arrowAngle = Math.atan2(endY - controlY, endX - controlX) * (180 / Math.PI);

    // Dynamic usage based on side
    const arrowColor = isLeft ? "#EF4444" : "#3B82F6"; // Red-500 vs Blue-500 (Light Blue)
    const arrowText = isLeft ? "Wrong path! ⛔" : "Choose ShowWork! ✨";

    return (
        <div className="absolute inset-0 pointer-events-none z-[20] overflow-visible">
            <svg width="100%" height="100%" className="overflow-visible">
                <defs>
                    <filter id="doodle-filter-inner">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                    </filter>
                </defs>

                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={arrowColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#doodle-filter-inner)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                />

                <motion.g
                    transform={`translate(${endX}, ${endY}) rotate(${arrowAngle})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                >
                    <path d="M -15,-8 L 0,0 L -15,8" fill="none" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#doodle-filter-inner)" />
                </motion.g>

                <motion.text
                    x={midX + (controlX - midX) * 0.75}
                    y={midY + (controlY - midY) * 0.75}
                    fill={arrowColor}
                    fontSize="16"
                    fontFamily="Coming Soon, cursive, sans-serif"
                    fontWeight="bold"
                    textAnchor="middle"
                    filter="url(#doodle-filter-inner)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {arrowText}
                </motion.text>
            </svg>
        </div>
    );
};

export default HeroDoodleArrow;
