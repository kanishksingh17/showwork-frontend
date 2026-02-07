import React, { useState } from "react";
import { ToneSelector, type ToneType } from "./ToneSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, User, ArrowRight, Wand2, Quote } from "lucide-react";

export function ContentTemplatesAI() {
    const [selectedTone, setSelectedTone] = useState<ToneType>("casual");
    const [referenceUrl, setReferenceUrl] = useState("");
    const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);

    const personalities = [
        { id: "elon", name: "Elon Musk", role: "Tech Visionary", style: "Short, cryptic, bold, memes.", avatar: "🚀" },
        { id: "trump", name: "Donald Trump", role: "Political Figure", style: "Assertive, repetitive, capitalized words.", avatar: "🇺🇸" },
        { id: "sam", name: "Sam Altman", role: "AI Pioneer", style: "Thoughtful, futuristic, understated.", avatar: "🤖" },
        { id: "steve", name: "Steve Jobs", role: "Innovator", style: "Minimalist, inspiring, visionary.", avatar: "🍏" },
    ];

    const templates = [
        { title: "Viral Thread", description: "A multi-tweet structure designed to maximize engagement and reach.", icon: Sparkles, color: "text-yellow-500", bg: "bg-yellow-50" },
        { title: "Project Showcase", description: "Highlight your latest work with a structured, visual-heavy post.", icon: Wand2, color: "text-purple-500", bg: "bg-purple-50" },
        { title: "Learning Insight", description: "Share a key takeaway or lesson learned from a recent experience.", icon: User, iconName: "Brain", color: "text-blue-500", bg: "bg-blue-50" }, // specific icon handling
        { title: "Industry Hot Take", description: "Share a bold opinion on a trending topic in your industry.", icon: Quote, color: "text-red-500", bg: "bg-red-50" },
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Content Templates (AI Powered)</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Choose a vibe, mimic a personality, or replicate a style to generate human-like posts in seconds.
                </p>
            </div>

            {/* 1. Tone Selector */}
            <section className="space-y-4">
                <ToneSelector selected={selectedTone} onSelect={setSelectedTone} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. Famous Personalities */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Mimic Personality</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {personalities.map((person) => (
                            <div
                                key={person.id}
                                onClick={() => setSelectedPersonality(person.id)}
                                className={`
                    cursor-pointer relative overflow-hidden rounded-xl border p-4 transition-all duration-200
                    ${selectedPersonality === person.id
                                        ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500"
                                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"}
                  `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">{person.avatar}</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{person.name}</h4>
                                        <p className="text-xs text-gray-500 font-medium">{person.role}</p>
                                        <p className="text-xs text-gray-400 mt-1 italic">"{person.style}"</p>
                                    </div>
                                </div>
                                {selectedPersonality === person.id && (
                                    <div className="absolute top-2 right-2 text-blue-500">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Reference Content */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Reference Content</h3>
                    <Card className="border-dashed border-2 bg-gray-50/50">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Copy Style from URL or Post</label>
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
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-gray-50 px-2 text-muted-foreground">Or</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-dashed">
                                <Copy className="w-4 h-4 mr-2" />
                                Select from Previous Posts
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* 4. Recommended Templates */}
            <section className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Recommended Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {templates.map((template, index) => (
                        <Card key={index} className="group hover:shadow-md transition-all cursor-pointer border-gray-200 hover:border-blue-200">
                            <CardContent className="p-6 space-y-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${template.bg} ${template.color} group-hover:scale-110 transition-transform`}>
                                    <template.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{template.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                                </div>
                                <div className="pt-2">
                                    <span className="text-xs font-medium text-blue-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        Use Template <ArrowRight className="w-3 h-3 ml-1" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
