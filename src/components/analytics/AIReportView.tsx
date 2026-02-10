
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    BarChart3,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    AlertCircle,
    FileText,
    Globe,
    Target,
    Briefcase,
    ChevronRight,
    Star
} from "lucide-react";

export function AIReportView() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="flex items-center text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer mt-0.5 group transition-colors">
                    View Full Report <ArrowUpRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-xl p-0 overflow-hidden">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2 text-xl">
                                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                AI Employability Report
                            </SheetTitle>
                            <SheetDescription>
                                Analysis based on your profile, portfolio, and target role.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Overall Match Score</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">82%</span>
                                    <span className="text-emerald-600 font-bold text-sm">+5% vs last week</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full border-4 border-indigo-100 dark:border-indigo-900 grid place-items-center">
                                <span className="text-xs font-bold text-indigo-600">High</span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-8">

                            {/* Target Role Context */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-5 h-5 text-slate-400" />
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Target Alignment</h3>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-4 h-4 text-slate-500" />
                                            <div>
                                                <p className="text-sm font-semibold">Senior Frontend Engineer</p>
                                                <p className="text-xs text-slate-500">TechCorp Inc.</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Strong Match</Badge>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-slate-600 dark:text-slate-400">Technical Skills</span>
                                                <span className="font-bold">95%</span>
                                            </div>
                                            <Progress value={95} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-slate-600 dark:text-slate-400">Experience Level</span>
                                                <span className="font-bold">80%</span>
                                            </div>
                                            <Progress value={80} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-slate-600 dark:text-slate-400">Soft Skills Keywords</span>
                                                <span className="font-bold text-amber-600">65%</span>
                                            </div>
                                            <Progress value={65} className="h-2 bg-slate-100 dark:bg-slate-800 [&>div]:bg-amber-500" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Portfolio Analysis */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Portfolio Analysis</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Strong Project Showcases</h4>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                Your "E-commerce Redesign" case study effectively demonstrates problem-solving skills. The "Before/After" metrics are excellent.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <AlertCircle className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Missing Deployment Links</h4>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                2 of your featured projects lack live demo links. Recruiters are 40% more likely to engage with live projects.
                                            </p>
                                            <Button variant="link" className="h-auto p-0 text-xs text-blue-600 mt-1">Fix this now <ChevronRight className="w-3 h-3" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Resume Analysis */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-slate-400" />
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Resume Optimization</h3>
                                </div>
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 rounded-xl">
                                    <div className="flex gap-3">
                                        <Star className="w-5 h-5 text-orange-600 shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-bold text-orange-800 dark:text-orange-300">ATS Keyword Gap Detected</h4>
                                            <p className="text-xs text-orange-700/80 dark:text-orange-400/80 mt-1 leading-relaxed">
                                                The job description emphasizes "System Design" and "Next.js", but these terms appear infrequently in your resume summary.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Readability Score</p>
                                        <p className="text-lg font-bold">High</p>
                                    </div>
                                    <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-1">Action Verbs</p>
                                        <p className="text-lg font-bold">Strong</p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );
}
