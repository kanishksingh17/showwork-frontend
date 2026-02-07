import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Settings } from "lucide-react";

interface IntegrationStatus {
  platform: string;
  connected: boolean;
  expired: boolean;
  connectedAt: string | null;
  expiresAt: string | null;
}

interface IntegrationCardProps {
  platform: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  };
  status: IntegrationStatus | null;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onTest: () => void;
  isConnecting?: boolean;
}

export function IntegrationCard({
  platform,
  status,
  isLoading,
  onConnect,
  onDisconnect,
  onTest,
  isConnecting = false,
}: IntegrationCardProps) {
  const isConnected = status?.connected || false;
  const isExpired = status?.expired || false;

  const getStatusBadge = () => {
    if (isLoading) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Loading...
        </Badge>
      );
    }
    if (isConnected) {
      return (
        <Badge className="bg-green-500 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Connected
        </Badge>
      );
    }
    if (isExpired) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Expired
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <XCircle className="w-3 h-3" />
        Disconnected
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <div style={{ color: platform.color }}>{platform.icon}</div>
            </div>
            <div>
              <h3 className="font-semibold">{platform.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {platform.description}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {platform.description}
        </p>

        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onTest}
                className="flex-1"
              >
                Test Connection
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDisconnect}
                className="flex-1"
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                console.log("🔘 Connect button clicked for:", platform.id);
                onConnect();
              }}
              className="flex-1"
              style={{ backgroundColor: platform.color }}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>

        {status?.connectedAt && (
          <p className="text-xs text-gray-500 mt-3">
            Connected: {new Date(status.connectedAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

