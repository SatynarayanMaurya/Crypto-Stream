import React from 'react'
import {TrendingDown,TrendingUp} from "lucide-react"

function PriceCard({ crypto }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {crypto.symbol.substring(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 ">{crypto.name}</h3>
            <p className="text-sm text-gray-500 ">{crypto.symbol}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${crypto.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
      </div>
      
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-900 ">
          ${crypto?.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-1 ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {crypto.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="font-medium">
            {crypto?.change24h >= 0 ? '+' : ''}{crypto?.change24h?.toFixed(2)}%
          </span>
        </div>
        <p className="text-xs text-gray-500 ">
          Updated: {crypto.lastUpdated.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default PriceCard

