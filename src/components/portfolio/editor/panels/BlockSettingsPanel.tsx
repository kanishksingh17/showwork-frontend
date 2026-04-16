import React, { useState, useEffect, useRef } from 'react';
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
    Github,
    UploadCloud,
    RefreshCw,
    MapPin,
    Building2,
    Globe,
    Activity,
    Sparkles,
    User
} from 'lucide-react';
import { toast } from 'sonner';
import { SECTION_EDITOR_REGISTRY } from '../SectionEditorRegistry';
import type { EditorField } from '../SectionEditorRegistry';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    ChevronDown, 
    ChevronUp, 
    Layout as LayoutIcon,
    GripVertical
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
    
    // Log upload state
    const [uploadingProjectIdx, setUploadingProjectIdx] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [targetProjectIdx, setTargetProjectIdx] = useState<number | null>(null);

    if (!activeSection) return null;

    const data = activeSection.customData || {};

    const handleChange = (key: string, value: any) => {
        dispatch(updateSectionCustomData({ id: activeSection.id, data: { [key]: value } }));
    };

    const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || targetProjectIdx === null) return;

        // Check file size (limit to 1MB for base64 storage)
        if (file.size > 1024 * 1024) {
            toast.error("File is too large. Please use an image under 1MB.");
            return;
        }

        setUploadingProjectIdx(targetProjectIdx);
        
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                if (base64) {
                    const manualProjects = activeSection.customData?.manualProjects || [];
                    const newList = [...manualProjects];
                    newList[targetProjectIdx] = { ...newList[targetProjectIdx], logo: base64 };
                    handleChange('manualProjects', newList);
                    toast.success("Logo uploaded successfully!");
                }
                setUploadingProjectIdx(null);
                setTargetProjectIdx(null);
            };
            reader.onerror = () => {
                toast.error("Failed to read file.");
                setUploadingProjectIdx(null);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Failed to process image.");
            setUploadingProjectIdx(null);
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const renderFields = () => {
        // 1. CHECK DYNAMIC REGISTRY FIRST (Variant-Specific Fields)
        const variantConfig = activeSection.variant ? SECTION_EDITOR_REGISTRY[activeSection.variant] : null;

        if (variantConfig) {
            return (
                <div className="space-y-8">
                    {variantConfig.map((field) => (
                        <div key={field.id} className="space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Label className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                                    {field.label}
                                </Label>
                                {field.hint && (
                                    <p className="text-[9px] text-gray-400 italic font-normal">({field.hint})</p>
                                )}
                            </div>

                            {field.type === 'text' && (
                                <Input
                                    value={data[field.id] ?? field.defaultValue ?? ''}
                                    onChange={e => handleChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="h-9 text-sm"
                                />
                            )}

                            {field.type === 'textarea' && (
                                <Textarea
                                    value={data[field.id] ?? field.defaultValue ?? ''}
                                    onChange={e => handleChange(field.id, e.target.value)}
                                    placeholder={field.placeholder}
                                    rows={4}
                                    className="text-sm leading-relaxed"
                                />
                            )}

                            {field.type === 'select' && (
                                <Select
                                    value={data[field.id] ?? field.defaultValue ?? ''}
                                    onValueChange={val => handleChange(field.id, val)}
                                >
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {field.type === 'object-list' && (
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">List Items</p>
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="h-6 px-2 text-[10px] gap-1 hover:bg-indigo-50 text-indigo-600 font-bold"
                                            onClick={() => {
                                                const list = data[field.id] || field.defaultValue || [];
                                                const newItem = field.itemFields?.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue || '' }), {});
                                                handleChange(field.id, [...list, newItem]);
                                            }}
                                        >
                                            <Plus className="w-3 h-3" /> Add Item
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {(data[field.id] || field.defaultValue || []).map((item: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 space-y-4 group relative">
                                                <button
                                                    onClick={() => {
                                                        const list = data[field.id] || field.defaultValue || [];
                                                        handleChange(field.id, list.filter((_: any, i: number) => i !== idx));
                                                    }}
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 p-1 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {field.itemFields?.map(subField => (
                                                        <div key={subField.id} className="space-y-1.5">
                                                            <Label className="text-[10px] uppercase text-zinc-400 font-bold">
                                                                {subField.label}
                                                            </Label>
                                                            {subField.type === 'text' && (
                                                                <Input
                                                                    value={item[subField.id] ?? subField.defaultValue ?? ''}
                                                                    onChange={e => {
                                                                        const list = [...(data[field.id] || field.defaultValue || [])];
                                                                        list[idx] = { ...item, [subField.id]: e.target.value };
                                                                        handleChange(field.id, list);
                                                                    }}
                                                                    className="h-8 text-xs bg-white dark:bg-zinc-950"
                                                                />
                                                            )}
                                                            {subField.type === 'select' && (
                                                                <Select
                                                                    value={item[subField.id] ?? subField.defaultValue ?? ''}
                                                                    onValueChange={val => {
                                                                        const list = [...(data[field.id] || field.defaultValue || [])];
                                                                        list[idx] = { ...item, [subField.id]: val };
                                                                        handleChange(field.id, list);
                                                                    }}
                                                                >
                                                                    <SelectTrigger className="h-8 text-xs bg-white dark:bg-zinc-950">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {subField.options?.map(opt => (
                                                                            <SelectItem key={opt.value} value={opt.value}>
                                                                                {opt.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {field.type === 'tag-list' && (
                                <TagInput
                                    value={data[field.id] ?? field.defaultValue ?? []}
                                    onChange={tags => handleChange(field.id, tags)}
                                    placeholder={field.placeholder}
                                    hint={field.hint}
                                />
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        // 2. FALLBACK TO GENERIC TYPE-BASED EDITOR
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
                            <div className="space-y-2">
                                <Label className="text-xs">Short Tagline</Label>
                                <Input
                                    value={data.tagline ?? userData?.tagline ?? ''}
                                    onChange={e => handleChange('tagline', e.target.value)}
                                    placeholder="Building tools for developers..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-indigo-100 dark:border-indigo-900/50 space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-indigo-500" />
                                <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Identity Details</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label className="text-[10px] uppercase text-zinc-400 flex items-center gap-1">
                                        <MapPin className="w-2.5 h-2.5" /> Location
                                    </Label>
                                    <Input
                                        value={data.location ?? userData?.location ?? ''}
                                        onChange={e => handleChange('location', e.target.value)}
                                        placeholder="San Francisco, CA"
                                        className="h-8 text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] uppercase text-zinc-400 flex items-center gap-1">
                                        <Building2 className="w-2.5 h-2.5" /> Company
                                    </Label>
                                    <Input
                                        value={data.company ?? userData?.company ?? ''}
                                        onChange={e => handleChange('company', e.target.value)}
                                        placeholder="ShowWork Inc."
                                        className="h-8 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase text-zinc-400 flex items-center gap-1">
                                    <Globe className="w-2.5 h-2.5" /> Personal Website
                                </Label>
                                <Input
                                    value={data.website ?? userData?.portfolioUrl ?? ''}
                                    onChange={e => handleChange('website', e.target.value)}
                                    placeholder="yourname.dev"
                                    className="h-8 text-xs"
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

                        <div className="space-y-4 pt-4 border-t border-indigo-100 dark:border-indigo-900/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-300">Portfolio Metrics</h4>
                                </div>
                                <Button
                                    onClick={() => {
                                        const metrics = data.metrics || [];
                                        handleChange('metrics', [...metrics, { label: 'Metric', value: '100+' }]);
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 text-[10px] gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Add Metric
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {(data.metrics || []).map((metric: any, idx: number) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-700 space-y-2 group relative">
                                        <button
                                            onClick={() => handleChange('metrics', data.metrics.filter((_: any, i: number) => i !== idx))}
                                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500 p-1"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                        <div className="space-y-1">
                                            <Label className="text-[9px] uppercase text-zinc-400">Label</Label>
                                            <Input
                                                value={metric.label}
                                                onChange={e => {
                                                    const newList = [...data.metrics];
                                                    newList[idx] = { ...metric, label: e.target.value };
                                                    handleChange('metrics', newList);
                                                }}
                                                className="h-7 text-[10px] bg-zinc-50 dark:bg-zinc-950 border-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[9px] uppercase text-zinc-400">Value</Label>
                                            <Input
                                                value={metric.value}
                                                onChange={e => {
                                                    const newList = [...data.metrics];
                                                    newList[idx] = { ...metric, value: e.target.value };
                                                    handleChange('metrics', newList);
                                                }}
                                                className="h-7 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border-none"
                                            />
                                        </div>
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
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <Input
                                                    value={proj.name}
                                                    onChange={e => {
                                                        const newList = [...manualProjects];
                                                        newList[idx] = { ...proj, name: e.target.value };
                                                        handleChange('manualProjects', newList);
                                                    }}
                                                    className="h-6 text-xs font-bold border-none p-0 bg-transparent focus-visible:ring-0"
                                                />
                                                <button onClick={() => handleChange('manualProjects', manualProjects.filter((_: any, i: number) => i !== idx))} className="opacity-0 group-hover:opacity-100 text-red-500 p-1">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-[9px] uppercase text-zinc-400">Project Logo URL</Label>
                                                    <button 
                                                        onClick={() => {
                                                            setTargetProjectIdx(idx);
                                                            fileInputRef.current?.click();
                                                        }}
                                                        disabled={uploadingProjectIdx !== null}
                                                        className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                                    >
                                                        {uploadingProjectIdx === idx ? (
                                                            <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                                                        ) : (
                                                            <UploadCloud className="w-2.5 h-2.5" />
                                                        )}
                                                        {uploadingProjectIdx === idx ? 'Uploading...' : 'Upload Image'}
                                                    </button>
                                                </div>
                                                <Input
                                                    value={proj.logo || ''}
                                                    onChange={e => {
                                                        const newList = [...manualProjects];
                                                        newList[idx] = { ...proj, logo: e.target.value };
                                                        handleChange('manualProjects', newList);
                                                    }}
                                                    placeholder="https://example.com/logo.png"
                                                    className="h-7 text-[10px] bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
                                                />
                                                <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 w-full mb-1">Brand Shortcuts:</span>
                                                    {[
                                                        { name: 'Instagram', url: 'https://cdn.simpleicons.org/instagram/E4405F' },
                                                        { name: 'Facebook', url: 'https://cdn.simpleicons.org/facebook/1877F2' },
                                                        { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/181717' },
                                                        { name: 'LinkedIn', url: 'https://cdn.simpleicons.org/linkedin/0A66C2' },
                                                        { name: 'YouTube', url: 'https://cdn.simpleicons.org/youtube/FF0000' }
                                                    ].map(brand => (
                                                        <button
                                                            key={brand.name}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const newList = [...manualProjects];
                                                                newList[idx] = { ...proj, logo: brand.url };
                                                                handleChange('manualProjects', newList);
                                                                toast.success(`Set ${brand.name} logo`);
                                                            }}
                                                            title={brand.name}
                                                            className="w-6 h-6 rounded-md border border-zinc-100 dark:border-zinc-700 overflow-hidden hover:border-indigo-500 hover:scale-110 transition-all bg-white dark:bg-zinc-900 flex items-center justify-center p-1"
                                                        >
                                                            <img src={brand.url} alt={brand.name} className="w-full h-full object-contain" />
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-[8px] text-zinc-400 mt-1 italic">
                                                    Tip: Right-click any image on the web and select "Copy Image Address" to get the right link.
                                                </p>
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
                                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                                                <Label className="text-[9px] uppercase text-zinc-400 flex items-center gap-1">
                                                    <Sparkles className="w-2.5 h-2.5" /> Major Achievements
                                                </Label>
                                                <TagInput
                                                    value={proj.highlights || []}
                                                    onChange={highlights => {
                                                        const newList = [...manualProjects];
                                                        newList[idx] = { ...proj, highlights };
                                                        handleChange('manualProjects', newList);
                                                    }}
                                                    placeholder="reduced latency by 30%, led team of 5..."
                                                    hint="Used by AI to polish your resume"
                                                    splitOn=","
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            case 'blogs': {
                const blogUrls = data.blogUrls || [];
                const handleAddBlog = () => {
                    handleChange('blogUrls', [...blogUrls, '']);
                };
                const handleUpdateBlog = (idx: number, val: string) => {
                    const newList = [...blogUrls];
                    newList[idx] = val;
                    handleChange('blogUrls', newList);
                };
                const handleRemoveBlog = (idx: number) => {
                    handleChange('blogUrls', blogUrls.filter((_: any, i: number) => i !== idx));
                };

                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-indigo-500" />
                                <h4 className="font-semibold text-sm">Blog Articles</h4>
                            </div>
                            <Button onClick={handleAddBlog} size="sm" variant="outline" className="h-7 px-2 text-[10px] gap-1">
                                <Plus className="w-3 h-3" /> Add Post
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {blogUrls.length === 0 && <p className="text-[10px] text-gray-400 text-center italic py-2">No blogs linked yet.</p>}
                            {blogUrls.map((url: string, idx: number) => (
                                <div key={idx} className="flex gap-2">
                                    <Input
                                        value={url}
                                        onChange={e => handleUpdateBlog(idx, e.target.value)}
                                        placeholder="https://medium.com/your-post..."
                                        className="h-8 text-xs font-mono"
                                    />
                                    <Button onClick={() => handleRemoveBlog(idx)} size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-500 italic">
                            Enter URLs from Medium, Dev.to, or Hashnode to display them in your portfolio.
                        </p>
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
        }


        return (
            <div className="text-center py-20 grayscale opacity-40">
                <Sparkles className="w-12 h-12 mb-4 animate-spin-slow mx-auto text-gray-300" />
                <p className="text-sm font-medium text-gray-500">Pick a themed block to edit.</p>
                <p className="text-[10px] text-gray-400 mt-2 px-6">Most sections in this template use specialized content layouts.</p>
            </div>
        );
    };

    return (
        <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-900 dark:text-indigo-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Block Settings: <span className="text-indigo-600 dark:text-indigo-300">{activeSection.type}</span>
                </h3>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoUpload}
            />
            {renderFields()}
        </div>
    );
};
