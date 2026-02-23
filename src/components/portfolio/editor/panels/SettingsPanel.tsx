import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateUserData, syncLinkedInProfile } from '@/store/portfolio/portfolioSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, RefreshCw, UploadCloud, FileText, Briefcase, GraduationCap, Rocket, Layout } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

export const SettingsPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const userData = usePortfolioSelector(state => state.portfolio.userData);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isEnhancingAI, setIsEnhancingAI] = useState(false);
    const [isUploadingResume, setIsUploadingResume] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSyncLinkedIn = async () => {
        setIsSyncing(true);
        try {
            await dispatch(syncLinkedInProfile()).unwrap();
            toast.success("LinkedIn profile synced successfully!");
        } catch (error) {
            toast.error("Failed to sync LinkedIn profile. Ensure it's connected in Integrations.");
        } finally {
            setIsSyncing(false);
        }
    };

    const handleEnhanceAI = async () => {
        setIsEnhancingAI(true);
        try {
            const { enhanceProfileAI } = await import('@/store/portfolio/portfolioSlice');
            await dispatch(enhanceProfileAI()).unwrap();
            toast.success("AI Branding generated successfully!");
        } catch (error) {
            toast.error("Failed to generate AI branding. Try again later.");
        } finally {
            setIsEnhancingAI(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        dispatch(updateUserData({ [key]: value }));
    };

    const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploadingResume(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
            const res = await fetch(`${apiBaseUrl}/api/resume/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error("Failed to parse resume");
            }

            toast.success("Resume parsed successfully! Projects, experience, and education updated.");

            // Re-sync basic info like name to show up in the form immediately
            const data = await res.json();
            if (data?.data?.name || data?.data?.summary) {
                dispatch(updateUserData({
                    name: data.data.name || userData.name,
                    bio: data.data.summary || userData.bio,
                    experience: data.data.positions || userData.experience || [],
                    education: data.data.educations || userData.education || [],
                }));
            }

        } catch (error) {
            toast.error("Failed to parse resume. Make sure it's a valid PDF.");
        } finally {
            setIsUploadingResume(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-1">Portfolio Settings</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your personal information and portfolio metadata.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">Import from LinkedIn</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                                Pull your name, professional headline, and summary directly into your portfolio.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 h-8 text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
                                onClick={handleSyncLinkedIn}
                                disabled={isSyncing}
                            >
                                {isSyncing ? (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                        Syncing...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2" />
                                        Sync Now
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-600 rounded-lg text-white">
                            <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Magic Resume Import</h4>
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                                Upload your PDF resume to instantly extract projects, experience, education, and skills.
                            </p>
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleResumeUpload}
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 h-8 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-600"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploadingResume}
                            >
                                {isUploadingResume ? (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                        Extracting...
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="w-3 h-3 mr-2" />
                                        Upload PDF
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-600 rounded-lg text-white">
                            <Rocket className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300">Magic AI Branding</h4>
                            <p className="text-xs text-purple-700 dark:text-purple-400 mt-0.5">
                                Let AI analyze your projects and profile to generate a professional headline and curated bio.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 h-8 text-xs bg-white hover:bg-purple-50 border-purple-200 text-purple-600"
                                onClick={handleEnhanceAI}
                                disabled={isEnhancingAI}
                            >
                                {isEnhancingAI ? (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Rocket className="w-3 h-3 mr-2" />
                                        Enhance with AI
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                        id="title"
                        value={userData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Full Stack Developer"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Brief description about yourself..."
                        rows={3}
                    />
                </div>

                <div className="pt-4 border-t space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center">
                            <Layout className="w-3 h-3 text-indigo-600" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Professional Branding (AI)</h4>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="professionalHeadline">Professional Headline</Label>
                        <Input
                            id="professionalHeadline"
                            value={userData.professionalHeadline || ''}
                            onChange={(e) => handleChange('professionalHeadline', e.target.value)}
                            placeholder="e.g. Senior Full-Stack Engineer specializing in AI & Scalable Systems"
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                        />
                        <p className="text-[10px] text-gray-400 italic">This is used as the primary title in modern templates.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="professionalBio">Professional Bio</Label>
                        <Textarea
                            id="professionalBio"
                            value={userData.professionalBio || ''}
                            onChange={(e) => handleChange('professionalBio', e.target.value)}
                            placeholder="A curated, professional biography..."
                            rows={5}
                            className="border-indigo-100 focus-visible:ring-indigo-500"
                        />
                        <p className="text-[10px] text-gray-400 italic">This is used for the main 'About' section in modern templates.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="resumeUrl"
                            value={userData.resumeUrl || ''}
                            onChange={(e) => handleChange('resumeUrl', e.target.value)}
                            placeholder="https://example.com/resume.pdf"
                        />
                        <Button size="icon" variant="outline" onClick={() => window.open(userData.resumeUrl, '_blank')} disabled={!userData.resumeUrl}>
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {userData.experience && userData.experience.length > 0 && (
                    <div className="pt-4 border-t">
                        <Label className="flex items-center gap-2 mb-3 text-gray-700">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            Extracted Experience
                        </Label>
                        <div className="space-y-3">
                            {userData.experience.map((exp: any, i: number) => (
                                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-zinc-700">
                                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{exp.title}</div>
                                    <div className="text-xs text-gray-500">{exp.companyName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {userData.education && userData.education.length > 0 && (
                    <div className="pt-4 border-t">
                        <Label className="flex items-center gap-2 mb-3 text-gray-700">
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            Extracted Education
                        </Label>
                        <div className="space-y-3">
                            {userData.education.map((edu: any, i: number) => (
                                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-zinc-700">
                                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{edu.degreeName}</div>
                                    <div className="text-xs text-gray-500">{edu.schoolName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
