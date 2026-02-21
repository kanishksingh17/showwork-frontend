import React from 'react';
import {
    SiReact,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiNextdotjs,
    SiNodedotjs,
    SiExpress,
    SiNestjs,
    SiDjango,
    SiFlask,
    SiFastapi,
    SiSpringboot,
    SiRubyonrails,
    SiLaravel,
    SiTypescript,
    SiJavascript,
    SiPython,
    SiGo,
    SiRust,
    SiCplusplus,
    SiPhp,
    SiRuby,
    SiSwift,
    SiKotlin,
    SiDart,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiRedis,
    SiFirebase,
    SiSupabase,
    SiPrisma,
    SiGraphql,
    SiGooglecloud,
    SiVercel,
    SiNetlify,
    SiHeroku,
    SiDocker,
    SiKubernetes,
    SiGithubactions,
    SiGitlab,
    SiJenkins,
    SiTerraform,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiSass,
    SiBootstrap,
    SiFramer,
    SiJest,
    SiCypress,
    SiSocketdotio,
    SiSolidity,
    SiEthereum,
    SiIpfs,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiOpenai,
    SiLinux,
    SiApple,
    SiAndroid,
    SiFigma,
    SiAdobephotoshop,
    SiAdobexd,
} from 'react-icons/si';

import { FaCode } from 'react-icons/fa';

/**
 * Utility function to get a comprehensive React icon based on a technology name.
 * Uses exact matches and common fuzzy matches to find the best icon.
 */
export const getTechIcon = (techName: string | undefined): React.ReactNode => {
    if (!techName) return <FaCode />;

    const normalized = techName.toLowerCase().replace(/[^a-z0-9]/g, '');

    switch (normalized) {
        // Frontend frameworks & libraries
        case 'react':
        case 'reactjs':
        case 'reactnative':
            return <SiReact />;
        case 'vue':
        case 'vuejs':
            return <SiVuedotjs />;
        case 'angular':
        case 'angularjs':
            return <SiAngular />;
        case 'svelte':
        case 'sveltekit':
            return <SiSvelte />;
        case 'next':
        case 'nextjs':
            return <SiNextdotjs />;

        // Backend frameworks
        case 'node':
        case 'nodejs':
            return <SiNodedotjs />;
        case 'express':
        case 'expressjs':
            return <SiExpress />;
        case 'nest':
        case 'nestjs':
            return <SiNestjs />;
        case 'django':
            return <SiDjango />;
        case 'flask':
            return <SiFlask />;
        case 'fastapi':
            return <SiFastapi />;
        case 'spring':
        case 'springboot':
            return <SiSpringboot />;
        case 'rails':
        case 'rubyonrails':
            return <SiRubyonrails />;
        case 'laravel':
            return <SiLaravel />;

        // Languages
        case 'typescript':
        case 'ts':
            return <SiTypescript />;
        case 'javascript':
        case 'js':
        case 'es6':
            return <SiJavascript />;
        case 'python':
        case 'py':
            return <SiPython />;
        case 'go':
        case 'golang':
            return <SiGo />;
        case 'rust':
        case 'rs':
            return <SiRust />;
        case 'cpp':
        case 'cplusplus':
        case 'c':
            return <SiCplusplus />;
        case 'csharp':
        case 'cs':
        case 'dotnet':
            return <FaCode />;
        case 'java':
            return <FaCode />;
        case 'php':
            return <SiPhp />;
        case 'ruby':
            return <SiRuby />;
        case 'swift':
            return <SiSwift />;
        case 'kotlin':
            return <SiKotlin />;
        case 'dart':
            return <SiDart />;

        // Databases & ORMs
        case 'postgres':
        case 'postgresql':
        case 'psql':
            return <SiPostgresql />;
        case 'mysql':
            return <SiMysql />;
        case 'mongo':
        case 'mongodb':
            return <SiMongodb />;
        case 'redis':
            return <SiRedis />;
        case 'firebase':
            return <SiFirebase />;
        case 'supabase':
            return <SiSupabase />;
        case 'prisma':
            return <SiPrisma />;

        // APIs & Networking
        case 'graphql':
        case 'gql':
            return <SiGraphql />;
        case 'socketio':
        case 'websocket':
        case 'websockets':
            return <SiSocketdotio />;

        // Cloud & Deployment
        case 'aws':
        case 'amazonwebservices':
            return <FaCode />;
        case 'gcp':
        case 'googlecloud':
            return <SiGooglecloud />;
        case 'azure':
        case 'microsoftazure':
            return <FaCode />;
        case 'vercel':
            return <SiVercel />;
        case 'netlify':
            return <SiNetlify />;
        case 'heroku':
            return <SiHeroku />;

        // DevOps & Tools
        case 'docker':
            return <SiDocker />;
        case 'k8s':
        case 'kubernetes':
            return <SiKubernetes />;
        case 'githubactions':
        case 'ci':
        case 'cd':
            return <SiGithubactions />;
        case 'gitlab':
        case 'gitlabci':
            return <SiGitlab />;
        case 'jenkins':
            return <SiJenkins />;
        case 'terraform':
            return <SiTerraform />;

        // Web fundamentals & Styling
        case 'html':
        case 'html5':
            return <SiHtml5 />;
        case 'css':
        case 'css3':
            return <SiCss3 />;
        case 'tailwind':
        case 'tailwindcss':
            return <SiTailwindcss />;
        case 'sass':
        case 'scss':
            return <SiSass />;
        case 'bootstrap':
            return <SiBootstrap />;
        case 'framer':
        case 'framermotion':
            return <SiFramer />;

        // Testing
        case 'jest':
            return <SiJest />;
        case 'cypress':
            return <SiCypress />;

        // Web3
        case 'web3':
        case 'web3js':
            return <FaCode />;
        case 'solidity':
            return <SiSolidity />;
        case 'ethereum':
        case 'eth':
            return <SiEthereum />;
        case 'ipfs':
            return <SiIpfs />;

        // AI & ML
        case 'tensorflow':
        case 'tf':
            return <SiTensorflow />;
        case 'pytorch':
            return <SiPytorch />;
        case 'scikit':
        case 'scikitlearn':
            return <SiScikitlearn />;
        case 'openai':
        case 'chatgpt':
        case 'gpt':
            return <SiOpenai />;

        // Platforms & Design
        case 'linux':
        case 'ubuntu':
            return <SiLinux />;
        case 'mac':
        case 'macos':
        case 'ios':
        case 'apple':
            return <SiApple />;
        case 'android':
            return <SiAndroid />;
        case 'windows':
            return <FaCode />;
        case 'figma':
            return <SiFigma />;
        case 'photoshop':
            return <SiAdobephotoshop />;
        case 'xd':
        case 'adobexd':
            return <SiAdobexd />;

        // Default icon if no match
        default:
            return <FaCode />;
    }
};
