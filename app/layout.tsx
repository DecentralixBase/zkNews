import "@/styles/globals.css";
import "@fontsource/inter/variable.css";
import "@fontsource/poppins/latin-400.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "zkNews - Web3/Crypto News Aggregator",
  description: "Real-time crypto news, trends, and insights. Futuristic UI. Inspired by CryptoPanic.",
  openGraph: {
    title: "zkNews - Web3/Crypto News Aggregator",
    description: "Real-time crypto news, trends, and insights. Futuristic UI. Inspired by CryptoPanic.",
    images: ["/og-image.png"],
    type: "website",
    url: "https://zknews.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "zkNews - Web3/Crypto News Aggregator",
    description: "Real-time crypto news, trends, and insights. Futuristic UI. Inspired by CryptoPanic.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-inter bg-gradient-to-br from-gradient-start to-gradient-end min-h-screen">
        {children}
      </body>
    </html>
  );
} 