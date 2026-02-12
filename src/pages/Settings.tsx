import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  Settings as SettingsIcon,
  Shield,
  Link2,
  BarChart3,
  Share2,
  Lock,
  Globe,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Check,
} from "lucide-react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("privacy");
  const [privacyMode, setPrivacyMode] = useState("public");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [updateFrequency, setUpdateFrequency] = useState("daily");
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [portfolioSlug, setPortfolioSlug] = useState("username");
  const [copied, setCopied] = useState(false);

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText(`https://showwork.in/${portfolioSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "privacy", label: "Privacy & Visibility", icon: Shield },
    { id: "portfolio", label: "Portfolio Management", icon: Link2 },
    { id: "usage", label: "Usage & Limits", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Share2 },
  ];

  return (
    <UnifiedLayout activePage="settings">
      <div className="flex-1 flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className="col-span-3">
              <Card className="sticky top-6">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
                      >
                        <section.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Settings Panel */}
            <div className="col-span-9 space-y-6">
              {/* Privacy & Visibility */}
              {activeSection === "privacy" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Privacy Mode
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Profile Visibility
                        </label>
                        <select
                          value={privacyMode}
                          onChange={(e) => setPrivacyMode(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-primary"
                        >
                          <option value="public">Public - Anyone can view</option>
                          <option value="unlisted">Unlisted - Only with link</option>
                          <option value="private">Private - Only you</option>
                        </select>
                        <p className="text-sm text-muted-foreground mt-2">
                          {privacyMode === "public" && "Your portfolio is visible to everyone"}
                          {privacyMode === "unlisted" && "Only people with the link can view your portfolio"}
                          {privacyMode === "private" && "Only you can access your portfolio"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-border">
                        <div>
                          <div className="font-medium text-foreground">Show Activity Status</div>
                          <div className="text-sm text-muted-foreground">Display when you're online</div>
                        </div>
                        <button className="w-12 h-6 bg-primary rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-border">
                        <div>
                          <div className="font-medium text-foreground">Search Engine Indexing</div>
                          <div className="text-sm text-muted-foreground">Allow search engines to find your portfolio</div>
                        </div>
                        <button className="w-12 h-6 bg-muted rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Content Sharing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-medium text-foreground">Allow Public Sharing</div>
                          <div className="text-sm text-muted-foreground">Enable sharing links for projects</div>
                        </div>
                        <button className="w-12 h-6 bg-primary rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-3 border-t border-border">
                        <div>
                          <div className="font-medium text-foreground">Download Permissions</div>
                          <div className="text-sm text-muted-foreground">Allow visitors to download your content</div>
                        </div>
                        <button className="w-12 h-6 bg-muted rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Portfolio Management */}
              {activeSection === "portfolio" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Link2 className="w-5 h-5" />
                        Portfolio Link
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Custom URL
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex items-center bg-input border border-border rounded-lg px-4 py-2">
                            <span className="text-muted-foreground mr-1">showwork.in/</span>
                            <input
                              type="text"
                              value={portfolioSlug}
                              onChange={(e) => setPortfolioSlug(e.target.value)}
                              className="flex-1 bg-transparent text-foreground outline-none"
                              placeholder="username"
                            />
                          </div>
                          <Button onClick={copyPortfolioLink} variant="outline">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          This is your public portfolio URL
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Auto Portfolio Update
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-medium text-foreground">Enable Auto-Update</div>
                          <div className="text-sm text-muted-foreground">Automatically sync portfolio with your projects</div>
                        </div>
                        <button
                          onClick={() => setAutoUpdate(!autoUpdate)}
                          className={`w-12 h-6 rounded-full relative ${autoUpdate ? "bg-primary" : "bg-muted"
                            }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${autoUpdate ? "right-0.5" : "left-0.5"
                            }`}></div>
                        </button>
                      </div>

                      {autoUpdate && (
                        <div className="space-y-3 pt-3 border-t border-border">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                              Update Frequency
                            </label>
                            <select
                              value={updateFrequency}
                              onChange={(e) => setUpdateFrequency(e.target.value)}
                              className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:ring-2 focus:ring-primary"
                            >
                              <option value="realtime">Real-time (on every change)</option>
                              <option value="daily">Daily at 12:00 AM</option>
                              <option value="weekly">Weekly on Monday</option>
                              <option value="manual">Manual only</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between py-2">
                            <div>
                              <div className="font-medium text-foreground text-sm">Sync with GitHub</div>
                              <div className="text-xs text-muted-foreground">Auto-update when you push commits</div>
                            </div>
                            <button className="w-12 h-6 bg-primary rounded-full relative">
                              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Usage & Limits */}
              {activeSection === "usage" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Usage Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Projects</span>
                        <span className="text-sm text-muted-foreground">12 / 100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "12%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Storage</span>
                        <span className="text-sm text-muted-foreground">2.4 GB / 10 GB</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "24%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">API Calls (This Month)</span>
                        <span className="text-sm text-muted-foreground">3,245 / 10,000</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button variant="outline" className="w-full">
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Integrations */}
              {activeSection === "integrations" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Connected Accounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Github className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">GitHub</div>
                          <div className="text-sm text-muted-foreground">
                            {githubConnected ? "Connected" : "Not connected"}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => setGithubConnected(!githubConnected)}
                        variant={githubConnected ? "outline" : "default"}
                      >
                        {githubConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">LinkedIn</div>
                          <div className="text-sm text-muted-foreground">
                            {linkedinConnected ? "Connected" : "Not connected"}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => setLinkedinConnected(!linkedinConnected)}
                        variant={linkedinConnected ? "outline" : "default"}
                      >
                        {linkedinConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Twitter className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Twitter / X</div>
                          <div className="text-sm text-muted-foreground">Not connected</div>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}
