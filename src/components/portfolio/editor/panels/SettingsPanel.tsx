import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateUserData } from '@/store/portfolio/portfolioSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    const handleChange = (key: string, value: string) => {
        dispatch(updateUserData({ [key]: value }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-1">Portfolio Settings</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your personal information and portfolio metadata.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                        id="title"
                        value={userData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Full Stack Developer"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Brief description about yourself..."
                        rows={4}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="resumeUrl"
                            value={userData.resumeUrl || ''}
                            onChange={(e) => handleChange('resumeUrl', e.target.value)}
                            placeholder="https://example.com/resume.pdf"
                        />
                        <Button size="icon" variant="outline" onClick={() => window.open(userData.resumeUrl, '_blank')} disabled={!userData.resumeUrl}>
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
