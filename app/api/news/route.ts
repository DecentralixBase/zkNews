import { NextResponse } from "next/server";
import axios from "axios";
import { type NewsCategory } from "@/utils/fetchNews";

const API_KEY = process.env.CRYPTOPANIC_API_KEY || "7e25097fcc0d603011578a3f243f16d2271d8199";

// Map our categories to CryptoPanic's filters
const categoryToFilter: Record<NewsCategory, string> = {
  all: "",
  defi: "defi",
  nft: "nft",
  tokens: "tokens",
  airdrops: "airdrops",
  regulations: "regulation"
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory || 'all';
    
    let apiUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true&kind=news&regions=en`;
    
    // Add category filter if not 'all'
    const filter = categoryToFilter[category];
    if (filter) {
      apiUrl += `&currencies=${filter}`;
    }
    
    const { data } = await axios.get(apiUrl);
    
    if (!data.results || !Array.isArray(data.results)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response format');
    }

    const articles = data.results.map((item: any) => {
      // Extract the first image URL from the metadata or use default
      const imageUrl = item?.metadata?.image || 
                      item?.metadata?.images?.[0] || 
                      item?.metadata?.thumbnail ||
                      "/default-news.png";

      // Extract tags from both currencies and tags
      const tags = [
        ...(item.currencies || []).map((c: any) => c.code || c.title || ""),
        ...(item.tags || []).map((t: any) => t.name || t.title || "")
      ].filter(Boolean);

      return {
        thumbnail: imageUrl,
        source: item.source?.title || item.domain || "CryptoPanic",
        headline: item.title,
        summary: item.metadata?.description || item.title,
        url: item.url,
        tags: [...new Set(tags)], // Remove duplicates
        publishedAt: item.published_at,
      };
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error('News fetch error:', err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch news";
    return NextResponse.json(
      { articles: [], error: errorMessage }, 
      { status: 500 }
    );
  }
} 