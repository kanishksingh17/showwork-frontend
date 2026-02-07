import React from "react";
import { cn } from "@/lib/utils";

interface IntegrationStatus {
  platform: string;
  connected: boolean;
  expired: boolean;
}

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatforms: string[];
  onToggle: (platform: string) => void;
  statuses: IntegrationStatus[];
}

// All platforms use square boxes with rounded corners
const borderRadius = "rounded-[5px]";

export function PlatformSelector({
  platforms,
  selectedPlatforms,
  onToggle,
  statuses,
}: PlatformSelectorProps) {
  const getStatusForPlatform = (platformId: string): IntegrationStatus | null => {
    return statuses.find((s) => s.platform.toLowerCase() === platformId.toLowerCase()) || null;
  };

  const isPlatformAvailable = (platformId: string): boolean => {
    const status = getStatusForPlatform(platformId);
    return (status?.connected && !status?.expired) || false;
  };

  const handleToggle = (platformId: string) => {
    if (isPlatformAvailable(platformId)) {
      onToggle(platformId);
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden box-border">
      <style>{`
        .platform-card-uiverse {
          width: 90px;
          height: 90px;
          outline: none;
          border: none;
          background: white;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          transition: all 0.2s ease-in-out;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .platform-card-uiverse:hover:not(.disabled) {
          transform: scale(1.1);
        }
        
        .platform-card-uiverse.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .platform-card-uiverse.disabled:hover {
          transform: none;
        }
        
        .platform-card-uiverse.selected {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .platform-icon-uiverse {
          transition: all 0.2s ease-in-out;
        }
        
        .status-badge-uiverse {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          z-index: 10;
        }
        
        .status-badge-uiverse.connected {
          background-color: #10b981;
        }
        
        .status-badge-uiverse.expired {
          background-color: #ef4444;
        }
        
        .status-badge-uiverse.disconnected {
          background-color: #9ca3af;
        }
      `}</style>
      
      <div className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-full box-border justify-items-center">
        {platforms.map((platform) => {
          const status = getStatusForPlatform(platform.id);
          const isAvailable = isPlatformAvailable(platform.id);
          const isSelected = selectedPlatforms.includes(platform.id);

          return (
            <div
              key={platform.id}
              className={cn(
                "platform-card-uiverse",
                borderRadius,
                isSelected && "selected",
                !isAvailable && "disabled"
              )}
              style={{
                backgroundColor: isSelected ? `${platform.color}15` : "white",
              }}
              onMouseEnter={(e) => {
                if (isAvailable) {
                  e.currentTarget.style.backgroundColor = platform.color;
                  const icon = e.currentTarget.querySelector('.platform-icon-uiverse') as HTMLElement;
                  if (icon) icon.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (isAvailable) {
                  e.currentTarget.style.backgroundColor = isSelected ? `${platform.color}15` : "white";
                  const icon = e.currentTarget.querySelector('.platform-icon-uiverse') as HTMLElement;
                  if (icon) icon.style.color = platform.color;
                }
              }}
              onClick={() => handleToggle(platform.id)}
            >
              {/* Status indicator */}
              <div
                className={cn(
                  "status-badge-uiverse",
                  isAvailable ? "connected" : status?.expired ? "expired" : "disconnected"
                )}
              />
              
              {/* Platform icon - centered */}
              <div
                className="platform-icon-uiverse flex items-center justify-center"
                style={{
                  color: platform.color,
                }}
              >
                {platform.icon}
              </div>
              
              {/* Platform name - shown when selected */}
              {isSelected && (
                <span
                  className="text-[10px] font-medium mt-1 absolute bottom-2"
                  style={{
                    color: platform.color,
                  }}
                >
                  {platform.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200 w-full max-w-full box-border">
          <p className="text-sm font-medium text-gray-900 text-center w-full max-w-full">
            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
}
