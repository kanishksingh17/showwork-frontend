import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { PortfolioRootState, PortfolioDispatch } from './index';

// Typed hooks for portfolio store
export const usePortfolioDispatch = () => useDispatch<PortfolioDispatch>();
export const usePortfolioSelector: TypedUseSelectorHook<PortfolioRootState> = useSelector;
