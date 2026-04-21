import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC<{ userData: any; customData?: any }> = ({ userData, customData }) => {
    const testimonials = customData?.testimonials || userData?.testimonials || [
        {
            text: "An absolute pleasure to work with. Milton brings both technical expertise and a keen eye for design details that make the final product shine.",
            author: "Sarah Johnson",
            role: "Product Manager"
        },
        {
            text: "I had the opportunity to work with him on several projects and his commitment to quality code and user experience is outstanding.",
            author: "David Chen",
            role: "Senior Developer"
        }
    ];

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">What people say about me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 rounded-3xl relative shadow-sm hover:shadow-md transition-shadow duration-300">
                        <Quote className="text-gray-100 dark:text-gray-700 absolute top-6 left-6 -z-0" size={40} />
                        <p className="text-sm text-gray-600 dark:text-gray-300 relative z-10 pt-4 leading-relaxed italic font-medium">
                            "{t.text}"
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                                {t.author.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-[10px] font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">{t.author}</h4>
                                <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-medium">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
