import React from 'react';

export const Hero: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <section className="py-20 px-10 text-center">
            <h1 className="text-6xl font-black mb-4">{userData?.name || 'NAME'}</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">{userData?.bio || 'BIO'}</p>
        </section>
    );
};
