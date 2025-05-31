import { NextResponse } from "next/server";
import axios from "axios";

const COINS = ["bitcoin", "ethereum", "solana", "dogecoin", "pepe"];
const API_URL = `https://api.coincap.io/v2/assets?ids=${COINS.join(",")}`;

export async function GET() {
  try {
    const { data } = await axios.get(API_URL);
    const prices = (data.data || []).map((coin: any) => ({
      symbol: coin.symbol,
      priceUsd: coin.priceUsd,
      changePercent24Hr: coin.changePercent24Hr,
    }));
    return NextResponse.json({ prices });
  } catch (err) {
    return NextResponse.json({ prices: [], error: "Failed to fetch prices" }, { status: 500 });
  }
} 