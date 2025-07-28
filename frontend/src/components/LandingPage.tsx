import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Wallet,
  ChevronRight,
  Sparkles,
  Globe,
  Users,
  Lock,
  Coins,
  ArrowRight,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Advanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/20 to-pink-600/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
          <div className="text-center">
            {/* Enhanced Logo Section */}
            <div className="flex items-center justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl border border-white/10">
                  <BarChart3 className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
                Rebalancio
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                <span className="text-lg text-yellow-400 font-semibold tracking-wider">AUTONOMOUS • DECENTRALIZED • INTELLIGENT</span>
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-200 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              The future of <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">decentralized finance</span>. 
              Self-rebalancing index funds powered by the revolutionary{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">Massa blockchain</span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-20">
              <button
                onClick={onEnterApp}
                disabled={false}
                className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 text-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <Wallet className="h-6 w-6" />
                  <span>Launch DApp</span>
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button className="group text-gray-200 hover:text-white font-semibold py-6 px-12 rounded-2xl border-2 border-gray-500 hover:border-purple-400 transition-all duration-300 flex items-center gap-3 text-xl hover:bg-purple-500/10">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Enhanced Features Section */}
      <div className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M40 0L42 2L40 4L38 2Z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
              Why Choose Rebalancio?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of decentralized finance with cutting-edge technology and autonomous portfolio management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Autonomous Rebalancing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Smart contracts automatically rebalance your portfolio to maintain optimal allocations without manual intervention.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Maximum Security</h3>
                <p className="text-gray-300 leading-relaxed">
                  Built on Massa's revolutionary blockchain technology with advanced security features and decentralized execution.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Optimized Returns</h3>
                <p className="text-gray-300 leading-relaxed">
                  Advanced algorithms continuously optimize your portfolio for maximum returns while minimizing risk exposure.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global Access</h3>
                <p className="text-gray-300 leading-relaxed">
                  Access global markets and diversified portfolios from anywhere in the world with complete decentralization.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
                <p className="text-gray-300 leading-relaxed">
                  Join a vibrant community of DeFi enthusiasts and benefit from collective intelligence and governance.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl w-fit mb-6 shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Non-Custodial</h3>
                <p className="text-gray-300 leading-relaxed">
                  Maintain complete control of your funds with non-custodial solutions and trustless smart contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Section */}
      <div className="relative py-32 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">
              Powered by Innovation
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl w-fit mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Coins className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">$50M+</h3>
              <p className="text-gray-300 text-lg">Total Value Locked</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-3xl w-fit mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">10,000+</h3>
              <p className="text-gray-300 text-lg">Active Users</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-3xl w-fit mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">24.7%</h3>
              <p className="text-gray-300 text-lg">Average APY</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-3xl w-fit mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-300 text-lg">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/20 to-pink-600/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Ready to Start?
          </h2>
          <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of investors who are already earning with Rebalancio's autonomous portfolio management
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <button
              onClick={onEnterApp}
              disabled={false}
              className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-6 px-16 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 text-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex items-center gap-3">
                <Wallet className="h-6 w-6" />
                <span>Get Started Now</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;