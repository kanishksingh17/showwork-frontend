import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bell } from 'lucide-react';
import { Button } from './button';

interface ComingSoonOverlayProps {
  title: string;
  description: string;
  imagePath: string;
  children?: React.ReactNode;
}

const PageSkeleton = () => (
  <div className="w-full h-full p-8 flex flex-col gap-8 opacity-20">
    <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 h-16 w-full rounded-2xl animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
    </div>
    <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-[2rem] animate-pulse" />
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
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-6 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl w-full bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col md:flex-row"
        >
          {/* Visual Side */}
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
            <img 
              src={imagePath} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-px bg-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Next Phase</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-900/30 mb-6 w-fit">
              <Sparkles className="w-3 h-3" /> Coming Soon
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
              We're building something <span className="text-blue-600">extraordinary.</span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {description} We are currently fine-tuning this feature to ensure you have the best experience possible for the official launch.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button className="w-full sm:w-auto rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 group font-bold">
                Notify Me <Bell className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto rounded-full px-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-bold"
              >
                Go Back <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-gray-200 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                   </div>
                 ))}
               </div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                 420+ developers waiting
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
