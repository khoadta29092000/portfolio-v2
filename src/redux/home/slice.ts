import { createSlice } from '@reduxjs/toolkit';

export type TPortfolioState = {
  isLight: boolean;
  backgroundColor: string;
};

const initialState: TPortfolioState = {
  isLight: false,
  backgroundColor: '#1e2025',
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioIsLight: (state, action) => {
      state.isLight = action.payload;
    },
    setPortfolioBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const { setPortfolioIsLight, setPortfolioBackgroundColor } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
