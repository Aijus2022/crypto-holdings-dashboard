// Fetch live price from the backend
export const fetchLivePrice = async (symbol: string): Promise<number | null> => {
  try {
    const response = await fetch(`http://localhost:5000/api/price/${symbol}`);
    const data = await response.json();
    return data.price || null;
  } catch (error) {
    console.error(`Failed to fetch live price for ${symbol}`, error);
    return null;
  }
};

// Fetch historical data from the backend
export const fetchPriceHistory = async (symbol: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/history/${symbol}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch price history for ${symbol}`, error);
    return [];
  }
};
