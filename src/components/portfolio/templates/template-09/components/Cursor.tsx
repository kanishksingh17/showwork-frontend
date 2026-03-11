import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let reqId: number;
        let mouseX = -100;
        let mouseY = -100;
        let rx = -100;
        let ry = -100;

        const onMouseMove = (e: MouseEvent) => {
            const container = document.querySelector('.template-09') as HTMLElement;
            if (container) {
                const rect = container.getBoundingClientRect();
                // Check if mouse is inside container
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    setIsVisible(true);

                    // Compute accurate local CSS coordinates by reversing any parent scale transforms
                    const scaleX = rect.width / container.offsetWidth;
                    const scaleY = rect.height / container.offsetHeight;

                    mouseX = (e.clientX - rect.left) / scaleX;
                    mouseY = (e.clientY - rect.top) / scaleY;
                } else {
                    setIsVisible(false);
                }
            } else {
                setIsVisible(true);
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
            setPosition({ x: mouseX, y: mouseY });
        };

        const animateRing = () => {
            // Smooth follow for the ring
            rx += (mouseX - rx) * 0.12;
            ry += (mouseY - ry) * 0.12;
            setRingPos({ x: rx, y: ry });
            reqId = requestAnimationFrame(animateRing);
        };

        window.addEventListener('mousemove', onMouseMove);
        reqId = requestAnimationFrame(animateRing);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(reqId);
        };
    }, []);

    // Hide if mouse hasn't moved yet, or if it has left the container
    if (position.x === -100 || !isVisible) return null;

    return (
        <>
            <div
                className="cursor"
                style={{
                    transform: `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0)`
                }}
            />
            <div
                className="cursor-ring"
                style={{
                    transform: `translate3d(calc(${ringPos.x}px - 50%), calc(${ringPos.y}px - 50%), 0)`
                }}
            />
        </>
    );
};
