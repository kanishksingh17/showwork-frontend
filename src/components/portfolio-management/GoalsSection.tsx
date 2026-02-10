import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, CheckCircle2 } from 'lucide-react';
import type { CareerGoal } from '@/types/portfolio-management';
import { motion } from 'framer-motion';

interface GoalsSectionProps {
    goals: CareerGoal[];
}

export function GoalsSection({ goals }: GoalsSectionProps) {
    return (
        <Card className="h-full border-0 shadow-md ring-1 ring-gray-100 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-900">
                    <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-100" />
                    Career Goals
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {goals.map((goal, index) => (
                    <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="space-y-3"
                    >
                        <div className="flex justify-between items-end text-sm">
                            <span className="font-semibold text-gray-700">{goal.title}</span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs">{goal.progress}%</span>
                        </div>
                        <div className="relative pt-1">
                            <Progress value={goal.progress} className="h-2.5 bg-gray-100" indicatorClassName={goal.progress >= 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                {goal.milestones.filter(m => !m.startsWith('[x]')).length} steps remaining
                            </span>
                            {goal.targetDate && <span className="text-gray-400">Target: {new Date(goal.targetDate).toLocaleDateString()}</span>}
                        </div>
                    </motion.div>
                ))}

                <div className="pt-5 border-t border-gray-200/60 mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                        Recent Wins
                    </h4>
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5 text-sm text-gray-600 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="truncate">Updated Portfolio for 2024</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-600 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="truncate">Applied to 5 Senior Roles</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
