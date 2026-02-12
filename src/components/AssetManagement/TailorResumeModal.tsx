import React, { useState } from 'react';
import { X, Briefcase, FileText, Sparkles, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResumeVersion, TailoringSuggestion } from '@/types/portfolio-management';
import type { Application } from '@/components/ApplicationTrackerBoard';

interface TailorResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    resume: ResumeVersion;
    applications?: Application[];
    onTailoringComplete?: (newResume: ResumeVersion) => void;
}

type JobSource = 'tracker' | 'paste';

export const TailorResumeModal: React.FC<TailorResumeModalProps> = ({
    isOpen,
    onClose,
    resume,
    applications = [],
    onTailoringComplete
}) => {
    const [step, setStep] = useState(1);
    const [jobSource, setJobSource] = useState<JobSource>('tracker');
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [pastedJob, setPastedJob] = useState({ company: '', role: '', description: '' });
    const [suggestions, setSuggestions] = useState<TailoringSuggestion[]>([]);
    const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
    const [projectedScore, setProjectedScore] = useState(0);

    if (!isOpen) return null;

    const handleClose = () => {
        setStep(1);
        setJobSource('tracker');
        setSelectedApplication(null);
        setPastedJob({ company: '', role: '', description: '' });
        setSuggestions([]);
        setMissingKeywords([]);
        setProjectedScore(0);
        onClose();
    };

    const handleNext = () => {
        if (step === 1) {
            // Generate AI suggestions based on selected job
            const targetJob = jobSource === 'tracker' ? selectedApplication : pastedJob;
            if (targetJob) {
                generateSuggestions(targetJob);
            }
        }
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const generateSuggestions = (job: Application | { company: string; role: string; description: string }) => {
        const role = 'role' in job ? job.role : '';
        const company = job.company;

        // Mock AI-generated suggestions (in production, this would be an API call)
        const mockKeywords = ['React', 'TypeScript', 'System Design', 'Agile', 'Leadership', 'REST APIs'];
        const mockSuggestions: TailoringSuggestion[] = [
            {
                type: 'keyword',
                category: 'Technical Skills',
                suggestedText: 'React, TypeScript, Next.js, Node.js',
                reason: `${company} emphasizes these technologies in their job description`,
                priority: 'high'
            },
            {
                type: 'section',
                category: 'Experience',
                currentText: 'Led team of developers',
                suggestedText: 'Led cross-functional team of 5+ developers using Agile methodologies',
                reason: 'Quantify achievements and highlight Agile experience',
                priority: 'high'
            },
            {
                type: 'skill',
                category: 'Soft Skills',
                suggestedText: 'System Design, Technical Leadership, Stakeholder Management',
                reason: `${role} role requires strong system design and leadership skills`,
                priority: 'medium'
            },
            {
                type: 'keyword',
                category: 'Domain Knowledge',
                suggestedText: 'CI/CD, Docker, Kubernetes, AWS',
                reason: 'Modern tech stack mentioned in job requirements',
                priority: 'medium'
            }
        ];

        setSuggestions(mockSuggestions);
        setMissingKeywords(mockKeywords);
        setProjectedScore(Math.min((resume.atsScore || 70) + 15, 98));
    };

    const handleGenerateTailoredResume = () => {
        const targetJob = jobSource === 'tracker' ? selectedApplication : pastedJob;
        const newResume: ResumeVersion = {
            ...resume,
            id: `resume-${Date.now()}`,
            title: `${resume.title} - ${targetJob?.company || 'Tailored'}`,
            targetJobCompany: targetJob?.company,
            targetRole: jobSource === 'tracker' && selectedApplication ? selectedApplication.role : pastedJob.role,
            linkedApplicationId: jobSource === 'tracker' && selectedApplication ? selectedApplication.id : undefined,
            atsScore: projectedScore,
            criticalGaps: [],
            versionNumber: `v${parseInt(resume.versionNumber?.replace('v', '') || '1') + 1}`,
            improvementPercent: projectedScore - (resume.atsScore || 70),
            updatedAt: new Date(),
            createdAt: new Date(),
            isCurrent: false
        };

        onTailoringComplete?.(newResume);
        handleClose();
    };

    const canProceedStep1 = jobSource === 'tracker' ? selectedApplication !== null :
        (pastedJob.company && pastedJob.role && pastedJob.description);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleClose}>
            <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Tailor Resume</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{resume.title}</p>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        {['Select Job', 'AI Analysis', 'Generate'].map((label, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > idx + 1 ? 'bg-emerald-500 text-white' :
                                    step === idx + 1 ? 'bg-blue-600 text-white' :
                                        'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                    {step > idx + 1 ? '✓' : idx + 1}
                                </div>
                                <span className={`text-[10px] mt-1 font-medium ${step === idx + 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Step 1: Select Job */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Select target job</h3>

                            {/* Tabs */}
                            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => setJobSource('tracker')}
                                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${jobSource === 'tracker'
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    From Application Tracker
                                    {jobSource === 'tracker' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
                                </button>
                                <button
                                    onClick={() => setJobSource('paste')}
                                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${jobSource === 'paste'
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Paste Job Description
                                    {jobSource === 'paste' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
                                </button>
                            </div>

                            {/* From Tracker */}
                            {jobSource === 'tracker' && (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {applications.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-sm">No applications in tracker</p>
                                            <p className="text-xs mt-1">Try pasting a job description instead</p>
                                        </div>
                                    ) : (
                                        applications.map((app) => (
                                            <button
                                                key={app.id}
                                                onClick={() => setSelectedApplication(app)}
                                                className={`w-full p-3 rounded-lg border-2 transition-all text-left hover:border-blue-300 dark:hover:border-blue-700 ${selectedApplication?.id === app.id
                                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`h-10 w-10 rounded-lg ${app.logoBg} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                                                        {app.logo}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{app.company}</h4>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{app.role}</p>
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                                                                {app.status}
                                                            </span>
                                                            <span className="text-[10px] font-medium text-slate-500">Match: {app.matchScore}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Paste Description */}
                            {jobSource === 'paste' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Company Name</label>
                                        <input
                                            type="text"
                                            value={pastedJob.company}
                                            onChange={(e) => setPastedJob({ ...pastedJob, company: e.target.value })}
                                            placeholder="e.g. Google"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Role / Position</label>
                                        <input
                                            type="text"
                                            value={pastedJob.role}
                                            onChange={(e) => setPastedJob({ ...pastedJob, role: e.target.value })}
                                            placeholder="e.g. Senior Frontend Engineer"
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Job Description / URL</label>
                                        <textarea
                                            value={pastedJob.description}
                                            onChange={(e) => setPastedJob({ ...pastedJob, description: e.target.value })}
                                            placeholder="Paste the job description or URL here..."
                                            rows={6}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: AI Analysis */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">AI Analysis Results</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Based on the job requirements, here's how to optimize your resume
                                </p>
                            </div>

                            {/* Score Projection */}
                            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">ATS Score Projection</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{resume.atsScore}</span>
                                            <ArrowRight className="w-4 h-4 text-blue-600" />
                                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{projectedScore}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="w-5 h-5" />
                                        <span className="text-lg font-bold">+{projectedScore - (resume.atsScore || 70)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Missing Keywords */}
                            {missingKeywords.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Missing Keywords</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {missingKeywords.map((keyword, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggestions */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Recommendations</h4>
                                <div className="space-y-2">
                                    {suggestions.map((suggestion, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-lg border ${suggestion.priority === 'high'
                                                ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'
                                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className={`mt-0.5 ${suggestion.priority === 'high' ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'
                                                    }`}>
                                                    <Sparkles className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{suggestion.category}</span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${suggestion.priority === 'high'
                                                            ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                                                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                            }`}>
                                                            {suggestion.priority}
                                                        </span>
                                                    </div>
                                                    {suggestion.currentText && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                                            Current: <span className="line-through">{suggestion.currentText}</span>
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-slate-900 dark:text-slate-100 font-medium mb-1">
                                                        Suggested: {suggestion.suggestedText}
                                                    </p>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">{suggestion.reason}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Generate */}
                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Ready to Generate!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
                                Your tailored resume will be optimized for {jobSource === 'tracker' && selectedApplication
                                    ? `${selectedApplication.company} - ${selectedApplication.role}`
                                    : `${pastedJob.company} - ${pastedJob.role}`} with an estimated ATS score of {projectedScore}.
                            </p>

                            <div className="w-full max-w-sm space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <div className="text-left">
                                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100">Optimized Keywords</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{missingKeywords.length} keywords added</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <div className="text-left">
                                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100">Enhanced Sections</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{suggestions.length} improvements applied</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <div className="text-left">
                                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100">Linked to Application</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Easy tracking and management</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={step === 1 ? handleClose : handleBack}
                        className="text-slate-600 dark:text-slate-400"
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                        size="sm"
                        onClick={step === 3 ? handleGenerateTailoredResume : handleNext}
                        disabled={step === 1 && !canProceedStep1}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {step === 3 ? 'Generate Tailored Resume' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
