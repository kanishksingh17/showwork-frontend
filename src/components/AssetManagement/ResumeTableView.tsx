import { Edit, Copy, Sparkles } from 'lucide-react';
import type { ResumeVersion } from '@/types/portfolio-management';

interface ResumeTableViewProps {
    resumes: ResumeVersion[];
    onAnalyze?: (resume: ResumeVersion) => void;
}

export const ResumeTableView: React.FC<ResumeTableViewProps> = ({ resumes, onAnalyze }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Asset Details</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Indicator</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">ATS Score</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Critical Gaps</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:border-slate-400 uppercase tracking-widest">Version</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {resumes.map(resume => (
                            <tr key={resume.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{resume.title}</h4>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Edited 2h ago • Resume</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {resume.isGeneric ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-tighter">
                                            Generic
                                        </span>
                                    ) : resume.targetJobCompany ? (
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                                            <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                                            {resume.targetJobCompany}
                                        </span>
                                    ) : null}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 relative flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                <circle cx="18" cy="18" fill="none" r="16" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeWidth="3"></circle>
                                                <circle
                                                    cx="18" cy="18" fill="none" r="16"
                                                    stroke="currentColor"
                                                    className={resume.atsScore && resume.atsScore >= 80 ? "text-emerald-500" : resume.atsScore && resume.atsScore >= 70 ? "text-blue-500" : "text-amber-500"}
                                                    strokeDasharray={`${resume.atsScore || 0}, 100`}
                                                    strokeLinecap="round"
                                                    strokeWidth="3"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-[10px] font-bold text-slate-900 dark:text-slate-100">{resume.atsScore || 0}%</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">
                                                {resume.atsScore && resume.atsScore >= 85 ? 'Elite Match' : resume.atsScore && resume.atsScore >= 75 ? 'High Fit' : 'Base Match'}
                                            </span>
                                            <span className="text-[9px] text-slate-500 dark:text-slate-400">Target: {resume.targetRole}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {resume.criticalGaps?.map((gap, idx) => (
                                            <span key={idx} className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                {gap}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{resume.versionNumber || 'v1.0'}</span>
                                        {resume.improvementPercent && (
                                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded">
                                                +{resume.improvementPercent}%
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm" title="Quick Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm" title="Duplicate for Job">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" title="Smart Tailor">
                                            <Sparkles className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onAnalyze?.(resume)}
                                            className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm text-[10px] font-semibold"
                                            title="Analyze Resume"
                                        >
                                            Analyze
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
