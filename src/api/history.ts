export const fetchPriceHistory = async (symbol: string): Promise<Array<{ date: string; price: number }>> => {
  try {
    const response = await fetch(`https://api.example.com/history/${symbol}`); // External API endpoint
    if (!response.ok) throw new Error(`Error fetching price history for ${symbol}`);
    const data = await response.json();

    // Ensure the response is in the expected format
    return data.history.map((entry: any) => ({
      date: entry.date,
      price: entry.price,
    }));
  } catch (error) {
    console.error(`Failed to fetch price history for ${symbol}:`, error);
    return [];
  }
};
