import React, { useState, useEffect } from 'react'
import PriceCard from './PriceCard';
import { useSelector } from 'react-redux';

function AllPriceCards() {
  const cryptoData = useSelector((state) => state.crypto.cryptoData);
  const [cryptoPrices, setCryptoPrices] = useState([]);

  useEffect(() => {
    // if (!cryptoData) return;

    const updatedPrices = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: cryptoData?.bitcoin?.usd||11879,
        change24h: cryptoData?.bitcoin?.usd_24h_change || +2.43,
        lastUpdated: new Date(), 
        isConnected: true
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        price: cryptoData?.ethereum?.usd || 4027,
        change24h: cryptoData?.ethereum?.usd_24h_change || -3.03,
        lastUpdated: new Date(),
        isConnected: true
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        price: cryptoData?.cardano?.usd || 0.79,
        change24h: cryptoData?.cardano?.usd_24h_change || +1.19,
        lastUpdated: new Date(),
        isConnected: true
      },
      {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        price: cryptoData?.polkadot?.usd||3.92,
        change24h: cryptoData?.polkadot?.usd_24h_change || +2.43,
        lastUpdated: new Date(),
        isConnected: true
      }
    ];

    setCryptoPrices(updatedPrices);
  }, [cryptoData]); 

  return (
    <div className="w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cryptoPrices?.map((crypto) => (
          <PriceCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

export default AllPriceCards;
