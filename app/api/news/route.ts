import { NextResponse } from "next/server";
import axios from "axios";
import { type NewsCategory } from "@/utils/fetchNews";

const API_KEY = process.env.CRYPTOPANIC_API_KEY || "7e25097fcc0d603011578a3f243f16d2271d8199";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory || 'all';
    
    let apiUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true`;
    
    // Add filters based on category
    if (category !== 'all') {
      apiUrl += `&filter=${category}`;
    }
    
    const { data } = await axios.get(apiUrl);
    const articles = (data.results || []).map((item: any) => ({
      thumbnail: item?.metadata?.image || item?.metadata?.thumbnail || "/default-news.png",
      source: item.source?.title || "CryptoPanic",
      headline: item.title,
      summary: item.metadata?.description || item.title,
      url: item.url,
      tags: item.tags?.map((t: any) => t.name) || [],
      publishedAt: item.published_at,
    }));
    return NextResponse.json({ articles });
  } catch (err) {
    console.error('News fetch error:', err);
    return NextResponse.json({ articles: [], error: "Failed to fetch news" }, { status: 500 });
  }
} 