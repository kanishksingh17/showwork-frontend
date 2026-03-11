import React from 'react';
import { FaDumbbell } from 'react-icons/fa6';

interface AppStoreCardProps {
    appName: string;
    category: string;
    rating: string;
    downloads: string;
    loadTime: string;
    reviewsCount: string;
}

export const AppStoreCard: React.FC<AppStoreCardProps> = ({
    appName,
    category,
    rating,
    downloads,
    loadTime,
    reviewsCount
}) => {
    return (
        <div className="appstore-card">
            <div className="card-header">
                <div className="app-icon shadow-inner">
                    <FaDumbbell className="drop-shadow-lg text-white" size={24} />
                </div>
                <div className="card-app-info">
                    <div className="card-app-name">{appName}</div>
                    <div className="card-app-category">{category}</div>
                </div>
            </div>

            <div className="app-stats-row">
                <div className="app-stat">
                    <div className="app-stat-val">{rating}</div>
                    <div className="app-stat-key">Rating</div>
                </div>
                <div className="app-stat">
                    <div className="app-stat-val">{downloads}</div>
                    <div className="app-stat-key">Downloads</div>
                </div>
                <div className="app-stat">
                    <div className="app-stat-val">{loadTime}</div>
                    <div className="app-stat-key">Load Time</div>
                </div>
            </div>

            <div className="rating-row">
                <span className="stars">★★★★★</span>
                <span className="rating-num">{rating}</span>
                <span className="rating-count">· {reviewsCount}</span>
            </div>

            <button
                className="card-cta"
                onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                Start a Project
                <span className="arrow-circle">↗</span>
            </button>
        </div>
    );
};
