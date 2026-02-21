import React, { useEffect, useState } from 'react';

interface PreloaderProps {
    /** Called when the preloader finishes and should be removed */
    onComplete?: () => void;
    /** Duration in ms before starting the fade-out (default: 1500) */
    delay?: number;
}

/**
 * Full-screen preloader that matches the portfolio-main reference.
 * Shows a purple pulsing logo, then fades out after `delay` ms.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete, delay = 1500 }) => {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, delay);

        const removeTimer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, delay + 600); // 600ms for the fade transition

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [delay, onComplete]);

    if (!visible) return null;

    return (
        <div
            id="preloader"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 999999,
                backgroundColor: '#0c0513',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity,
                transition: 'opacity 0.6s ease-out',
                pointerEvents: opacity === 0 ? 'none' : 'all',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                {/* Animated logo/spinner */}
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        border: '4px solid transparent',
                        borderTopColor: '#7500fa',
                        borderRightColor: '#a855f7',
                        animation: 'preloader-spin 1s linear infinite',
                        margin: '0 auto 20px',
                    }}
                />
                <div
                    style={{
                        color: '#7500fa',
                        fontSize: '1.2rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        animation: 'preloader-pulse 1.5s ease-in-out infinite',
                    }}
                >
                    Loading...
                </div>
            </div>

            {/* Inline keyframes */}
            <style>{`
                @keyframes preloader-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes preloader-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
};
