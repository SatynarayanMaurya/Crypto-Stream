import axios from "axios";

export const getCryptoPrices = async () => {
  try {
    // CoinGecko API URL
    const url = "https://api.coingecko.com/api/v3/simple/price";

    // You can list coins you want
    const coins = "bitcoin,ethereum,cardano,polkadot"; 
    const params = {
      ids: coins,
      vs_currencies: "usd",
      include_market_cap: true,
      include_24hr_change: true
    };

    // Make GET request to CoinGecko
    const response = await axios.get(url, {
      params,
      // headers: {
      //   "x-cg-pro-api-key": process.env.COINGECKO_API_KEY // API key from .env
      // }
    });

    // Return response data
    return response.data;

  } catch (error) {

    console.error("Error fetching crypto prices:", error.message);
    throw new Error("Failed to fetch crypto prices ",error);
  }
};

// 6f51603d-1623-4488-857a-6d6c31549f4f