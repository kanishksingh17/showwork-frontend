import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink, Calendar, MoreHorizontal, Briefcase, Building2 } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { ProjectTarget } from '@/types/portfolio-management';
import { motion } from 'framer-motion';

interface ProjectTargetsListProps {
    targets: ProjectTarget[];
    onAddTarget: () => void;
    onUpdateStatus: (id: string, status: ProjectTarget['status']) => void;
}

export function ProjectTargetsList({ targets, onAddTarget, onUpdateStatus }: ProjectTargetsListProps) {
    return (
        <Card className="h-full border-0 shadow-md ring-1 ring-gray-100 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    Target Applications
                </CardTitle>
                <Button size="sm" variant="outline" onClick={onAddTarget} className="border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-600">
                    <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                    {targets.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
                            <Briefcase className="w-10 h-10 text-gray-200 mb-2" />
                            <p>No active applications</p>
                            <Button variant="link" size="sm" onClick={onAddTarget}>Start tracking</Button>
                        </div>
                    ) : (
                        targets.map((target, index) => (
                            <motion.div
                                key={target.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-3"
                            >
                                <div className="space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                            <Building2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm truncate">{target.companyName}</h4>
                                            <p className="text-xs text-gray-500 truncate">{target.position}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pl-10">
                                        {target.deadline && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(target.deadline).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {target.priority === 'high' && (
                                            <Badge variant="outline" className="text-[10px] font-normal border-orange-200 text-orange-600 bg-orange-50 px-1.5 py-0 h-4">
                                                High Priority
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pl-10 sm:pl-0">
                                    <StatusBadge status={target.status} type="application" />
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-blue-600">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-blue-600">
                                            <MoreHorizontal className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
                {targets.length > 5 && (
                    <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                        <Button variant="ghost" className="w-full text-xs text-gray-500 hover:text-gray-900 h-8">
                            View all applications
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
