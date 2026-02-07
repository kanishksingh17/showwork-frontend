import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AiOutlineDownload } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export interface ResumeOrganismProps {
    variant?: 'Resume01' | 'ResumeMain';
    className?: string;
}

export const ResumeOrganism: React.FC<ResumeOrganismProps> = ({
    variant = 'Resume01',
    className,
}) => {
    const [width, setWidth] = useState(1200);
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const resumeLink = "https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Soumyajit_Behera-BIT_MESRA.pdf"; // Default fallback

    // ResumeMain - Exact replica of portfolio-main Resume page
    if (variant === 'ResumeMain') {
        return (
            <div className={`min-h-screen pt-32 pb-16 bg-gradient-to-b from-[#1b1a2ea9] to-[#121123] text-white ${className || ''}`}>
                <div className="container mx-auto px-4 relative z-10">

                    {/* Particle effect placeholder */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/projects-bg.png')] bg-cover bg-center" />

                    {/* Top Download Button */}
                    <div className="flex justify-center mb-12 relative z-20">
                        <Button
                            asChild
                            className="bg-[#623686] hover:bg-[#6d3e92] text-white font-bold py-2 px-8 rounded flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        >
                            <a href={userData.resumeUrl || resumeLink} target="_blank" rel="noopener noreferrer">
                                <AiOutlineDownload />
                                &nbsp;Download CV
                            </a>
                        </Button>
                    </div>

                    {/* PDF Viewer */}
                    <div className="flex justify-center mb-12 relative z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <Document file={userData.resumeUrl || resumeLink} className="d-flex justify-content-center">
                            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} renderTextLayer={false} renderAnnotationLayer={false} />
                        </Document>
                    </div>

                    {/* Bottom Download Button */}
                    <div className="flex justify-center relative z-20">
                        <Button
                            asChild
                            className="bg-[#623686] hover:bg-[#6d3e92] text-white font-bold py-2 px-8 rounded flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        >
                            <a href={userData.resumeUrl || resumeLink} target="_blank" rel="noopener noreferrer">
                                <AiOutlineDownload />
                                &nbsp;Download CV
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return null;
};
