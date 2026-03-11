import React from 'react';

export const Hero: React.FC<{ userData: any }> = ({ userData }) => {
    const avatarUrl = userData?.avatar || userData?.profilePicture || "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/t1_avatar_v3_1771998119984.png";
    const profession = userData?.profession || "Professional Javascript Developer";
    const headline = userData?.headline || "Providing value for Business Growth through code.";
    const name = userData?.name || "Milton Ivan";

    return (
        <section className="text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                <img
                    alt={name}
                    className="w-full h-full object-cover"
                    src={avatarUrl}
                />
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-bold mb-3">
                    {name} — {profession}
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.15] tracking-tight">
                    {headline.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < headline.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h1>
            </div>
        </section>
    );
};
