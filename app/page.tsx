import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TrendingBar from "./components/TrendingBar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <TrendingBar />
        <main className="flex-1 p-4 md:p-8 glass mt-4 mx-2 md:mx-8">
          {/* News Feed will go here */}
          <div className="text-center text-lg text-gray-300 py-20">
            zkNews: Your Web3/Crypto News Feed will appear here.
          </div>
        </main>
      </div>
    </div>
  );
} 