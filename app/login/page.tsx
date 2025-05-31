"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center p-4">
      <div className="glass max-w-md w-full p-8 relative">
        <a 
          href="/"
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </a>
        
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold ${isLogin ? "bg-blue-600 text-white" : "bg-white/10 text-blue-300"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold ${!isLogin ? "bg-blue-600 text-white" : "bg-white/10 text-blue-300"}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-white/10 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-white/10 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-blue-400 hover:text-blue-300">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-blue-400 hover:text-blue-300">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 