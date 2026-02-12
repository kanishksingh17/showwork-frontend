import React, { useState } from 'react';
import { X, FileText, Briefcase, Upload, Linkedin, Layout, Copy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewAssetModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultAssetType?: 'resume' | 'portfolio' | 'coverLetter' | 'other';
    onAssetCreated?: (asset: any) => void;
}

type AssetType = 'resume' | 'portfolio';
type SourceType = 'upload' | 'linkedin' | 'template' | 'duplicate';

export const NewAssetModal: React.FC<NewAssetModalProps> = ({
    isOpen,
    onClose,
    defaultAssetType = 'resume',
    onAssetCreated
}) => {
    const [step, setStep] = useState(1);
    const [assetType, setAssetType] = useState<AssetType>(defaultAssetType);
    const [sourceType, setSourceType] = useState<SourceType>('upload');
    const [targetRole, setTargetRole] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    if (!isOpen) return null;

    const handleClose = () => {
        setStep(1);
        setAssetType(defaultAssetType);
        setSourceType('upload');
        setTargetRole('');
        setFile(null);
        onClose();
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCreate = () => {
        // Process and create asset
        const newAsset = {
            type: assetType,
            source: sourceType,
            targetRole,
            file,
            template: selectedTemplate
        };

        onAssetCreated?.(newAsset);
        handleClose();
    };

    const assetTypes = [
        { value: 'resume', label: 'Resume', icon: FileText, description: 'Optimized for ATS and recruiters' },
        { value: 'portfolio', label: 'Portfolio', icon: Briefcase, description: 'Showcase your work and projects' }
    ];

    const resumeSourceTypes = [
        { value: 'upload', label: 'Upload Existing', icon: Upload, description: 'PDF or DOCX file' },
        { value: 'linkedin', label: 'Import from LinkedIn', icon: Linkedin, description: 'Auto-fill from profile' },
        { value: 'template', label: 'Create from Template', icon: Layout, description: 'Start with a proven format' },
        { value: 'duplicate', label: 'Duplicate Existing', icon: Copy, description: 'Copy and modify' }
    ];

    const portfolioSourceTypes = [
        { value: 'template', label: 'Choose Template', icon: Layout, description: 'Modern Dark, Creative Minimal, etc.' },
        { value: 'upload', label: 'Import Projects', icon: Upload, description: 'Add your work samples' },
        { value: 'duplicate', label: 'Duplicate Existing', icon: Copy, description: 'Copy and modify' }
    ];

    const targetRoles = ['Frontend Engineer', 'Product Designer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer'];

    const sourceTypes = assetType === 'portfolio' ? portfolioSourceTypes : resumeSourceTypes;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleClose}>
            <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Create New Asset</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Step {step} of 4</p>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        {['Asset Type', 'Source', 'Target Role', 'Process'].map((label, idx) => (
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
                <div className="p-6 min-h-[320px]">
                    {/* Step 1: Asset Type */}
                    {step === 1 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">What type of asset do you want to create?</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {assetTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={type.value}
                                            onClick={() => setAssetType(type.value as AssetType)}
                                            className={`p-4 rounded-lg border-2 transition-all text-left hover:border-blue-300 dark:hover:border-blue-700 ${assetType === type.value
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                                }`}
                                        >
                                            <Icon className={`w-6 h-6 mb-2 ${assetType === type.value ? 'text-blue-600' : 'text-slate-400'}`} />
                                            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{type.label}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{type.description}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Source Type */}
                    {step === 2 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">How do you want to create it?</h3>
                            <div className="space-y-2">
                                {sourceTypes.map((source) => {
                                    const Icon = source.icon;
                                    return (
                                        <button
                                            key={source.value}
                                            onClick={() => setSourceType(source.value as SourceType)}
                                            className={`w-full p-3 rounded-lg border-2 transition-all text-left flex items-start gap-3 hover:border-blue-300 dark:hover:border-blue-700 ${sourceType === source.value
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 mt-0.5 ${sourceType === source.value ? 'text-blue-600' : 'text-slate-400'}`} />
                                            <div className="flex-1">
                                                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{source.label}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{source.description}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {sourceType === 'upload' && (
                                <div className="mt-4 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900/30">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="w-full text-sm text-slate-600 dark:text-slate-400"
                                    />
                                    {file && (
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">✓ {file.name}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Target Role */}
                    {step === 3 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Which role is this asset for?</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Target Role</label>
                                    <select
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a role...</option>
                                        {targetRoles.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                {targetRole && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">Role Compatibility Preview</p>
                                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                                    Your asset will be optimized for {targetRole} positions with relevant keywords and skills.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Processing */}
                    {step === 4 && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Ready to Create!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-md">
                                We'll analyze your {assetType}, calculate ATS score, identify skill gaps, and match it to {targetRole || 'your target role'}.
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-sm text-xs">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    ATS Score Analysis
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    Skill Gap Detection
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    Keyword Matching
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    Format Check
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between bg-slate-50 dark:bg-slate-900/50">
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
                        onClick={step === 4 ? handleCreate : handleNext}
                        disabled={
                            (step === 2 && sourceType === 'upload' && !file) ||
                            (step === 3 && !targetRole)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {step === 4 ? 'Create Asset' : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
