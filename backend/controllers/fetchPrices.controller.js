import Price from "../models/price.model.js";
import { getCryptoPrices } from "../services/cryptoService.js";

export const fetchPrices = async (req, res) => {
  try {
    const prices = await getCryptoPrices();

    // Optional: save to DB for history
    // Object.keys(prices).forEach(async (coin) => {
    //   await Price.create({
    //     coinId: coin,
    //     price: prices[coin].usd,
    //     marketCap: prices[coin].usd_market_cap,
    //     change24h: prices[coin].usd_24h_change,
    //   });
    // });

    res.json({prices,message:"Crypto Prices fetched successfully"});
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message 
    });
  }
};
