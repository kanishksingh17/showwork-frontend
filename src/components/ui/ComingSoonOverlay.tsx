import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bell } from 'lucide-react';
import { Button } from './button';

interface ComingSoonOverlayProps {
  title: string;
  description: string;
  imagePath: string;
}

const PageSkeleton = () => (
  <div className="w-full h-full flex opacity-30 dark:opacity-20 pointer-events-none select-none">
    {/* Sidebar Skeleton */}
    <div className="hidden md:flex w-64 border-r border-gray-200 dark:border-gray-800 flex-col py-6 px-4 gap-6 bg-white/50 dark:bg-slate-950/50">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-3 items-center">
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>
      ))}
    </div>

    {/* Main Area Skeleton */}
    <div className="flex-1 flex flex-col">
      {/* Header Skeleton */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 bg-white/50 dark:bg-slate-950/50">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="flex-1 p-8 flex flex-col gap-8 bg-gray-50/50 dark:bg-slate-900/50 overflow-hidden">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl animate-pulse flex flex-col p-5 justify-between">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          ))}
        </div>
        
        {/* Main Panels */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl animate-pulse p-6 flex flex-col gap-4">
             <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-md" />
             <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl mt-4" />
          </div>
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl animate-pulse p-6 flex flex-col gap-4">
             <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-2" />
             {[...Array(5)].map((_, i) => (
               <div key={i} className="flex gap-4 items-center">
                 <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                 <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  title,
  description,
  imagePath,
}) => {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Content (Blurred Skeleton) */}
      <div className="absolute inset-0 blur-2xl scale-105 pointer-events-none select-none overflow-hidden">
        <PageSkeleton />
      </div>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40 flex flex-col items-center justify-center p-6 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-2xl"
        >
          {/* Subtle Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/20 dark:border-slate-700/50 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Coming Soon</span>
          </div>

          {/* Context Image (Reduced size, floating) */}
          <div className="relative w-24 h-24 mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 rotate-3">
             <img src={imagePath} alt="" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-none italic">
            {title}
          </h2>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
            {description} We're currently building out this module to ensure a seamless launch experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button className="w-full sm:w-auto rounded-full px-10 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 group font-bold text-base transition-all hover:scale-105 active:scale-95">
              Notify Me <Bell className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto rounded-full px-8 h-14 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-bold"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-gray-200 overflow-hidden shadow-md">
                  <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" />
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Join the 420+ early access waitlist
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
