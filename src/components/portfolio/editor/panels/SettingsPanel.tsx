import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateUserData, syncLinkedInProfile } from '@/store/portfolio/portfolioSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const SettingsPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const userData = usePortfolioSelector(state => state.portfolio.userData);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSyncLinkedIn = async () => {
        setIsSyncing(true);
        try {
            await dispatch(syncLinkedInProfile()).unwrap();
            toast.success("LinkedIn profile synced successfully!");
        } catch (error) {
            toast.error("Failed to sync LinkedIn profile. Ensure it's connected in Integrations.");
        } finally {
            setIsSyncing(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        dispatch(updateUserData({ [key]: value }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-1">Portfolio Settings</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your personal information and portfolio metadata.</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">Import from LinkedIn</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                                Pull your name, professional headline, and summary directly into your portfolio.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 h-8 text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
                                onClick={handleSyncLinkedIn}
                                disabled={isSyncing}
                            >
                                {isSyncing ? (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                                        Syncing...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-3 h-3 mr-2" />
                                        Sync Now
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
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
