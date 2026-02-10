import React from "react";

interface MiniBarChartProps {
  data: { label: string; value: number; date?: string }[]; // Added date optional prop
  height?: number;
  activeIndex?: number; // Optional: fix a specific bar as active/highlighted
  barColor?: string; // Base color for gradient
}

export const MiniBarChart: React.FC<MiniBarChartProps> = ({
  data,
  height = 200,
  activeIndex,
}) => {
  // Find the max value to normalize heights
  const maxima = Math.max(...data.map((d) => d.value));
  const maxValue = maxima > 0 ? maxima : 1; // Avoid division by zero

  // If activeIndex is not provided, default to the one with the max value
  const highlightedIndex = activeIndex ?? data.findIndex((d) => d.value === maxima);

  // Blue gradient palette for bars
  const colorPalette = [
    { from: "#3B82F6", to: "#60A5FA" }, // Blue
    { from: "#2563EB", to: "#3B82F6" }, // Darker Blue
    { from: "#1D4ED8", to: "#2563EB" }, // Even Darker Blue
    { from: "#60A5FA", to: "#93C5FD" }, // Lighter Blue
    { from: "#1E40AF", to: "#3B82F6" }, // Deep Blue
    { from: "#3B82F6", to: "#60A5FA" }, // Blue (repeat)
    { from: "#2563EB", to: "#60A5FA" }, // Mid Blue
  ];

  return (
    <div
      className="flex items-end justify-between gap-1 w-full px-1 pt-4 pb-2"
      style={{ height: `${height}px` }}
    >
      {data.map((item, index) => {
        const isActive = index === highlightedIndex;
        // Calculate height percentage, min 10% so it's visible
        const heightPercent = Math.max((item.value / maxValue) * 100, 10);

        // Get color from palette (cycle through if more bars than colors)
        const color = colorPalette[index % colorPalette.length];

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
          >
            {/* Tooltip for active bar (or on hover for others) */}
            <div
              className={`absolute bottom-full mb-2 transition-all duration-300 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 z-50 pointer-events-none ${index === 0 ? "left-0 origin-bottom-left" : index === data.length - 1 ? "right-0 origin-bottom-right" : "left-1/2 -translate-x-1/2 origin-bottom"
                }`}
            >
              <div className={`bg-gray-800 dark:bg-gray-700 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap flex flex-col items-center ${index === 0 ? "items-start" : index === data.length - 1 ? "items-end" : "items-center"
                }`}>
                <span>{item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}K` : item.value}</span>
                {item.date && <span className="text-gray-300 text-[9px] mt-0.5">{item.date}</span>}
                {!item.date && item.label && <span className="text-gray-300 text-[9px] mt-0.5">{item.label}</span>}
              </div>
              {/* Tooltip arrow - hide for edge cases or adjust position */}
              <div className={`w-1.5 h-1.5 bg-gray-800 dark:bg-gray-700 rotate-45 -mt-1 ${index === 0 ? "ml-2" : index === data.length - 1 ? "ml-auto mr-2" : "mx-auto"
                }`}></div>
            </div>

            {/* The Bar - now with colorful gradients */}
            <div
              className={`w-full max-w-[30px] rounded-t-sm transition-all duration-500 ease-out ${isActive
                ? "shadow-lg scale-105"
                : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
              style={{
                height: `${heightPercent}%`,
                background: `linear-gradient(to top, ${color.from}, ${color.to})`,
                boxShadow: isActive ? `0 4px 12px ${color.from}40` : undefined,
              }}
            />

            {/* Label - visible on hover or if it's a main label */}
            {/* hidden by default to keep "mini" look clean, can be enabled if needed */}
          </div>
        );
      })}
    </div>
  );
};

