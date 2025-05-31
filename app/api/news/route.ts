import { NextResponse } from "next/server";
import axios from "axios";
import { type NewsCategory } from "@/utils/fetchNews";

// Map categories to search queries
const categoryToFilter: Record<NewsCategory, string> = {
  all: "crypto OR cryptocurrency OR bitcoin OR ethereum",
  defi: "defi OR 'decentralized finance'",
  nft: "nft OR 'non fungible token'",
  tokens: "cryptocurrency tokens",
  airdrops: "crypto airdrop",
  regulations: "crypto regulation"
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory || 'all';
    
    // Using NewsAPI.org
    const apiUrl = 'https://newsapi.org/v2/everything';
    const filter = categoryToFilter[category];
    
    const { data } = await axios.get(apiUrl, {
      params: {
        q: filter,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        apiKey: '26a2f5e5af1c4c23a6c6c9f91e504c4f'
      }
    });
    
    if (!data?.articles || !Array.isArray(data.articles)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response format');
    }

    const articles = data.articles.map((item: any) => {
      return {
        thumbnail: item.urlToImage || "/default-news.png",
        source: item.source?.name || "News",
        headline: item.title,
        summary: item.description || item.title,
        url: item.url,
        tags: [category, 'crypto'].filter(Boolean),
        publishedAt: item.publishedAt,
      };
    });

    return NextResponse.json({ articles });
  } catch (err) {
    console.error('News fetch error:', err);
    // Return some static news on error
    return NextResponse.json({
      articles: [
        {
          thumbnail: "/default-news.png",
          source: "Default News",
          headline: "Cryptocurrency Market Update",
          summary: "Latest updates from the cryptocurrency market showing positive trends.",
          url: "https://example.com",
          tags: ["crypto"],
          publishedAt: new Date().toISOString()
        }
      ]
    });
  }
} 