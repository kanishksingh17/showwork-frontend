import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Archive, AlertCircle, Briefcase, Trophy } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
    type?: 'portfolio' | 'application' | 'goal';
    className?: string;
}

export function StatusBadge({ status, type = 'portfolio', className = '' }: StatusBadgeProps) {
    const getStatusConfig = () => {
        if (type === 'portfolio') {
            switch (status) {
                case 'active':
                    return { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, label: 'Active' };
                case 'draft':
                    return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, label: 'Draft' };
                case 'archived':
                    return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Archive, label: 'Archived' };
                default:
                    return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle, label: status };
            }
        } else if (type === 'application') {
            switch (status) {
                case 'preparing':
                    return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock, label: 'Preparing' };
                case 'applied':
                    return { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Briefcase, label: 'Applied' };
                case 'interview':
                    return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertCircle, label: 'Interview' };
                case 'offer':
                    return { color: 'bg-green-100 text-green-700 border-green-200', icon: Trophy, label: 'Offer' };
                case 'rejected':
                    return { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle, label: 'Rejected' };
                default:
                    return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle, label: status };
            }
        } else {
            // goal type
            return { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: CheckCircle, label: status };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <Badge className={`flex items-center gap-1 ${config.color} border ${className}`}>
            <Icon className="w-3 h-3" />
            <span className="text-xs font-medium">{config.label}</span>
        </Badge>
    );
}
