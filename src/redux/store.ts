import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './home';

const store = configureStore({
  devTools: true,
  reducer: {
    portfolio: portfolioReducer,
  },
});

export default store;
