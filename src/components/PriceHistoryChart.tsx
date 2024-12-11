import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchPriceHistory } from '../api/history';

const PriceHistoryChart: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      const history = await fetchPriceHistory(symbol);
      setData({
        labels: history.map((h) => h.date),
        datasets: [
          {
            label: `Price History for ${symbol}`,
            data: history.map((h) => h.price),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      });
      setLoading(false);
    };
    loadHistory();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;
  return data ? <Line data={data} /> : <p>No data available</p>;
};

export default PriceHistoryChart;



