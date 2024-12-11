import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './portfolioSlice'; // Import your portfolio slice

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer, // Add portfolio slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
