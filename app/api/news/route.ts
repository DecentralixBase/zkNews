import { NextResponse } from "next/server";
import axios from "axios";
import { type NewsCategory } from "@/utils/fetchNews";

// Map categories to Cryptopanic filters
const categoryToFilter: Record<NewsCategory, string> = {
  all: "",
  defi: "defi",
  nft: "nft",
  tokens: "tokens",
  airdrops: "mining",
  regulations: "regulation"
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory || 'all';
    
    // Using Cryptopanic's free API
    let apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=cd529b9e4a3dfa8fb6e2a3c97894a2d5f5d6685f&public=true';
    
    // Add category filter if not 'all'
    const filter = categoryToFilter[category];
    if (filter) {
      apiUrl += `&currencies=${filter}`;
    }
    
    const { data } = await axios.get(apiUrl);
    
    if (!data?.results || !Array.isArray(data.results)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response format');
    }

    const articles = data.results.map((item: any) => {
      // Extract the first image URL from the metadata or use default
      const imageUrl = item?.metadata?.image || 
                      item?.metadata?.images?.[0] || 
                      item?.metadata?.thumbnail ||
                      "/default-news.png";

      return {
        thumbnail: imageUrl,
        source: item.source?.title || item.domain || "Cryptopanic",
        headline: item.title,
        summary: item.metadata?.description || item.title,
        url: item.url,
        tags: [(item.currencies || []).map((c: any) => c.code), category].flat().filter(Boolean),
        publishedAt: item.published_at,
      };
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error('News fetch error:', err);
    // Return empty array on error to prevent UI breaking
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
} 