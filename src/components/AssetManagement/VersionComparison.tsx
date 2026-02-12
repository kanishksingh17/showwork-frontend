import type { ResumeVersion } from '@/types/portfolio-management';

interface VersionComparisonProps {
    resumes: ResumeVersion[];
}

export const VersionComparison: React.FC<VersionComparisonProps> = ({ resumes }) => {
    // Get the two most recent versions for comparison
    const currentVersion = resumes.find(r => r.versionNumber === 'v2.4') || resumes[0];
    const baseVersion = resumes.find(r => r.versionNumber === 'v1.0') || resumes[1];

    if (!currentVersion || !baseVersion) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide flex items-center gap-2">
                    <svg className="w-[18px] h-[18px] text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Version Comparison
                </h3>
                <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-slate-500 dark:text-slate-400">Comparing:</span>
                    <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] rounded py-0.5 pl-1 pr-6 font-medium text-slate-700 dark:text-slate-300">
                        <option>{currentVersion.versionNumber} (Current)</option>
                    </select>
                    <span className="text-slate-500 dark:text-slate-400">with</span>
                    <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] rounded py-0.5 pl-1 pr-6 font-medium text-slate-700 dark:text-slate-300">
                        <option>{baseVersion.versionNumber} (Base)</option>
                    </select>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-8 relative">
                    {/* Divider */}
                    <div className="absolute inset-y-0 left-1/2 w-px bg-slate-200 dark:bg-slate-700"></div>

                    {/* Current Version */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Current ({currentVersion.versionNumber})</span>
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{currentVersion.atsScore}% Match</span>
                        </div>
                        <div className="space-y-3">
                            {/* Visual bars representing content */}
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded flex items-center px-2">
                                <div className="h-2 w-full bg-emerald-500/20 dark:bg-emerald-400/20 rounded"></div>
                            </div>
                            <div className="h-4 w-[85%] bg-slate-100 dark:bg-slate-900 rounded flex items-center px-2">
                                <div className="h-2 w-full bg-emerald-500/20 dark:bg-emerald-400/20 rounded"></div>
                            </div>
                            <div className="h-4 w-[90%] bg-indigo-100 dark:bg-indigo-900/30 rounded flex items-center px-2">
                                <div className="h-2 w-full bg-indigo-500/30 dark:bg-indigo-400/30 rounded"></div>
                            </div>
                        </div>
                        <p className="mt-4 text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                            Optimized for {currentVersion.targetJobCompany || 'target role'} with improved keyword matching.
                        </p>

                        {/* Improvements */}
                        {currentVersion.improvementPercent && (
                            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">+{currentVersion.improvementPercent}% Improvement</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Base Version */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Base ({baseVersion.versionNumber})</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{baseVersion.atsScore}% Match</span>
                        </div>
                        <div className="space-y-3 opacity-40">
                            {/* Visual bars representing content */}
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded flex items-center px-2">
                                <div className="h-2 w-[65%] bg-slate-400 dark:bg-slate-600 rounded"></div>
                            </div>
                            <div className="h-4 w-[70%] bg-slate-100 dark:bg-slate-900 rounded flex items-center px-2">
                                <div className="h-2 w-[60%] bg-slate-400 dark:bg-slate-600 rounded"></div>
                            </div>
                            <div className="h-4 w-[50%] bg-slate-100 dark:bg-slate-900 rounded flex items-center px-2">
                                <div className="h-2 w-[40%] bg-slate-400 dark:bg-slate-600 rounded"></div>
                            </div>
                        </div>
                        <p className="mt-4 text-[10px] text-slate-500 dark:text-slate-400 leading-tight italic">
                            {baseVersion.isGeneric ? 'Generic resume template before AI-assisted tailoring.' : 'Original version before optimization.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
