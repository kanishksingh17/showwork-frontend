import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export interface ContactOrganismProps {
    variant?: 'Contact01' | 'ContactMain';
    className?: string;
}

export const ContactOrganism: React.FC<ContactOrganismProps> = ({
    variant = 'Contact01',
    className,
}) => {
    const userData = usePortfolioSelector(state => state.portfolio.userData);
    const form = useRef<HTMLFormElement>(null);
    const [done, setDone] = useState(false);
    const [notDone, setNotDone] = useState(false);
    const [formData, setFormData] = useState({
        from_name: '',
        reply_to: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setDone(false)
        setNotDone(false)
    }

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.from_name || !formData.reply_to || !formData.message) {
            setNotDone(true);
        } else {
            // Placeholder for emailjs service ID etc. In real app, these should be env vars or user config
            const serviceID = "service_id";
            const templateID = "template_id";
            const publicKey = "public_key";

            console.log("EmailJS would send here with:", formData);
            setDone(true);

            // Uncomment to actually send if keys are provided
            /*
            emailjs.sendForm(serviceID, templateID, form.current!, publicKey)
                .then((result) => {
                    console.log(result.text);
                    setDone(true);
                }, (error) => {
                    console.log(error.text);
                });
            */
        }
    };

    // ContactMain - Replica of Contact.jsx and Social.jsx
    if (variant === 'ContactMain') {
        return (
            <div className={`min-h-screen pt-32 pb-16 bg-gradient-to-b from-[#1b1a2ea9] to-[#121123] text-white ${className || ''}`}>
                {/* Particle effect placeholder */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/contact-bg.png')] bg-cover bg-center" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        {/* Left Column: Heading */}
                        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                            <h1 className="text-4xl font-bold text-yellow-500">Contact me</h1>
                        </div>

                        {/* Right Column: Form */}
                        <div className="flex justify-center md:justify-start">
                            <form ref={form} onSubmit={sendEmail} className="w-full max-w-md flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="from_name"
                                    className="w-full p-3 rounded-lg bg-white/10 border border-transparent focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all shadow-[0_0_10px_rgba(100,100,100,0.1)] hover:shadow-[0_0_10px_rgba(200,200,200,0.2)]"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="reply_to"
                                    className="w-full p-3 rounded-lg bg-white/10 border border-transparent focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all shadow-[0_0_10px_rgba(100,100,100,0.1)] hover:shadow-[0_0_10px_rgba(200,200,200,0.2)]"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                                <textarea
                                    name="message"
                                    className="w-full p-3 rounded-lg bg-white/10 border border-transparent focus:border-purple-500 focus:outline-none text-white placeholder-gray-400 transition-all shadow-[0_0_10px_rgba(100,100,100,0.1)] hover:shadow-[0_0_10px_rgba(200,200,200,0.2)] min-h-[150px]"
                                    placeholder="Message"
                                    onChange={handleChange}
                                />

                                {notDone && <span className="text-red-500 text-sm">Please, fill all the input field</span>}
                                {done && <span className="text-green-500 text-sm">Thanks for contacting me! I will get back to you soon.</span>}

                                <Button
                                    type="submit"
                                    className="bg-[#623686] hover:bg-[#6d3e92] text-white font-bold py-2 px-8 rounded self-start transition-all duration-300 hover:scale-105"
                                    disabled={done}
                                >
                                    Send
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="text-center mt-20">
                        <h1 className="text-4xl font-bold mb-4">FIND ME ON</h1>
                        <p className="text-white mb-8">
                            Please don't hesitate to reach out to me and <span className="text-yellow-500">connect.</span>
                        </p>
                        <ul className="flex justify-center gap-8 list-none p-0 m-0">
                            <li className="inline-block">
                                <a href={userData.socialLinks.github || "https://github.com/soumyajit4419"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 bg-white rounded-full text-[#623686] text-xl hover:bg-[#623686] hover:text-white hover:shadow-[0_0_10px_#623686] transition-all duration-300">
                                    <AiFillGithub />
                                </a>
                            </li>
                            <li className="inline-block">
                                <a href={userData.socialLinks.twitter || "https://twitter.com/SoumyajitBehera"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 bg-white rounded-full text-[#623686] text-xl hover:bg-[#623686] hover:text-white hover:shadow-[0_0_10px_#623686] transition-all duration-300">
                                    <AiOutlineTwitter />
                                </a>
                            </li>
                            <li className="inline-block">
                                <a href={userData.socialLinks.linkedin || "https://www.linkedin.com/in/soumyajit4419/"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 bg-white rounded-full text-[#623686] text-xl hover:bg-[#623686] hover:text-white hover:shadow-[0_0_10px_#623686] transition-all duration-300">
                                    <FaLinkedinIn />
                                </a>
                            </li>
                            <li className="inline-block">
                                <a href="https://leetcode.com/soumyajit4419/" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-10 h-10 bg-white rounded-full text-[#623686] text-xl hover:bg-[#623686] hover:text-white hover:shadow-[0_0_10px_#623686] transition-all duration-300">
                                    <SiLeetcode />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
