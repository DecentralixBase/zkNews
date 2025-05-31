import axios from "axios";

export interface CoinPrice {
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

export async function fetchPrices(): Promise<CoinPrice[]> {
  const res = await axios.get("/api/prices");
  return res.data.prices;
} 