import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice';

export const portfolioStore = configureStore({
    reducer: {
        portfolio: portfolioReducer,
    },
    devTools: import.meta.env.DEV,
});

export type PortfolioRootState = ReturnType<typeof portfolioStore.getState>;
export type PortfolioDispatch = typeof portfolioStore.dispatch;
