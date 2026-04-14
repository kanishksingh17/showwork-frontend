import React, { useState, useEffect } from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateSectionCustomData } from '@/store/portfolio/portfolioSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Code,
    Link2,
    Mail,
    Tag,
    Plus,
    Trash2,
    Briefcase,
    GraduationCap,
    Copyright,
    Github
} from 'lucide-react';

/**
 * Uses a local "raw string" state so the user can type freely (including commas/newlines).
 * The value is only parsed → dispatched to Redux on blur, preventing the controlled-input
 * "comma eating" bug where filter(Boolean) removes trailing commas mid-type.
 */
const TagInput: React.FC<{
    value: string[];
    onChange: (slugs: string[]) => void;
    placeholder?: string;
    hint?: string;
    splitOn?: ',' | '\n';
    rows?: number;
}> = ({ value, onChange, placeholder, hint, splitOn = ',', rows = 3 }) => {
    const separator = splitOn === ',' ? ', ' : '\n';
    const [raw, setRaw] = useState(value?.join(separator) ?? '');

    // Sync if the external value changes (e.g. Redux reset)
    useEffect(() => {
        setRaw(value?.join(separator) ?? '');
    }, [JSON.stringify(value)]);

    const commit = () => {
        const parsed = raw.split(splitOn).map(s => s.trim()).filter(Boolean);
        onChange(parsed);
    };

    return (
        <div className="space-y-1.5">
            <Textarea
                placeholder={placeholder}
                value={raw}
                rows={rows}
                onChange={e => setRaw(e.target.value)}
                onBlur={commit}
                className="text-sm font-mono focus-visible:ring-indigo-500"
            />
            {hint && <p className="text-[10px] text-gray-500">{hint}</p>}
            {value?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {value.map((slug, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold"
                        >
                            <Tag className="w-2.5 h-2.5" />
                            {slug}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export const BlockSettingsPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const activeSectionId = usePortfolioSelector(state => state.portfolio.activeSection);
    const sections = usePortfolioSelector(state => state.portfolio.sections);
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    const activeSection = sections.find(s => s.id === activeSectionId);
    if (!activeSection) return null;

    const data = activeSection.customData || {};

    const handleChange = (key: string, value: any) => {
        dispatch(updateSectionCustomData({ id: activeSection.id, data: { [key]: value } }));
    };

    const renderFields = () => {
        switch (activeSection.type) {
            case 'about': {
                // Use profile data as defaults - be resilient to different key structures
                const defaultHeadline = userData?.professionalHeadline || userData?.headline || userData?.title || '';
                const defaultBio = userData?.professionalBio || userData?.bio || '';
                
                // Pull from any available social link bucket
                const getSocial = (key: string) => {
                    return userData?.socialLinks?.[key] || 
                           userData?.socials?.[key] || 
                           userData?.socialLinks?.[key.charAt(0).toUpperCase() + key.slice(1)] ||
                           '';
                };

                const defaultSocials = {
                    github: getSocial('github'),
                    twitter: getSocial('twitter'),
                    linkedin: getSocial('linkedin'),
                    email: getSocial('email') || userData?.email || '',
                };

                const socialLinks = { ...defaultSocials, ...(data.socialLinks || {}) };
                const handleSocial = (key: string, val: string) =>
                    handleChange('socialLinks', { ...(data.socialLinks || {}), [key]: val });

                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-indigo-500" />
                                <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Hero Content</h4>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Headline</Label>
                                <Input
                                    value={data.headline ?? defaultHeadline}
                                    onChange={e => handleChange('headline', e.target.value)}
                                    placeholder="Full-Stack Developer..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Bio Paragraph</Label>
                                <Textarea
                                    value={data.bio ?? defaultBio}
                                    onChange={e => handleChange('bio', e.target.value)}
                                    placeholder="Building high-performance software..."
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/50 space-y-4">
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-indigo-500" />
                                <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Social Links</h4>
                            </div>
                            {[
                                { key: 'github', label: 'GitHub URL' },
                                { key: 'twitter', label: 'Twitter' },
                                { key: 'linkedin', label: 'LinkedIn' },
                                { key: 'email', label: 'Email' },
                            ].map(({ key, label }) => (
                                <div key={key} className="space-y-1">
                                    <Label className="text-[10px] text-gray-400 uppercase tracking-tight">{label}</Label>
                                    <Input
                                        value={socialLinks[key]}
                                        onChange={e => handleSocial(key, e.target.value)}
                                        placeholder="Already fetched from profile..."
                                        className="h-8 text-xs"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            case 'skills': {
                // Skills fallback from JobRole or other sources if available
                const defaultSkills = (userData as any)?.skills?.map((s: any) => typeof s === 'string' ? s : s.name) || [];
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Code className="w-4 h-4 text-indigo-500" />
                            <h4 className="font-semibold text-sm">Tech Stack Display</h4>
                        </div>
                        <TagInput
                            value={data.techSlugs ?? defaultSkills}
                            onChange={slugs => handleChange('techSlugs', slugs)}
                            placeholder="react, typescript, nextdotjs..."
                            hint="Pulled from your resume automatically. Edit to change icons."
                            splitOn=","
                            rows={5}
                        />
                    </div>
                );
            }

            case 'resume': {
                // Map resume data from profile
                const defaultExp = (userData?.experience || []).map((e: any) => ({
                    company: e.companyName,
                    title: e.title,
                    start: e.startDate ? new Date(e.startDate).getFullYear().toString() : '',
                    end: e.endDate ? new Date(e.endDate).getFullYear().toString() : 'Present'
                }));
                const defaultEdu = (userData?.education || []).map((e: any) => ({
                    school: e.schoolName,
                    major: e.degreeName,
                    start: e.startDate ? new Date(e.startDate).getFullYear().toString() : '',
                    end: e.endDate ? new Date(e.endDate).getFullYear().toString() : ''
                }));

                const experiences = data.experiences || (defaultExp.length > 0 ? defaultExp : []);
                const educations = data.educations || (defaultEdu.length > 0 ? defaultEdu : []);

                const handleAddItem = (key: 'experiences' | 'educations') => {
                    const list = key === 'experiences' ? experiences : educations;
                    const newItem = key === 'experiences'
                        ? { company: 'New Company', title: 'Developer', start: '2023', end: 'Present' }
                        : { school: 'University Name', major: 'Course Name', start: '2019', end: '2023' };
                    handleChange(key, [...list, newItem]);
                };

                return (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-semibold text-sm">Work Experience</h4>
                                </div>
                                <Button onClick={() => handleAddItem('experiences')} size="sm" variant="outline" className="h-7 px-2 text-[10px] gap-1">
                                    <Plus className="w-3 h-3" /> Add New
                                </Button>
                            </div>
                            {experiences.length === 0 && <p className="text-[10px] text-gray-400 text-center italic">No experience found in resume.</p>}
                            <div className="space-y-3">
                                {experiences.map((exp: any, idx: number) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700 space-y-2 group">
                                        <div className="flex items-center justify-between gap-2">
                                            <Input
                                                value={exp.company}
                                                onChange={e => {
                                                    const newList = [...experiences];
                                                    newList[idx] = { ...exp, company: e.target.value };
                                                    handleChange('experiences', newList);
                                                }}
                                                className="h-7 text-xs font-bold border-none p-0 bg-transparent focus-visible:ring-0"
                                            />
                                            <button onClick={() => handleChange('experiences', experiences.filter((_: any, i: number) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-red-500 p-1">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                value={exp.title}
                                                onChange={e => {
                                                    const newList = [...experiences];
                                                    newList[idx] = { ...exp, title: e.target.value };
                                                    handleChange('experiences', newList);
                                                }}
                                                placeholder="Title"
                                                className="h-7 text-[10px] bg-zinc-50 dark:bg-zinc-900 border-none"
                                            />
                                            <Input
                                                value={`${exp.start} - ${exp.end}`}
                                                onChange={e => {
                                                    const [s, eVal] = e.target.value.split('-').map(v => v.trim());
                                                    const newList = [...experiences];
                                                    newList[idx] = { ...exp, start: s || '', end: eVal || '' };
                                                    handleChange('experiences', newList);
                                                }}
                                                className="h-7 text-[10px] bg-zinc-50 dark:bg-zinc-900 border-none text-right"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-indigo-100 dark:border-indigo-900/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-semibold text-sm">Education</h4>
                                </div>
                                <Button onClick={() => handleAddItem('educations')} size="sm" variant="outline" className="h-7 px-2 text-[10px] gap-1">
                                    <Plus className="w-3 h-3" /> Add Edu
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {educations.map((edu: any, idx: number) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700 space-y-2 group">
                                        <div className="flex items-center justify-between gap-2">
                                            <Input
                                                value={edu.school}
                                                onChange={e => {
                                                    const newList = [...educations];
                                                    newList[idx] = { ...edu, school: e.target.value };
                                                    handleChange('educations', newList);
                                                }}
                                                className="h-7 text-xs font-bold border-none p-0 bg-transparent focus-visible:ring-0"
                                            />
                                            <button onClick={() => handleChange('educations', educations.filter((_: any, i: number) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-red-500 p-1">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <Input
                                            value={edu.major}
                                            onChange={e => {
                                                const newList = [...educations];
                                                newList[idx] = { ...edu, major: e.target.value };
                                                handleChange('educations', newList);
                                            }}
                                            className="h-7 text-[10px] bg-zinc-50 dark:bg-zinc-900 border-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            case 'contact': {
                const defaultEmail = userData?.socialLinks?.email || '';
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4 text-indigo-500" />
                            <h4 className="font-semibold text-sm">Contact Inquiries</h4>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs">Forward Emails To</Label>
                            <Input
                                placeholder="you@example.com"
                                type="email"
                                value={data.forwardEmail ?? defaultEmail}
                                onChange={e => handleChange('forwardEmail', e.target.value)}
                            />
                            <p className="text-[10px] text-gray-500">
                                Defaults to your account email: {defaultEmail}
                            </p>
                        </div>
                    </div>
                );
            }

            case 'projects': {
                const integratedGithub = userData?.socialLinks?.github?.split('/').pop();
                const manualProjects = data.manualProjects || [];
                const handleAddProject = () => {
                    const newProj = { name: 'New Project', description: 'Brief description...', link: { href: '#', label: 'View Project' } };
                    handleChange('manualProjects', [...manualProjects, newProj]);
                };

                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-semibold text-sm">GitHub Sync</h4>
                                </div>
                                {integratedGithub && (
                                    <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Live</span>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Username</Label>
                                <Input
                                    value={data.githubUsername ?? (integratedGithub || '')}
                                    onChange={e => handleChange('githubUsername', e.target.value)}
                                    placeholder="Enter username..."
                                    className="h-9"
                                />
                                <p className="text-[10px] text-gray-500 italic">
                                    {integratedGithub ? `Connected via: ${integratedGithub}` : "Not connected."}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/50 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Curated Projects</h4>
                                </div>
                                <Button onClick={handleAddProject} size="sm" variant="outline" className="h-7 px-2 text-[10px] gap-1">
                                    <Plus className="w-3 h-3" /> Add
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {manualProjects.map((proj: any, idx: number) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700 space-y-2 group">
                                        <div className="flex items-center justify-between gap-2">
                                            <Input
                                                value={proj.name}
                                                onChange={e => {
                                                    const newList = [...manualProjects];
                                                    newList[idx] = { ...proj, name: e.target.value };
                                                    handleChange('manualProjects', newList);
                                                }}
                                                className="h-6 text-xs font-bold border-none p-0 bg-transparent"
                                            />
                                            <button onClick={() => handleChange('manualProjects', manualProjects.filter((_: any, i: number) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-red-500 p-1">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <Textarea
                                            value={proj.description}
                                            onChange={e => {
                                                const newList = [...manualProjects];
                                                newList[idx] = { ...proj, description: e.target.value };
                                                handleChange('manualProjects', newList);
                                            }}
                                            className="text-[10px] p-0 border-none focus-visible:ring-0 bg-transparent resize-none h-auto min-h-0"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            case 'footer':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Copyright className="w-4 h-4 text-indigo-500" />
                            <h4 className="font-semibold text-sm">Footer Branding</h4>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs">Copyright Text</Label>
                            <Input
                                value={data.copyright ?? `© ${new Date().getFullYear()} ${userData?.name || ''}`}
                                onChange={e => handleChange('copyright', e.target.value)}
                            />
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-10 text-gray-400 text-xs italic">
                        Select a section on the left or canvas to view specific settings.
                    </div>
                );
        }
    };

    return (
        <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-900 dark:text-indigo-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Block Settings: <span className="text-indigo-600 dark:text-indigo-300">{activeSection.type}</span>
                </h3>
            </div>
            {renderFields()}
        </div>
    );
};

