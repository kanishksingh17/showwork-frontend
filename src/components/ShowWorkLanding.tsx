import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrbitingPlatforms } from "@/components/ui/orbiting-platforms";
import { ShowWorkTimeline } from "@/components/ui/showwork-timeline";
import DisplayCards from "@/components/ui/display-cards";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { InView } from "@/components/ui/in-view";
import { BouncyCardsFeatures } from "@/components/ui/bouncy-cards-features";
import PricingSection from "@/components/ui/pricing-section";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
  MoveRight,
  PhoneCall,
} from "lucide-react";

// Import portfolio images - temporarily commented out due to missing assets
// import portfolioWebApp from '@/assets/portfolio-web-app.jpg';
// import portfolioMobileApp from '@/assets/portfolio-mobile-app.jpg';
// import portfolioEcommerce from '@/assets/portfolio-ecommerce.jpg';
// import demoWorkspace from '@/assets/demo-workspace.jpg';

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [titleNumber, setTitleNumber] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Scroll handler for navigation animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "ShowWork transformed how I showcase my projects. The AI content generation saves me hours every week.",
      name: "Sarah Chen",
      role: "Fullstack Developer",
      avatar:
        "https://images.pexels.com/photos/7652243/pexels-photo-7652243.jpeg",
    },
    {
      id: 2,
      quote:
        "Finally, a platform that understands indie hackers. My portfolio looks professional and drives real engagement.",
      name: "Marcus Rodriguez",
      role: "Indie Hacker",
      avatar:
        "https://images.pexels.com/photos/33530479/pexels-photo-33530479.jpeg",
    },
    {
      id: 3,
      quote:
        "The multi-platform posting feature is a game-changer. I reach my audience everywhere with one click.",
      name: "Alex Kim",
      role: "Creative Developer",
      avatar:
        "https://images.pexels.com/photos/7552373/pexels-photo-7552373.jpeg",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Beta Launch Banner */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-blue-600">
        <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
          <p className="font-medium">
            We're launching for beta developer users!{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold underline duration-150 hover:text-blue-100 inline-flex items-center gap-x-1 bg-transparent border-0 cursor-pointer text-white p-0"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </p>
        </div>
      </div>

      {/* Aurora Background - Optimized for performance */}
      <AuroraBackground
        showRadialGradient={false}
        className="fixed inset-0 -z-10 h-screen w-full"
      >
        <div></div>
      </AuroraBackground>

      {/* Navigation with Scroll Animation */}
      <header>
        <nav
          data-state={isMenuOpen ? "active" : undefined}
          className="fixed z-20 w-full px-2 group top-[60px]"
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
                    onClick={() => navigate("/login")}
                  >
                    <span>Get Started</span>
                  </Button>
                  <Button
                    size="sm"
                    className={cn(
                      isScrolled ? "lg:inline-flex" : "hidden"
                    )}
                    onClick={() => navigate("/login")}
                  >
                    <span>Get Started</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Content Wrapper (relative positioning) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          <div className="text-center mb-16 w-full max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white tracking-tighter">
              <span>
                Showcase Your Work
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {rotatingWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold text-blue-600 dark:text-blue-400"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              &nbsp;Like Never Before
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Turn your projects into compelling portfolios with AI-powered
              content generation and seamless multi-platform publishing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 shadow-lg text-lg px-8 py-4 hover:scale-110 hover:shadow-2xl transform transition-all duration-300 text-white"
                onClick={() => navigate("/login")}
              >
                Start Building Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="relative z-20 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white text-lg px-8 py-4 transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="pt-24 pb-16 bg-surface-elevated relative z-10">
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
      </section>



      {/* Orbit + Journey Timeline side-by-side */}
      <section className="pt-48 pb-20 mt-24 scroll-mt-32 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="p-0 relative z-0">
              <OrbitingPlatforms />
              <div className="mt-10">
                <DisplayCards />
              </div>
              <div className="mt-24">
                <BouncyCardsFeatures />
              </div>
            </div>
            <div className="p-0 relative z-0">
              <h3 className="text-2xl font-bold text-foreground mb-6">Your ShowWork Journey</h3>
              <ShowWorkTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="pt-10 pb-20">
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
              onClick={() => navigate("/login")}
            >
              Watch Full Demo
            </Button>
          </div>
          {/* Demo image box removed as requested */}
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="pt-10 pb-20 bg-surface-elevated">
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
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-xl text-foreground-muted mb-8">
            Join thousands of developers building impressive portfolios with
            ShowWork.
          </p>

          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get Started Free
            </Button>
          </form>

          <p className="text-sm text-foreground-muted">
            No credit card required. Start building in minutes.
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 dark:from-blue-950 dark:via-blue-900 dark:to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
              <form onSubmit={handleEmailSubmit} className="mb-4">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/30 transition-all"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-all duration-200 hover:shadow-lg"
                >
                  Subscribe
                </Button>
              </form>
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
    </div>
  );
};

export default ShowWorkLanding;
