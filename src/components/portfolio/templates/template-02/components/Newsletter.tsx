import React from 'react';

export const Newsletter: React.FC = () => {
    return (
        <section className="relative mb-32">
            <div className="bg-[#1f2937] dark:bg-[#111827] rounded-[2rem] p-8 md:p-16 overflow-hidden relative">
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full text-white fill-current" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M45,-75C58.3,-69.3,69.2,-58.1,76.5,-45.3C83.8,-32.5,87.6,-18.1,86.2,-4.2C84.8,9.7,78.2,23.1,69.5,34.8C60.8,46.5,50,56.5,38.1,64.4C26.2,72.3,13.1,78.1,-0.9,79.7C-14.9,81.3,-29.8,78.7,-42.6,71.5C-55.4,64.3,-66.1,52.5,-73.4,39.1C-80.7,25.7,-84.6,10.7,-81.9,-2.8C-79.2,-16.3,-69.9,-28.3,-59.5,-38.3C-49.1,-48.3,-37.6,-56.3,-25.6,-62.7C-13.6,-69.1,1.1,-73.9,14.6,-76.3L45,-75Z" transform="translate(100 100)"></path>
                    </svg>
                </div>
                <div className="relative z-10 max-w-2xl text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to my newsletter</h2>
                    <p className="text-gray-300 mb-8 leading-relaxed">A periodic update about my life, recent blog posts, how-tos, and discoveries.</p>
                    <form className="flex flex-col sm:flex-row gap-3 mb-6 bg-white/5 p-2 rounded-full border border-white/10 max-w-md" onSubmit={(e) => e.preventDefault()}>
                        <input className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-2" placeholder="your@email.com" required type="email" />
                        <button className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors" type="submit">Subscribe</button>
                    </form>
                    <p className="text-gray-400 text-xs">
                        <span className="font-bold text-white">NO SPAM.</span> I never send spam. You can unsubscribe at any time!
                    </p>
                </div>
                <div className="absolute top-8 left-8 text-white/20 text-xl font-bold">+</div>
                <div className="absolute bottom-8 right-8 text-white/20 text-xl font-bold">+</div>
            </div>
        </section>
    );
};
