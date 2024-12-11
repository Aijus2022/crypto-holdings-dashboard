import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCrypto } from '../store/portfolioSlice';
import cryptoList from '../data/crypto.json';
import { fetchCryptoPrice } from '../api/cryptoPrice';

const AddCryptoForm: React.FC = () => {
  const [cryptoId, setCryptoId] = useState<string>(''); // Use name as ID
  const [amount, setAmount] = useState<number>(0);
  const [boughtPrice, setBoughtPrice] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cryptoName = cryptoList.find((c) => c.symbol === cryptoId)?.name || '';
    if (cryptoName) {
      // Fetch live price from Alternative.me
      const livePrice = await fetchCryptoPrice(cryptoName);

      // If live price is available, use it as the bought price
      const priceToUse = boughtPrice || livePrice || 0;

      // Dispatch to Redux store
      dispatch(addCrypto({ name: cryptoName, amount, boughtPrice: priceToUse }));
    }

    // Reset form fields
    setCryptoId('');
    setAmount(0);
    setBoughtPrice(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-neutral-800 rounded shadow-md">
      <h2 className="text-lg font-bold text-indigo-400 mb-4">Add New Crypto</h2>
      <div className="mb-4">
        <label htmlFor="crypto-select" className="block text-neutral-400">
          Cryptocurrency:
        </label>
        <select
          id="crypto-select"
          value={cryptoId}
          onChange={(e) => setCryptoId(e.target.value)}
          className="w-full p-2 rounded bg-neutral-700 text-white"
          required
        >
          <option value="" disabled>
            Select Cryptocurrency
          </option>
          {cryptoList.map((crypto) => (
            <option key={crypto.symbol} value={crypto.symbol}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-neutral-400">Amount:</label>
        <input
          type="number"
          placeholder="Amount (e.g., 0.01)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 rounded bg-neutral-700 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-400">Bought Price (Optional):</label>
        <input
          type="number"
          placeholder="Bought Price"
          value={boughtPrice || ''}
          onChange={(e) => setBoughtPrice(Number(e.target.value))}
          className="w-full p-2 rounded bg-neutral-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-bold"
      >
        Add Crypto
      </button>
    </form>
  );
};

export default AddCryptoForm;






