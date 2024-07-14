import { useSelector } from 'react-redux';
import { TPortfolioState } from './slice';

const usePortfolio = () => useSelector((state: { portfolio: TPortfolioState }) => state.portfolio);

export const usePortfolioIsLight = () =>
  useSelector((state: { portfolio: TPortfolioState }) => state.portfolio.isLight);

export const usePortfolioBackgroundColor = () =>
  useSelector((state: { portfolio: TPortfolioState }) => state.portfolio.backgroundColor);

export default usePortfolio;
