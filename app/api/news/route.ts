import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.CRYPTOPANIC_API_KEY || "7e25097fcc0d603011578a3f243f16d2271d8199";
const API_URL = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&filter=hot&public=true`;

export async function GET() {
  try {
    const { data } = await axios.get(API_URL);
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
    return NextResponse.json({ articles: [], error: "Failed to fetch news" }, { status: 500 });
  }
} 