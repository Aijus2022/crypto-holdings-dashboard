import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCryptoForm from '../components/AddCryptoForm';
import { fetchCryptoPrice } from '../api/cryptoPrice'; // Assuming this fetches current prices
import { updateCryptoPrice } from '../store/portfolioSlice'; // Redux action to update current price

interface Crypto {
  name: string;
  amount: number; // Amount owned
  boughtPrice: number; // Price at which it was bought
  currentPrice?: number; // Current price (optional)
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  // Get the list of cryptos from Redux state
  const cryptos: Crypto[] = useSelector((state: any) => state.portfolio.cryptos);

  // Fetch current prices for all cryptos
  useEffect(() => {
    const updatePrices = async () => {
      for (const crypto of cryptos) {
        const price = await fetchCryptoPrice(crypto.name);
        if (price !== null) {
          dispatch(updateCryptoPrice({ name: crypto.name, currentPrice: price }));
        }
      }
    };
    if (cryptos.length > 0) updatePrices();
  }, [cryptos, dispatch]);

  // Calculate Profit/Loss
  const calculateProfitLoss = (boughtPrice: number, currentPrice: number | undefined, amount: number): number => {
    if (!currentPrice) return 0; // Default to 0 if current price is undefined
    return (currentPrice - boughtPrice) * amount;
  };

  return (
    <div className="p-6 bg-neutral-900 text-white min-h-screen">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-indigo-400">Crypto Portfolio Tracker</h1>
        <p className="text-neutral-400 text-sm">
          Track your cryptocurrency portfolio. Add new cryptos below.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Crypto Form */}
        <section className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Add Cryptocurrency</h2>
          <AddCryptoForm />
        </section>

        {/* Current Portfolio */}
        <section className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Current Portfolio</h2>
          {cryptos.length > 0 ? (
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-neutral-600 py-2 px-4">Crypto Name</th>
                  <th className="border-b border-neutral-600 py-2 px-4">Amount</th>
                  <th className="border-b border-neutral-600 py-2 px-4">Bought Price</th>
                  <th className="border-b border-neutral-600 py-2 px-4">Current Price</th>
                  <th className="border-b border-neutral-600 py-2 px-4">Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto) => {
                  const profitLoss = calculateProfitLoss(crypto.boughtPrice, crypto.currentPrice, crypto.amount);
                  return (
                    <tr key={crypto.name}>
                      <td className="border-b border-neutral-700 py-2 px-4">{crypto.name}</td>
                      <td className="border-b border-neutral-700 py-2 px-4">{crypto.amount}</td>
                      <td className="border-b border-neutral-700 py-2 px-4">${crypto.boughtPrice.toFixed(2)}</td>
                      <td className="border-b border-neutral-700 py-2 px-4">
                        {crypto.currentPrice !== undefined ? `$${crypto.currentPrice.toFixed(2)}` : 'Loading...'}
                      </td>
                      <td
                        className={`border-b border-neutral-700 py-2 px-4 ${
                          profitLoss > 0 ? 'text-green-400' : profitLoss < 0 ? 'text-red-400' : ''
                        }`}
                      >
                        ${profitLoss.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-neutral-500">No cryptos added yet. Use the form to add your cryptos.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;









