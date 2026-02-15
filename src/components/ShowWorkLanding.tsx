import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CareerPathMap from "@/components/landing/CareerPathMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrbitingPlatforms } from "@/components/ui/orbiting-platforms";
import { ShowWorkTimeline } from "@/components/ui/showwork-timeline";
import DisplayCards from "@/components/ui/display-cards";
import { InView } from "@/components/ui/in-view";
import { BouncyCardsFeatures } from "@/components/ui/bouncy-cards-features";

import { OnboardingPreview } from "./OnboardingPreview";
import { UnifiedSidebar } from "@/components/UnifiedSidebar";
import PricingSection from "@/components/ui/pricing-section";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import HeroDoodleArrow from "@/components/landing/HeroDoodleArrow";

import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Code2,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  ChevronDown,
  PhoneCall,
  BarChart3,
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen,
  Circle,
} from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const ShowWorkLanding = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'landing' | 'onboarding'>('landing');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isSidebarJoined, setIsSidebarJoined] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const startBuildingRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleCTA = () => {
    setViewMode('onboarding');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarJoined(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const rotatingWords = useMemo(
    () => ["Professionally", "Stunningly", "Effortlessly", "Powerfully", "Instantly", "Beautifully"],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "ShowWork transformed how I showcase my projects. The AI content generation saves me hours every week.",
      name: "Sarah Chen",
      role: "Fullstack Developer",
      avatar: "https://images.pexels.com/photos/7652243/pexels-photo-7652243.jpeg",
    },
    {
      id: 2,
      quote: "Finally, a platform that understands indie hackers. My portfolio looks professional and drives real engagement.",
      name: "Marcus Rodriguez",
      role: "Indie Hacker",
      avatar: "https://images.pexels.com/photos/33530479/pexels-photo-33530479.jpeg",
    },
    {
      id: 3,
      quote: "The multi-platform posting feature is a game-changer. I reach my audience everywhere with one click.",
      name: "Alex Kim",
      role: "Creative Developer",
      avatar: "https://images.pexels.com/photos/7552373/pexels-photo-7552373.jpeg",
    },
  ];

  // Internal scroll handler for isScrolled state
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "h-screen bg-slate-100 dark:bg-slate-950 flex flex-row p-6 overflow-hidden transition-all duration-700",
      isSidebarJoined ? "gap-6" : "gap-0"
    )}>
      {/* Sidebar - Desktop Only with Delayed Join and Collapsible Logic */}
      {/* Sidebar - Desktop Only with Delayed Join and Collapsible Logic */}
      <div
        className={cn(
          "hidden lg:block h-full transition-all duration-700 ease-in-out overflow-hidden flex-shrink-0",
          !isSidebarJoined || viewMode === 'onboarding'
            ? "w-0 opacity-0 -translate-x-full pointer-events-none"
            : (isSidebarOpen ? "w-64 opacity-100 translate-x-0" : "w-16 opacity-100 translate-x-0")
        )}
      >
        <div className={cn("h-full transition-all duration-300", isSidebarOpen ? "w-64" : "w-16")}>
          <UnifiedSidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            showAuthButtons={true}
          />
        </div>
      </div>

      {/* Main Content Area - Refined Window Design with Internal Scroll */}
      <div className={cn(
        "flex-1 w-full min-w-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col relative transition-all duration-300 h-full",
        isSidebarJoined && isSidebarOpen && "transition-all duration-700"
      )}>
        {/* Grid Background - Landing Page Only */}
        {viewMode === 'landing' && (
          <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 dark:bg-slate-950 overflow-hidden pointer-events-none rounded-[2.5rem]">
            {/* Light Mode Grid */}
            <div
              className="absolute inset-0 block dark:hidden opacity-[0.6]"
              style={{
                backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
              }}
            />
            {/* Dark Mode Grid */}
            <div
              className="absolute inset-0 hidden dark:block opacity-[0.3]"
              style={{
                backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
              }}
            />
          </div>
        )}


        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar relative z-10">
          {viewMode === 'landing' ? (
            <>
              {/* Aurora Background - Moved inside the rounded container */}





              {/* Navigation with Scroll Animation - Sticky instead of Fixed */}
              <header className="sticky top-0 z-[55] w-full pt-4">
                <nav
                  data-state={isMenuOpen ? "active" : undefined}
                  className="w-full px-2 group"
                >
                  <div
                    className={cn(
                      "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
                      isScrolled &&
                      "bg-background/50 max-w-4xl rounded-2xl border lg:backdrop-blur-lg lg:px-5"
                    )}
                  >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                      <div className="flex w-full justify-between lg:w-auto">
                        <a
                          href="/"
                          aria-label="home"
                          className="flex items-center space-x-2"
                        >
                          <div className="flex items-center space-x-2 group hover:scale-105 transition-all duration-300">
                            <div className="w-8 h-8 logo-bg rounded-lg flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                              <Code2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-foreground group-hover:logo-text transition-colors duration-300">
                              ShowWork
                            </span>
                          </div>
                        </a>
                        <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                          className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                        >
                          <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                          <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                        </button>
                      </div>

                      {/* Desktop Navigation */}
                      <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                        <ul className="flex gap-8 text-sm">
                          <li>
                            <a
                              href="#features"
                              className="text-muted-foreground hover:text-accent-foreground block duration-150"
                            >
                              <span>Features</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#demo"
                              className="text-muted-foreground hover:text-accent-foreground block duration-150"
                            >
                              <span>Demo</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#pricing"
                              className="text-muted-foreground hover:text-accent-foreground block duration-150"
                            >
                              <span>Pricing</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#testimonials"
                              className="text-muted-foreground hover:text-accent-foreground block duration-150"
                            >
                              <span>Reviews</span>
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Desktop and Mobile CTA Buttons */}
                      <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                        {/* Mobile Menu Links */}
                        <div className="lg:hidden">
                          <ul className="space-y-6 text-base">
                            <li>
                              <a
                                href="#features"
                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                              >
                                <span>Features</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#demo"
                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                              >
                                <span>Demo</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#pricing"
                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                              >
                                <span>Pricing</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#testimonials"
                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                              >
                                <span>Reviews</span>
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              isScrolled && "lg:hidden",
                              "hover:bg-background hover:text-foreground hover:border-input hover:opacity-100 transition-all duration-200"
                            )}
                            onClick={() => navigate("/login")}
                          >
                            <span>Sign In</span>
                          </Button>
                          <Button
                            size="sm"
                            className={cn(isScrolled && "lg:hidden")}
                            onClick={() => navigate("/demo-showcase")}
                          >
                            <span>Get Started</span>
                          </Button>
                          <Button
                            size="sm"
                            className={cn(
                              isScrolled ? "lg:inline-flex" : "hidden"
                            )}
                            onClick={() => navigate("/demo-showcase")}
                          >
                            <span>Get Started</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header >

              {/* Hero Content Section - Mobile-First style from new design */}
              <div ref={heroRef} className="relative z-10 w-full flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: 'clamp(4rem, 8vh, 6rem)', paddingBottom: 'clamp(4rem, 15vh, 10rem)' }}>
                {/* Career Path Map - Background Layer */}
                {/* Career Path Map - Background Layer */}
                <CareerPathMap className="absolute -top-[55%] inset-x-0 z-0 opacity-70 saturate-200 scale-100 origin-top pointer-events-none" />
                <HeroDoodleArrow targetRef={startBuildingRef} containerRef={heroRef} />

                <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
                  <div className="text-center w-full mx-auto max-w-4xl" style={{ marginBottom: '2rem' }}>
                    <h1 className="font-black text-slate-900 dark:text-white tracking-tight text-center relative leading-[1.15]" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
                      {/* Floating Widgets */}


                      <span className="block mb-2">Showcase Your Work</span>
                      <span className="relative flex h-[1.2em] w-full justify-center overflow-hidden text-center text-blue-600 dark:text-blue-500">
                        {rotatingWords.map((word, index) => (
                          <motion.span
                            key={index}
                            className="absolute font-black whitespace-nowrap"
                            initial={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            animate={titleNumber === index ? { y: 0, opacity: 1 } : { y: titleNumber > index ? -120 : 120, opacity: 0 }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>
                      <span className="block mt-2">Like Never Before</span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Connect your GitHub, showcase your best work with stunning visuals, and land your dream job with a portfolio that makes an impact.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                      <Button
                        ref={startBuildingRef}
                        size="lg"
                        className="rounded-full px-10 h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate("/demo-showcase")}
                      >
                        Start Building
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-10 h-14 border-2 border-slate-200 dark:border-slate-800 text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                        onClick={() => navigate("/login")}
                      >
                        View Demo
                      </Button>
                    </div>


                  </div>
                </div>


              </div>

              {/* Comparison Section: "Success vs Struggle" */}
              <section className="py-12 relative z-10">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                      Talent is everywhere. <br className="hidden sm:block" />
                      <span className="text-blue-600">Visibility is not.</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Stop letting your best work go unnoticed. See the difference ShowWork makes.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Card 1: The Invisible Developer */}
                    <div className="group relative bg-[#fcfcfd] dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 overflow-hidden text-center md:text-left transition-all duration-300">
                      <div className="absolute top-6 right-8 opacity-20 pointer-events-none transform">
                        <AlertTriangle className="w-32 h-32 text-red-400 rotate-12" />
                      </div>
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef2f6] dark:bg-slate-700 text-[#64748b] dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-8">
                          WITHOUT SHOWWORK
                        </div>
                        <h3 className="text-3xl font-black text-slate-700 dark:text-slate-400 mb-2">The Invisible Developer</h3>
                        <p className="text-[#94a3b8] dark:text-slate-400 mb-10 text-lg">Great code, but no one sees it. Opportunities slip away.</p>

                        <div className="space-y-6">
                          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 opacity-60">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                              <div className="space-y-3">
                                <div className="h-2.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                <div className="h-2.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                              <span className="text-xs text-slate-400 font-medium">0 views</span>
                            </div>
                          </div>
                          <div className="space-y-3 pl-2">
                            <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                              <X className="w-4 h-4 text-slate-400" />
                              <span>Resume sent to the void</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                              <X className="w-4 h-4 text-slate-400" />
                              <span>Ghosted by recruiters</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: The 1% Developer */}
                    <div className="group relative bg-[#2563eb] text-white rounded-[2.5rem] p-10 overflow-hidden shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md border border-white/20">
                          WITH SHOWWORK
                        </div>
                        <h3 className="text-3xl font-black text-white mb-2">The 1% Developer</h3>
                        <p className="text-blue-100 mb-10 text-lg">Work that speaks for itself. Inbound opportunities daily.</p>

                        <div className="space-y-6">
                          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] border-2 border-white/50 shadow-inner"></div>
                                <div className="space-y-2">
                                  <div className="h-3 w-28 bg-white/30 rounded-full"></div>
                                  <div className="h-2 w-20 bg-white/20 rounded-full"></div>
                                </div>
                              </div>
                              <div className="text-[10px] font-black bg-[#22c55e] text-white px-2.5 py-1 rounded-full shadow-lg tracking-wider">OFFER RECEIVED</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-blue-50 italic leading-relaxed">
                              "Just saw your ShowWork profile. We need someone exactly like you. Can we chat?"
                            </div>
                          </div>
                          <div className="space-y-4 pl-2">
                            <div className="flex items-center gap-3 text-white text-sm font-semibold tracking-tight">
                              <Circle className="w-2.5 h-2.5 text-[#22c55e] fill-[#22c55e]" />
                              <span>Profile info viewed by LinkedIn, Google, Meta, GitHub</span>
                            </div>
                            <div className="flex items-center gap-3 text-white text-sm font-semibold tracking-tight">
                              <Circle className="w-2.5 h-2.5 text-[#22c55e] fill-[#22c55e]" />
                              <span>Skipped technical screening</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              < section id="features" className="pt-24 pb-16 bg-surface-elevated relative z-10" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10 animate-fade-in">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 animate-scale-in hover:scale-105 transition-transform duration-500">
                      Everything You Need to Shine
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <InView
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <div className="group bg-surface rounded-xl p-8 border border-card-border hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-12 h-12 logo-bg rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:logo-text transition-colors duration-300 relative z-10">
                          AI Content Generation
                        </h3>
                        <InView
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <p className="text-foreground-muted mb-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                            Generate compelling project descriptions, technical details, and
                            marketing copy with AI assistance.
                          </p>
                        </InView>

                        <motion.div
                          initial={false}
                          animate={{ height: expandedCard === 0 ? "auto" : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden relative z-10"
                        >
                          <div className="pt-4 space-y-3">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Automatically generate SEO-optimized descriptions</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Create technical documentation with one click</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Generate multiple variations for A/B testing</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Customize tone and style to match your brand</p>
                            </div>
                          </div>
                        </motion.div>

                        <Button
                          variant="ghost"
                          onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
                          className="text-primary hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold p-2 -ml-2 rounded-lg transition-all duration-300 relative z-10 mt-4 flex items-center gap-2 hover:scale-105"
                        >
                          {expandedCard === 0 ? "Show Less" : "Learn More"}
                          <motion.div
                            animate={{ rotate: expandedCard === 0 ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>
                    </InView>

                    <InView
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="group bg-surface rounded-xl p-8 border border-card-border hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-12 h-12 logo-bg rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:logo-text transition-colors duration-300 relative z-10">
                          Multi-Platform Publishing
                        </h3>
                        <InView
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <p className="text-foreground-muted mb-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                            Share your work across social media, job boards, and
                            professional networks with one click.
                          </p>
                        </InView>

                        <motion.div
                          initial={false}
                          animate={{ height: expandedCard === 1 ? "auto" : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden relative z-10"
                        >
                          <div className="pt-4 space-y-3">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Publish to LinkedIn, Twitter, Reddit, and Instagram simultaneously</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Schedule posts for optimal engagement times</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Track performance across all platforms in one dashboard</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Auto-format content for each platform's requirements</p>
                            </div>
                          </div>
                        </motion.div>

                        <Button
                          variant="ghost"
                          onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
                          className="text-primary hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold p-2 -ml-2 rounded-lg transition-all duration-300 relative z-10 mt-4 flex items-center gap-2 hover:scale-105"
                        >
                          {expandedCard === 1 ? "Show Less" : "Learn More"}
                          <motion.div
                            animate={{ rotate: expandedCard === 1 ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>
                    </InView>

                    <InView
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="group bg-surface rounded-xl p-8 border border-card-border hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-12 h-12 logo-bg rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:logo-text transition-colors duration-300 relative z-10">
                          Professional Templates
                        </h3>
                        <InView
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          <p className="text-foreground-muted mb-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                            Choose from dozens of stunning portfolio templates designed by
                            professionals for developers.
                          </p>
                        </InView>

                        <motion.div
                          initial={false}
                          animate={{ height: expandedCard === 2 ? "auto" : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden relative z-10"
                        >
                          <div className="pt-4 space-y-3">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Choose from 50+ professionally designed templates</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Fully customizable colors, fonts, and layouts</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Mobile-responsive design out of the box</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-foreground-muted">Preview before publishing with live preview mode</p>
                            </div>
                          </div>
                        </motion.div>

                        <Button
                          variant="ghost"
                          onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
                          className="text-primary hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold p-2 -ml-2 rounded-lg transition-all duration-300 relative z-10 mt-4 flex items-center gap-2 hover:scale-105"
                        >
                          {expandedCard === 2 ? "Show Less" : "Learn More"}
                          <motion.div
                            animate={{ rotate: expandedCard === 2 ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>
                    </InView>
                  </div>
                </div>
              </section >



              <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                  <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                      The Human Side of Code
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                      Commits are for machines. <br />
                      <span className="text-blue-600">ShowWork is for your story.</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                      Don't let your work be defined just by green squares. Show the discussions, the decisions, and the community impact.
                    </p>
                  </div>

                  <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500/20 via-blue-500 to-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.8),0_0_40px_rgba(59,130,246,0.4)] hidden sm:block"></div>

                    <div className="space-y-8 relative">
                      {/* Item 1: LinkedIn */}
                      <div className="relative pl-0 sm:pl-24 group">
                        {/* Timeline Node */}
                        <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center z-10 hidden sm:flex">
                          <Linkedin className="w-4 h-4 text-[#0077b5]" />
                        </div>

                        {/* Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                              <span className="bg-[#0077b5] text-white p-1 rounded-md sm:hidden">
                                <Linkedin className="w-3 h-3" />
                              </span>
                              <span>Posted on LinkedIn: 'The Future of Frontend'</span>
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              View Post
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                            Just shared my thoughts on the new React server components. It's a paradigm shift that we all need to prepare for. Read the full article on my blog...
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2 overflow-hidden">
                              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://ui-avatars.com/api/?name=Alex&background=random" alt="Avatar" />
                              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://ui-avatars.com/api/?name=Sarah&background=random" alt="Avatar" />
                              <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://ui-avatars.com/api/?name=Mike&background=random" alt="Avatar" />
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500">Latest Activity: 2 hours ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Item 2: Reddit */}
                      <div className="relative pl-0 sm:pl-24 group">
                        <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center z-10 hidden sm:flex">
                          <div className="w-4 h-4 text-[#FF4500] font-bold flex items-center justify-center">r/</div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                              <span className="bg-[#FF4500] text-white p-1 rounded-md sm:hidden text-[10px] font-bold">r/</span>
                              <span>Reddit discussion in r/reactjs</span>
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              Join Thread
                            </span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-400 italic mb-4 border border-slate-100 dark:border-slate-800">
                            "I personally stick with Zustand for 90% of my projects. It's lightweight and just works without the boilerplate..."
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                            <span>Latest Activity: Yesterday at 4:30pm</span>
                          </div>
                        </div>
                      </div>

                      {/* Item 3: Discord */}
                      <div className="relative pl-0 sm:pl-24 group">
                        <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center z-10 hidden sm:flex">
                          <svg className="w-4 h-4 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                          </svg>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                              <span className="bg-[#5865F2] text-white p-1 rounded-md sm:hidden">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
                              </span>
                              <span>Discord conversation in #showwork-community</span>
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              Go to Discord
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                            Hey Sarah! I took a look at your portfolio. The typography choices are excellent, but you might want to increase the contrast on the dark mode toggle.
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <img className="h-5 w-5 rounded-full" src="https://ui-avatars.com/api/?name=Designer&background=random" alt="Avatar" />
                            <span>Latest Activity: Jan 18, 2026 at 1:30pm</span>
                          </div>
                        </div>
                      </div>

                      {/* Item 4: Git PR */}
                      <div className="relative pl-0 sm:pl-24 group">
                        <div className="absolute left-4 top-6 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center z-10 hidden sm:flex">
                          <Github className="w-4 h-4 text-slate-700 dark:text-white" />
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                              <span className="bg-slate-800 dark:bg-slate-700 text-white p-1 rounded-md sm:hidden">
                                <Github className="w-3 h-3" />
                              </span>
                              <span>Pull Request #57 on showwork-frontend</span>
                            </div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                              View PR
                            </span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-600 dark:text-slate-400 mb-4 whitespace-nowrap overflow-x-auto">
                            feat: Implement new user profile timeline view with responsive...
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <img className="h-5 w-5 rounded-full" src="https://ui-avatars.com/api/?name=Dev&background=random" alt="Avatar" />
                            <span>Latest Activity: Jan 17, 2026 at 9:02am</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Orbit + Journey Section */}
              <section id="journey" className="pt-24 pb-20 scroll-mt-32 relative z-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="relative z-0">
                      <OrbitingPlatforms />
                      <div className="mt-12 hidden lg:block">
                        <DisplayCards />
                      </div>
                      <div className="mt-24">
                        <BouncyCardsFeatures />
                      </div>
                    </div>
                    <div className="relative z-0 pt-8 lg:pt-0">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Your ShowWork Journey</h3>
                      <ShowWorkTimeline containerRef={scrollContainerRef} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Demo Section */}
              < section id="demo" className="pt-10 pb-20" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                      See ShowWork in Action
                    </h2>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-8">
                      Watch how easy it is to create stunning portfolios that get you
                      noticed by employers and clients.
                    </p>
                    <Button
                      size="lg"
                      className="logo-bg shadow-lg text-white hover:opacity-90"
                      onClick={() => navigate("/showcase")}
                    >
                      Get Started Free
                    </Button>
                  </div>
                  {/* Demo image box removed as requested */}
                </div>
              </section >

              {/* Pricing Section */}
              < PricingSection />

              {/* Testimonials Section */}
              < section id="testimonials" className="pt-10 pb-20 bg-surface-elevated" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                      Loved by Developers Worldwide
                    </h2>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                      Join thousands of developers who've transformed their careers with
                      ShowWork.
                    </p>
                  </div>

                  <div className="max-w-7xl mx-auto">
                    <StaggerTestimonials />
                  </div>
                </div>
              </section >

              {/* CTA Section */}
              < section className="py-20" >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                    Ready to Showcase Your Work?
                  </h2>
                  <p className="text-xl text-foreground-muted mb-8">
                    Join thousands of developers building impressive portfolios with
                    ShowWork.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-4">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-xl px-10 h-14 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
                      onClick={() => navigate("/showcase")}
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-sm text-foreground-muted">
                    No credit card required. Start building in minutes.
                  </p>
                </div>
              </section >
              {/* Footer */}
              < footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 dark:from-blue-950 dark:via-blue-900 dark:to-slate-950 text-white py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Newsletter */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
                      <div className="mb-4 space-y-3">
                        <Button
                          className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 h-11"
                          onClick={() => navigate("/login")}
                        >
                          Join the Community
                        </Button>
                      </div>
                      <p className="text-sm text-white/80">
                        Get the latest updates and portfolio tips.
                      </p>
                    </div>

                    {/* Product Links */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Features
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Templates
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Pricing
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Integrations
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          API
                        </a>
                      </div>
                    </div>

                    {/* Company Links */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          About
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Blog
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Careers
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Contact
                        </a>
                        <a
                          href="#"
                          className="block text-white/80 hover:text-white transition-colors"
                        >
                          Help
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                      <div className="w-8 h-8 logo-bg rounded-lg flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white">ShowWork</span>
                    </div>

                    <div className="flex items-center space-x-6">
                      <a
                        href="#"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-8 mt-8 text-center">
                    <p className="text-white/80">
                      © 2025 ShowWork All Rights Reserved
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                      <a
                        href="#"
                        className="text-white/80 hover:text-white text-sm transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white text-sm transition-colors"
                      >
                        Terms of Service
                      </a>
                      <a
                        href="#"
                        className="text-white/80 hover:text-white text-sm transition-colors"
                      >
                        Cookie Policy
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <OnboardingPreview onBack={() => setViewMode('landing')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowWorkLanding;
