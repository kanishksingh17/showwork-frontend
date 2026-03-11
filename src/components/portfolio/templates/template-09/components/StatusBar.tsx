import React, { useState, useEffect } from 'react';

export const StatusBar: React.FC = () => {
    const [throughput, setThroughput] = useState(2412093);

    useEffect(() => {
        const interval = setInterval(() => {
            setThroughput((prev) => {
                let next = prev + Math.floor((Math.random() - 0.4) * 5000);
                return Math.max(2300000, Math.min(2600000, next));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="status-bar hidden md:flex">
            <div className="status-item">
                <div className="status-dot"></div>
                ALL SYSTEMS OPERATIONAL
            </div>

            <div className="status-item">
                <div className="status-dot bg-[#F5720A] shadow-[0_0_6px_#F5720A] animate-none"></div>
                KAFKA LAG: 0ms
            </div>

            <div className="status-item">
                THROUGHPUT: {throughput.toLocaleString()} events/s
            </div>

            <div className="status-item ml-auto">
                SLO: 99.97%
            </div>

            <div className="status-item">
                v4.2.1 · PRODUCTION
            </div>
        </div>
    );
};
