import { NextResponse } from "next/server";
import axios from "axios";
import { type NewsCategory } from "@/utils/fetchNews";

// Map categories to CoinGecko's categories
const categoryToFilter: Record<NewsCategory, string> = {
  all: "",
  defi: "defi",
  nft: "nft",
  tokens: "general",
  airdrops: "general",
  regulations: "regulation"
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory || 'all';
    
    // Using CoinGecko's free API for quick setup
    let apiUrl = 'https://api.coingecko.com/api/v3/news';
    
    // Add category filter if not 'all'
    const filter = categoryToFilter[category];
    if (filter) {
      apiUrl += `?category=${filter}`;
    }
    
    const { data } = await axios.get(apiUrl);
    
    if (!Array.isArray(data)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response format');
    }

    const articles = data.map((item: any) => {
      return {
        thumbnail: item.thumb_2x || item.thumb || "/default-news.png",
        source: item.author || "CoinGecko",
        headline: item.title,
        summary: item.description || item.title,
        url: item.url,
        tags: [item.categories || "crypto"].flat().filter(Boolean),
        publishedAt: item.created_at,
      };
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error('News fetch error:', err);
    // Return empty array on error to prevent UI breaking
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
} 