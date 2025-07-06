import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Wallet,
  ChevronRight,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onConnect: () => void;
  isConnecting: boolean;
  error: string | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onConnect, isConnecting, error }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Rebalancio
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The future of decentralized finance. Self-rebalancing index funds powered by 
              the <span className="text-blue-400 font-semibold">Massa blockchain</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                {isConnecting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Wallet className="h-5 w-5" />
                )}
                {isConnecting ? 'Connecting...' : 'Connect Massa Wallet'}
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="text-gray-300 hover:text-white font-medium py-4 px-8 rounded-2xl border border-gray-600 hover:border-gray-400 transition-all duration-300">
                Learn More
              </button>
            </div>
            
            {error && (
              <div className="max-w-md mx-auto mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Rebalancio?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of automated portfolio management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl w-fit mb-6">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Auto-Rebalancing</h3>
              <p className="text-gray-300 leading-relaxed">
                Smart contracts automatically rebalance your portfolio to maintain optimal allocation ratios
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure & Trustless</h3>
              <p className="text-gray-300 leading-relaxed">
                Built on Massa's decentralized blockchain with no central authority controlling your funds
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl w-fit mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Low Fees</h3>
              <p className="text-gray-300 leading-relaxed">
                Minimal transaction costs with Massa's efficient consensus mechanism
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">$2.5M+</div>
              <div className="text-gray-300">Total Value Locked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15,000+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">98.7%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Autonomous Operation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;