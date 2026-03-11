import React from 'react';

export const BioCtaPanel: React.FC = () => {
    return (
        <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center justify-center p-8 space-y-6 bento-fade-in delay-400">
            <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-light text-center leading-relaxed">
                Senior Data Analyst & Analytics Engineer building robust infrastructures that turn chaotic data into high-fidelity business intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a
                    className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-[--datacmd-primary] to-[--datacmd-secondary] font-mono rounded-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    href="#projects"
                >
                    EXPLORE REPOS
                    <span className="ml-2 material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">terminal</span>
                </a>

                <button
                    className="px-8 py-3 font-mono text-sm border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                >
                    DOWNLOAD CV
                </button>
            </div>
        </div>
    );
};
