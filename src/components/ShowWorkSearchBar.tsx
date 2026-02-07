"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ShowWorkSearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export function ShowWorkSearchBar({
    value,
    onChange,
    placeholder = "Search...",
    className,
}: ShowWorkSearchBarProps) {
    return (
        <div className={cn("relative w-full max-w-sm", className)}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold">
                    S
                </div>
            </div>
            <Input
                type="text"
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl"
                placeholder={placeholder}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
            </div>
        </div>
    );
}
