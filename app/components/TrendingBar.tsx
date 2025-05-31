"use client";

import React, { useEffect, useState } from "react";
import { fetchPrices, CoinPrice } from "@/utils/fetchPrices";
import LoadingSkeleton from "./LoadingSkeleton";

export default function TrendingBar() {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices().then((data) => {
      setPrices(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="w-full glass-light py-2 px-4 animate-pulse mt-2 h-10" />;
  }

  return (
    <div className="w-full glass-light py-2 px-4 flex items-center gap-6 overflow-x-auto animate-gradient-move mt-2">
      <span className="text-sm text-blue-300 font-semibold">Trending:</span>
      {prices.map((coin) => (
        <span key={coin.symbol} className="text-sm text-white/80 flex items-center gap-1">
          {coin.symbol.toUpperCase()} ${parseFloat(coin.priceUsd).toLocaleString(undefined, { maximumFractionDigits: 4 })}
          <span className={
            parseFloat(coin.changePercent24Hr) > 0
              ? "text-green-400 ml-1"
              : parseFloat(coin.changePercent24Hr) < 0
              ? "text-red-400 ml-1"
              : "text-gray-400 ml-1"
          }>
            {parseFloat(coin.changePercent24Hr).toFixed(2)}%
          </span>
        </span>
      ))}
    </div>
  );
} 