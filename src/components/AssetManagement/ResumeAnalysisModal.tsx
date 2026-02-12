import React, { useState } from 'react';
import { X, CheckCircle, TrendingUp, Download, Edit, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResumeVersion } from '@/types/portfolio-management';
import type { Application } from '@/components/ApplicationTrackerBoard';
import { TailorResumeModal } from './TailorResumeModal';

interface ResumeAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    resume: ResumeVersion | null;
    applications?: Application[];
    onResumeCreated?: (resume: ResumeVersion) => void;
}

export const ResumeAnalysisModal: React.FC<ResumeAnalysisModalProps> = ({
    isOpen,
    onClose,
    resume,
    applications = [],
    onResumeCreated
}) => {
    const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);

    if (!isOpen || !resume) return null;

    const strongPoints = [
        'React, TypeScript keywords present',
        `${resume.targetRole} experience matches requirement`,
        'Well-formatted for ATS scanning'
    ];

    const matchLevel = resume.atsScore && resume.atsScore >= 80 ? 'High Match' :
        resume.atsScore && resume.atsScore >= 70 ? 'Good Match' : 'Needs Improvement';

    const handleTailorClick = () => {
        setIsTailorModalOpen(true);
    };

    const handleTailoringComplete = (newResume: ResumeVersion) => {
        onResumeCreated?.(newResume);
        setIsTailorModalOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
                <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Resume Analysis</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{resume.title}</p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        {/* ATS Score - Simplified */}
                        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-700">
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{resume.atsScore}</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">/ 100</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {matchLevel} for {resume.targetJobCompany || resume.targetRole}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${matchLevel === 'High Match' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                matchLevel === 'Good Match' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                }`}>
                                {matchLevel}
                            </div>
                        </div>

                        {/* What's Good */}
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">What's working</h3>
                            <ul className="space-y-1.5">
                                {strongPoints.map((point, idx) => (
                                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What to Add */}
                        {resume.criticalGaps && resume.criticalGaps.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Missing keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {resume.criticalGaps.map((gap, idx) => (
                                        <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                            {gap}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Version Info */}
                        {resume.improvementPercent && (
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span>
                                    +{resume.improvementPercent}% improvement since {resume.versionNumber ? `v${resume.versionNumber.replace('v', '')}` : 'last version'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Footer - Quick Actions */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-end items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                            <Download className="w-3.5 h-3.5 mr-1.5" />
                            Download
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                            <Edit className="w-3.5 h-3.5 mr-1.5" />
                            Edit
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleTailorClick}>
                            <Scissors className="w-3.5 h-3.5 mr-1.5" />
                            Tailor Resume
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tailor Resume Modal */}
            {isTailorModalOpen && (
                <TailorResumeModal
                    isOpen={isTailorModalOpen}
                    onClose={() => setIsTailorModalOpen(false)}
                    resume={resume}
                    applications={applications}
                    onTailoringComplete={handleTailoringComplete}
                />
            )}
        </>
    );
};
