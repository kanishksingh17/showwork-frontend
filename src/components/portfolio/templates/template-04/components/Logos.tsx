import React from 'react';

export const Logos: React.FC = () => {
    return (
        <div className="mt-4 sm:mt-0 pt-6 border-t border-gray-200 dark:border-gray-800/50">
            <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wider">
                Systems built using modern technologies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 transition-all duration-500">
                {/* Tech Logos */}
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="Postgres" />
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" alt="Redis" />
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" />
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg" alt="K8s" />
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original-wordmark.svg" alt="Go" />
                <img className="h-8 w-auto" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node" />
            </div>
        </div>
    );
};
