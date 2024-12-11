export const fetchCryptoPrice = async (cryptoName: string): Promise<number | null> => {
  try {
    const response = await fetch(`https://api.alternative.me/v2/ticker/${cryptoName.toLowerCase()}/`);
    const data = await response.json();

    // Extract the USD price from the API response
    const price = data.data?.[Object.keys(data.data)[0]]?.quotes?.USD?.price;
    return price || null;
  } catch (error) {
    console.error(`Error fetching price for ${cryptoName}:`, error);
    return null;
  }
};

  