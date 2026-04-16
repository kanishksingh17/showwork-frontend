import React from 'react';
import { AppStoreCard } from './AppStoreCard';
import { Navbar } from './Navbar';

interface HeroProps {
    name?: string;
    mobileData?: any;
}

export const Hero: React.FC<HeroProps> = ({ name, mobileData = {} }) => {
    return (
        <section className="hero-section">
            {/* Atmosphere layers */}
            <div className="hero-bands">
                <div className="band" /><div className="band" /><div className="band" />
                <div className="band" /><div className="band" /><div className="band" />
                <div className="band" /><div className="band" /><div className="band" />
            </div>
            <div className="hero-glow" />
            <div className="hero-glow-2" />

            {/* Navigation */}
            <Navbar name={name} />

            {/* Hero upper */}
            <div className="hero-body">
                <span className="available-badge">
                    <span className="badge-dot" />
                    {mobileData.availableText || "Available for new projects"}
                </span>

                <h1 className="hero-headline">
                    {mobileData.headline?.split('.').map((part: string, i: number) => (
                        <React.Fragment key={i}>
                            {part}{part && '.'}<br />
                        </React.Fragment>
                    )) || <>Mobile Apps.<br />Built to Ship.</>}
                </h1>

                {/* Side info */}
                <div className="hero-side-info hidden md:flex">
                    <div>
                        <div className="side-col-label">Platforms</div>
                        <div className="side-col-links">
                            <a href="#apps">iOS / Swift</a>
                            <a href="#apps">Android / Kotlin</a>
                            <a href="#apps">Flutter</a>
                        </div>
                    </div>
                    <div>
                        <div className="side-col-label">Portfolio</div>
                        <div className="side-col-text">
                            12 apps shipped<br />@2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Statement strip marquee */}
            <div className="hero-statement-strip">
                <div className="strip-marquee">
                    <span className="strip-word">Performance</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">is</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">the</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">foundation</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">of</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">user experience</span>
                    <span className="strip-divider">&emsp;&emsp;</span>
                    <span className="strip-word">Code</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">is</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">the</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">engine</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">of</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">digital products</span>
                    <span className="strip-divider">&emsp;&emsp;</span>
                    {/* duplicate for loop */}
                    <span className="strip-word">Performance</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">is</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">the</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">foundation</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">of</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">user experience</span>
                    <span className="strip-divider">&emsp;&emsp;</span>
                    <span className="strip-word">Code</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">is</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">the</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">engine</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">of</span>
                    <span className="strip-divider">·</span>
                    <span className="strip-word">digital products</span>
                    <span className="strip-divider">&emsp;&emsp;</span>
                </div>
            </div>

            {/* Hero lower — body text + App Store card */}
            <div className="hero-lower grid-cols-1 md:grid-cols-2 lg:flex justify-between w-full">
                <p className="hero-body-text pb-8 md:pb-0">
                    {mobileData.bio || "I engineer cross-platform mobile applications that users actually keep. With 9 years building for iOS and Android, I specialize in performance optimization, scalable architecture, and pixel-perfect UI implementation that converts installs into loyal users."}
                </p>

                {/* App Store Preview Card */}
                <AppStoreCard
                    appName={mobileData.appStoreName || "TrackFlow — Fitness"}
                    category={mobileData.appStoreCategory || "Health & Fitness · Latest App"}
                    rating={mobileData.appStoreRating || "4.9"}
                    downloads={mobileData.appStoreDownloads || "2.1M"}
                    loadTime={mobileData.appStoreLoadTime || "<2s"}
                    reviewsCount={mobileData.appStoreReviews || "18,400 reviews"}
                />
            </div>

            {/* Scroll row */}
            <div className="hero-scroll-row hidden md:flex">
                <div className="scroll-dot">↓</div>
                <span className="scroll-label">// Mobile Engineering</span>
                <span className="scroll-label">Scroll to Explore</span>
            </div>
        </section>
    );
};
