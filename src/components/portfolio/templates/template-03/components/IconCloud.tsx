"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Cloud,
    fetchSimpleIcons,
    renderSimpleIcon,
    type ICloud,
    type SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 0,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 1.2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.03,
        minSpeed: 0.01,
    },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 42,
        aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
        },
    });
};

export type DynamicCloudProps = {
    iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null);
    // Simple theme detection for vanilla CSS/Tailwind project
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);

        // Initial check
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        // Observer for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) => {
            const activeTheme = isDarkMode ? 'dark' : 'light';
            return (
                <a key={`${icon.slug}-${activeTheme}`} onClick={(e) => e.preventDefault()}>
                    {renderCustomIcon(icon, activeTheme)}
                </a>
            );
        });
    }, [data, isDarkMode]);

    return (
        // @ts-ignore
        <Cloud {...cloudProps}>
            <>{renderedIcons}</>
        </Cloud>
    );
}
