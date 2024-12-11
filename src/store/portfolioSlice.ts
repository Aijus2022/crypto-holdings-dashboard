import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Crypto {
  name: string;
  amount: number; // Amount owned
  boughtPrice: number; // Bought price per unit
  currentPrice?: number; // Current market price
}

interface PortfolioState {
  cryptos: Crypto[];
}

const initialState: PortfolioState = {
  cryptos: [],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCrypto: (state, action: PayloadAction<Crypto>) => {
      state.cryptos.push(action.payload);
    },
    updateCryptoPrice: (
      state,
      action: PayloadAction<{ name: string; currentPrice: number }>
    ) => {
      const crypto = state.cryptos.find((c) => c.name === action.payload.name);
      if (crypto) {
        crypto.currentPrice = action.payload.currentPrice;
      }
    },
  },
});

export const { addCrypto, updateCryptoPrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;



