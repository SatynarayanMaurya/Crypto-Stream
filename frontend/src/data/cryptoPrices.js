
export const cryptoPrice = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.67,
      change24h: 2.34,
      lastUpdated: new Date(),
      isConnected: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2687.45,
      change24h: -1.23,
      lastUpdated: new Date(),
      isConnected: true
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.4567,
      change24h: 5.67,
      lastUpdated: new Date(),
      isConnected: true
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      price: 7.89,
      change24h: -3.45,
      lastUpdated: new Date(),
      isConnected: true
    }
]


export const alert = [
    {
      id: 1,
      crypto: 'Bitcoin',
      symbol: 'BTC',
      condition: 'above',
      targetPrice: 45000,
      currentPrice: 43250.67,
      isActive: true,
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      crypto: 'Ethereum',
      symbol: 'ETH',
      condition: 'below',
      targetPrice: 2500,
      currentPrice: 2687.45,
      isActive: true,
      createdAt: new Date(Date.now() - 172800000)
    }
]

export const recentAlert = [
    {
      id: 1,
      message: 'BTC dropped below $44,000',
      timestamp: new Date(Date.now() - 3600000),
      type: 'warning'
    },
    {
      id: 2,
      message: 'ETH alert triggered - above $2,650',
      timestamp: new Date(Date.now() - 7200000),
      type: 'success'
    }
  ]