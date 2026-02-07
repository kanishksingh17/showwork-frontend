import React from "react";

interface MiniBarChartProps {
  data?: number[];
  color?: string;
  height?: number;
  metricType?: "reach" | "engagement" | string;
}

export const MiniBarChart: React.FC<MiniBarChartProps> = ({
  data = [],
  color = "#2563EB",
  height = 44,
  metricType = "reach",
}) => {
  // Generate 8 bars with varying heights if no data provided
  // Heights based on the image: 65%, 45%, 85%, 35%, 60%, 45%, 75%, 85%
  const defaultHeights = [65, 45, 85, 35, 60, 45, 75, 85];
  
  // Use provided data or default heights
  const barHeights = data.length > 0 
    ? data.map((value) => Math.min(Math.max(value, 0), 100))
    : defaultHeights;

  // Convert color hex to RGB for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 37, g: 99, b: 235 }; // Default blue
  };

  const rgb = hexToRgb(color);
  
  // Create gradient colors (darker at bottom, lighter at top) - purple-blue theme
  // For purple-blue: more purple tones
  const gradientStart = `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 10)}, ${Math.min(255, rgb.b + 10)})`;
  const gradientEnd = `rgb(${Math.min(255, rgb.r + 30)}, ${Math.min(255, rgb.g + 20)}, ${Math.min(255, rgb.b + 30)})`;

  return (
    <div
      className="flex items-end justify-between gap-1 w-full"
      style={{ height: `${height}px` }}
    >
      {barHeights.map((heightPercent, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col justify-end relative"
          style={{ height: "100%" }}
        >
          {/* Translucent white segment showing full potential */}
          <div
            className="w-full rounded-t"
            style={{
              height: `${100 - heightPercent}%`,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(0.5px)",
              minHeight: heightPercent < 100 ? "1px" : "0",
            }}
          />
          
          {/* Solid purple-blue gradient segment */}
          <div
            className="w-full rounded"
            style={{
              height: `${heightPercent}%`,
              background: `linear-gradient(to top, ${gradientStart}, ${gradientEnd})`,
              minHeight: "2px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

