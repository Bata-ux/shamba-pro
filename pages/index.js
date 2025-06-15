import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Plus, Users, Droplets, Scale, Heart, Calendar, BarChart3, Menu, X, 
  Bot, MessageCircle, Mic, MicOff, Send, Globe
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <>
        <Head>
          <title>Shamba Pro - Revolutionary Farm Management</title>
          <meta name="description" content="The most advanced farming app for Africa" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #16a34a, #15803d, #166534)',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden'
}}>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 animate-pulse">
            <div className="text-6xl mb-4 animate-bounce">🐐</div>
            <h1 className="text-5xl font-bold mb-2">Shamba Pro</h1>
            <p className="text-xl opacity-90 mb-6">Revolutionary Farm Management System</p>
            <p className="text-lg opacity-80">By Dr. Bulayimu Group</p>
            <div className="mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <div className="mt-4 text-sm opacity-70">Loading your farming platform...</div>
          </div>
          
          <div className="absolute top-20 left-10 text-4xl opacity-30 animate-pulse">🌾</div>
          <div className="absolute top-32 right-16 text-3xl opacity-25 animate-bounce delay-300">🐄</div>
          <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-pulse delay-700">🥛</div>
          <div className="absolute bottom-20 right-12 text-2xl opacity-25 animate-bounce delay-1000">💰</div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Login - Shamba Pro</title>
          <meta name="description" content="Access your farm management system" />
        </Head>
        <div style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1.5rem',
  background: 'linear-gradient(135deg, #f0fdf4, #ffffff, #eff6ff)'
}}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🐐</div>
              <h1 className="text-3xl font-bold text-green-600">Shamba Pro</h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Access your farm management system</p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-lg border-2 rounded-xl"
              />
              <Button
  onClick={() => setUser({ email })}
  style={{
    backgroundColor: '#16a34a',
    color: 'white',
    width: '100%',
    padding: '0.75rem',
    fontSize: '1.125rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer'
  }}
  disabled={!email || !password}
>
              >
                Enter Farm Dashboard
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">By Dr. Bulayimu Group</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Shamba Pro</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <h1 className="text-2xl font-bold">🐐 Shamba Pro Dashboard</h1>
          <p className="opacity-90">Revolutionary Farm Management System</p>
        </div>
        
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Congratulations! Your App is Live!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your Shamba Pro farming app is successfully deployed and running!
          </p>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Sample Animals</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-600">22L</div>
              <div className="text-sm text-gray-600">Daily Milk</div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="font-bold text-lg mb-2">🤖 AI Assistant Coming Soon!</h3>
            <p className="text-sm text-gray-600">
              Multi-language AI chat, vet consultations, and complete farm management features will be added next!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
