import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stock {
  name: string;
  shares: number;
  boughtPrice: number;
  currentPrice?: number;
}

interface PortfolioState {
  stocks: Stock[];
}

const initialState: PortfolioState = {
  stocks: [],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<Stock>) => {
      state.stocks.push(action.payload);
    },
    updateStockPrice: (
      state,
      action: PayloadAction<{ name: string; currentPrice: number }>
    ) => {
      const stock = state.stocks.find((s) => s.name === action.payload.name);
      if (stock) {
        stock.currentPrice = action.payload.currentPrice;
      }
    },
  },
});

export const { addStock, updateStockPrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;

