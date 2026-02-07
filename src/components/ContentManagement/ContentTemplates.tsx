import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Search, Twitter, Linkedin, Instagram, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SocialProfile {
    id: string;
    name: string;
    handle: string;
    platform: 'twitter' | 'linkedin' | 'instagram';
    role: string;
    style: string;
    avatar: string;
    verified?: boolean;
}

export function ContentTemplatesAI() {

    const [referenceUrl, setReferenceUrl] = useState("");
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activePlatform, setActivePlatform] = useState<string>("all");

    // Realistic Mock Data
    const initialProfiles: SocialProfile[] = [
        {
            id: "elon",
            name: "Elon Musk",
            handle: "@elonmusk",
            platform: "twitter",
            role: "Tech Visionary",
            style: "Short, cryptic, bold, memes.",
            avatar: "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
            verified: true
        },
        {
            id: "sam",
            name: "Sam Altman",
            handle: "@sama",
            platform: "twitter",
            role: "AI Pioneer",
            style: "Thoughtful, futuristic, understated.",
            avatar: "https://pbs.twimg.com/profile_images/1633247750010830848/8aod3lqg_400x400.jpg",
            verified: true
        },
        {
            id: "paulg",
            name: "Paul Graham",
            handle: "@paulg",
            platform: "twitter",
            role: "Venture Capitalist",
            style: "Insightful, essay-style, analytical.",
            avatar: "https://pbs.twimg.com/profile_images/1824007423363674112/du3t16t6_400x400.jpg",
            verified: true
        },
        {
            id: "satya",
            name: "Satya Nadella",
            handle: "satyanadella",
            platform: "linkedin",
            role: "CEO of Microsoft",
            style: "Professional, empathetic, visionary.",
            avatar: "https://media.licdn.com/dms/image/v2/D4X03AQF4uZV040n9Gg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728328701981?e=1744243200&v=beta&t=7yKJOyX-zM6l_yR_yK_yK_yK_yK", // Placeholder
            verified: true
        },
        {
            id: "garyvee",
            name: "Gary Vaynerchuk",
            handle: "@garyvee",
            platform: "instagram",
            role: "Entrepreneur",
            style: "High energy, motivational, raw.",
            avatar: "https://pbs.twimg.com/profile_images/1874558276709085184/0d0P3x3s_400x400.jpg",
            verified: true
        }
    ];

    const filteredProfiles = initialProfiles.filter(profile => {
        const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.handle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlatform = activePlatform === "all" || profile.platform === activePlatform;
        return matchesSearch && matchesPlatform;
    });

    const PlatformIcon = ({ platform }: { platform: string }) => {
        switch (platform) {
            case 'twitter': return <Twitter className="w-3 h-3 text-sky-500" />;
            case 'linkedin': return <Linkedin className="w-3 h-3 text-blue-700" />;
            case 'instagram': return <Instagram className="w-3 h-3 text-pink-600" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 max-w-full pb-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Content Templates</h2>
                <p className="text-gray-500 max-w-2xl">
                    Choose a vibe, mimic a personality, or replicate a style to generate human-like posts in seconds.
                </p>
            </div>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. Mimic Personality / Search */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Mimic Profile</h3>
                        <Tabs defaultValue="all" className="w-auto" onValueChange={setActivePlatform}>
                            <TabsList className="h-8">
                                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                                <TabsTrigger value="twitter" className="text-xs">Twitter</TabsTrigger>
                                <TabsTrigger value="linkedin" className="text-xs">LinkedIn</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or handle..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredProfiles.length > 0 ? (
                            filteredProfiles.map((person) => (
                                <div
                                    key={person.id}
                                    onClick={() => setSelectedProfileId(person.id)}
                                    className={`
                                        cursor-pointer relative rounded-xl border p-3 transition-all duration-200 flex items-center gap-4
                                        ${selectedProfileId === person.id
                                            ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500"
                                            : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"}
                                    `}
                                >
                                    <div className="relative">
                                        <img
                                            src={person.avatar}
                                            alt={person.name}
                                            className="w-12 h-12 rounded-full object-cover border border-gray-100"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${person.name}&background=random`;
                                            }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                            <PlatformIcon platform={person.platform} />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{person.name}</h4>
                                            {person.verified && <Check className="w-3 h-3 text-blue-500 bg-blue-100 rounded-full p-0.5" />}
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium truncate">{person.handle}</p>
                                        <p className="text-xs text-gray-400 mt-1 italic line-clamp-1">"{person.style}"</p>
                                    </div>

                                    {selectedProfileId === person.id && (
                                        <div className="text-blue-500">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No profiles found. Try a different search.
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. Reference Content */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Reference Content</h3>
                    <Card className="border-dashed border-2 bg-gray-50/50 h-full max-h-[480px]">
                        <CardContent className="p-6 space-y-6 flex flex-col justify-center h-full">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Analyze Style from URL</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Paste a Tweet or LinkedIn post URL..."
                                        value={referenceUrl}
                                        onChange={(e) => setReferenceUrl(e.target.value)}
                                        className="bg-white"
                                    />
                                    <Button variant="secondary">
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Paste a link to a post to automatically extract and mimic its style, tone, and structure.
                                </p>
                            </div>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-gray-50 px-2 text-gray-400">Or use your own content</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full border-dashed py-6 hover:bg-white hover:border-blue-300 transition-colors">
                                <Copy className="w-4 h-4 mr-2" />
                                Select from Your Previous Posts
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
