import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { initializeDefaultSections } from '@/store/portfolio/portfolioSlice';
// Removed dead organism and navigation icon imports



const PortfolioContent: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeDefaultSections());

    }, [dispatch]);

    return (
        <iframe
            src={`http://localhost:3001?username=kanishk`} // Using kanishk for demo for now to test the backend integration.
            className="w-full h-screen border-0"
            title="Portfolio Demo Full"
        />
    );
};

const PortfolioPreviewFull: React.FC = () => {
    return (
        <Provider store={portfolioStore}>
            <PortfolioContent />
        </Provider>
    );
};

export default PortfolioPreviewFull;
