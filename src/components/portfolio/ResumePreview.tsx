import React, { useRef } from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { ResumeMinimal } from './templates/resume/ResumeMinimal';
import { ResumeModern } from './templates/resume/ResumeModern';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumePreviewProps {
    userData: any;
    projects: any[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ userData, projects }) => {
    const resumeTemplateId = usePortfolioSelector(state => state.portfolio.resumeTemplateId);
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    const renderTemplate = () => {
        switch (resumeTemplateId) {
            case 'resume-minimal':
                return <ResumeMinimal userData={userData} projects={projects} />;
            case 'resume-modern':
                return <ResumeModern userData={userData} projects={projects} />;
            default:
                return <ResumeMinimal userData={userData} projects={projects} />;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-full bg-gray-100/50 p-8 sm:p-12">
            {/* Toolbar for Resume */}
            <div className="w-full max-w-[800px] flex justify-end mb-6 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white shadow-sm gap-2"
                    onClick={handlePrint}
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </Button>
            </div>

            {/* Resume Canvas */}
            <div
                className="w-full max-w-[800px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 overflow-y-auto"
                style={{ minHeight: '1131px' }}
            >
                <div ref={componentRef} className="w-full">
                    {renderTemplate()}
                </div>
            </div>

            <p className="text-gray-400 text-xs mt-8 uppercase tracking-widest font-medium">Standard A4 Preview</p>
        </div>
    );
};
