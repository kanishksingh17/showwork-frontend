import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Star, Clock, Globe, Plus, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { ManagedPortfolio } from '@/types/portfolio-management';
import { motion } from 'framer-motion';

interface ActivePortfoliosGridProps {
    portfolios: ManagedPortfolio[];
    onSetPrimary: (id: string) => void;
    onEdit: (id: string) => void;
    onView: (url: string) => void;
}

export function ActivePortfoliosGrid({ portfolios, onSetPrimary, onEdit, onView }: ActivePortfoliosGridProps) {
    return (
        <div className="h-full bg-white rounded-[2rem] p-8 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-blue-950">Portfolios</h2>
                    <p className="text-blue-500/80 font-medium mt-1">Manage your websites</p>
                </div>
                <Button onClick={() => window.location.href = '/portfolio/create'} className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 px-6 h-12 transition-all hover:scale-105">
                    <Plus className="w-5 h-5 mr-2" /> New Portfolio
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map((portfolio, index) => (
                    <motion.div
                        key={portfolio.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className={`group relative overflow-hidden border-0 bg-gray-50 hover:bg-white rounded-[1.5rem] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 ${portfolio.isPrimary ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''}`}>
                            {/* Header Image Area */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[1.5rem]">
                                {portfolio.thumbnail ? (
                                    <img
                                        src={portfolio.thumbnail}
                                        alt={portfolio.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-300">
                                        <Globe className="w-16 h-16 opacity-50 mb-3" />
                                    </div>
                                )}

                                {portfolio.isPrimary && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-lg animate-in fade-in zoom-in duration-300">
                                            <Star className="w-4 h-4 fill-white" />
                                        </span>
                                    </div>
                                )}

                                {/* Hover Actions */}
                                <div className="absolute inset-x-4 bottom-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <Button className="flex-1 bg-white/90 backdrop-blur text-blue-950 hover:bg-white hover:text-blue-600 rounded-xl shadow-lg border-0" onClick={() => onView(portfolio.publishedUrl || '#')}>
                                        <Eye className="w-4 h-4 mr-2" /> View
                                    </Button>
                                    <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg border-0" onClick={() => onEdit(portfolio.id)}>
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-full">
                                        <h3 className="font-bold text-xl text-blue-950 mb-1 group-hover:text-blue-600 transition-colors truncate">{portfolio.name}</h3>
                                        <p className="text-sm font-medium text-gray-400">{portfolio.templateName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <StatusBadge status={portfolio.status === 'published' ? 'active' : portfolio.status} className="rounded-lg px-3 py-1" />

                                    {!portfolio.isPrimary && (
                                        <button onClick={() => onSetPrimary(portfolio.id)} className="text-xs font-bold text-gray-300 hover:text-blue-500 transition-colors">
                                            Make Primary
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {/* 'Add New' Placeholder Card for Grid Symmetry */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: portfolios.length * 0.1 }}
                    className="flex"
                >
                    <button
                        onClick={() => window.location.href = '/portfolio/create'}
                        className="w-full h-full min-h-[300px] rounded-[1.5rem] border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-4 transition-all group p-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-300 group-hover:bg-blue-100 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg text-gray-400 group-hover:text-blue-600">Create New Portfolio</h3>
                            <p className="text-sm text-gray-300 font-medium">Start from scratch or a template</p>
                        </div>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
