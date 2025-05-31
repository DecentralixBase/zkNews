import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TrendingBar from "./components/TrendingBar";

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navbar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Header />
        <TrendingBar />
        <main className="flex-1 p-2 sm:p-4 md:p-8 glass mt-4 mx-0 sm:mx-2 md:mx-8 max-w-3xl w-full mx-auto">
          {/* News Feed will go here */}
          <div className="text-center text-lg text-gray-300 py-20">
            zkNews: Your Web3/Crypto News Feed will appear here.
          </div>
        </main>
      </div>
    </div>
  );
} 