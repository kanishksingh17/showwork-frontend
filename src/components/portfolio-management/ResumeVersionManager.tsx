import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Upload, Link as LinkIcon, MoreHorizontal, FileCheck, CheckCircle2 } from 'lucide-react';
import type { ResumeVersion } from '@/types/portfolio-management';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeVersionManagerProps {
    resumes: ResumeVersion[];
    onSetCurrent: (id: string) => void;
    onDownload: (id: string) => void;
    onUpload: () => void;
}

export function ResumeVersionManager({ resumes, onSetCurrent, onDownload, onUpload }: ResumeVersionManagerProps) {
    return (
        <Card className="border-0 shadow-md ring-1 ring-gray-100 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
                <div>
                    <CardTitle className="text-lg font-bold text-gray-900">Resume Versions</CardTitle>
                    <CardDescription>Manage and tailor resumes for different roles</CardDescription>
                </div>
                <Button onClick={onUpload} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
                    <Upload className="w-4 h-4" /> Upload
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                    <AnimatePresence>
                        {resumes.map((resume, index) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors ${resume.isCurrent ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl transition-all ${resume.isCurrent ? 'bg-blue-100 text-blue-600 shadow-sm' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-blue-500'}`}>
                                        {resume.isCurrent ? <FileCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className={`font-semibold text-sm ${resume.isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>{resume.title}</h3>
                                            {resume.isCurrent && (
                                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-blue-100 text-blue-700 font-medium">
                                                    Active
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                            <span className="font-medium">{resume.targetRole}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        {resume.linkedPortfolioId && (
                                            <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-1 group-hover:text-blue-500 transition-colors">
                                                <LinkIcon className="w-3 h-3" /> Linked to portfolio
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {!resume.isCurrent && (
                                        <Button variant="ghost" size="sm" onClick={() => onSetCurrent(resume.id)} className="h-8 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                            Set Active
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="icon" onClick={() => onDownload(resume.id)} className="h-8 w-8 hover:bg-gray-200">
                                        <Download className="w-4 h-4 text-gray-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200">
                                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}
