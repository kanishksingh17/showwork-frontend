import React from 'react';
import {
    FaUniversity,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
    FaGraduationCap,
    FaBriefcase,
    FaCoffee,
    FaPills,
    FaWeixin,
    FaDiscord,
    FaLinkedin
} from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';

export function CustomIcon({ name, size = 20 }: { name: string; size?: number }) {
    switch (name) {
        case 'bank':
            return <FaUniversity size={size} />;
        case 'github':
            return <FaGithub size={size} />;
        case 'x':
        case 'twitter':
            return <FaTwitter size={size} />;
        case 'instagram':
            return <FaInstagram size={size} />;
        case "bsky":
            return <SiBluesky size={size} />
        case 'email':
            return <FaEnvelope size={size} />;
        case "college":
            return <FaGraduationCap size={size} />;
        case "education":
            return <FaGraduationCap size={size} />;
        case "briefcase":
            return <FaBriefcase size={size} />;
        case "coffee":
            return <FaCoffee size={size} />;
        case "pill":
            return <FaPills size={size} />;
        case "wechat":
            return <FaWeixin size={size} />;
        case "discord":
            return <FaDiscord size={size} />;
        case 'linkedin':
            return <FaLinkedin size={size} />;
        default:
            return null
    }
}
