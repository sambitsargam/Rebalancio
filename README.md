# Rebalancio

🧠 **Fully Autonomous, Self-Rebalancing Index Fund on Massa Blockchain**

Rebalancio is a decentralized finance (DeFi) application that automatically rebalances cryptocurrency index funds using smart contracts on the Massa blockchain. Users can deposit tokens and let the system autonomously maintain optimal portfolio allocations.

## 🌟 Features

- **🔄 Auto-Rebalancing**: Smart contracts automatically maintain target allocations
- **🔒 Decentralized**: No central authority controls your funds
- **⚡ Low Fees**: Built on Massa's efficient consensus mechanism
- **🎯 Index Funds**: Diversified exposure across multiple cryptocurrencies
- **🌐 Web3 Native**: Direct wallet integration with Massa ecosystem
- **📊 Real-time Tracking**: Live portfolio monitoring and analytics

## 🏗️ Architecture

```
Rebalancio/
├── contract/           # Smart contract (AssemblyScript)
│   ├── assembly/
│   │   ├── contracts/  # Main smart contract logic
│   │   ├── const/      # Token configurations
│   │   └── utils/      # Math and utility functions
│   └── package.json
│
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   └── utils/      # Configuration and utilities
│   └── package.json
│
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+**
- **npm or yarn**
- **Massa wallet** (MassaStation recommended)

### 1. Smart Contract Setup

```bash
cd contract
chmod +x install.sh
./install.sh
npm run build
```

### 2. Frontend Setup

```bash
cd frontend
chmod +x install.sh
./install.sh
npm run dev
```

### 3. Configuration

1. **Deploy the smart contract** to Massa testnet/mainnet
2. **Update contract address** in `frontend/src/utils/config.ts`
3. **Configure token addresses** in `contract/assembly/const/`

## 📋 Smart Contract Functions

### Core Functions

- `deposit()` - Deposit base tokens into the index fund
- `withdraw()` - Withdraw deposited tokens
- `rebalance()` - Trigger portfolio rebalancing

### View Functions

- `getUserDeposit()` - Get user's deposited amount
- `getTotalBase()` - Get total fund value
- `getIndexAllocations()` - Get token allocation percentages

## 🔧 Configuration

### Token Allocation

Edit `contract/assembly/const/indexTokens.ts`:

```typescript
export const INDEX_TOKENS: Map<string, u32> = new Map<string, u32>();
INDEX_TOKENS.set("TOKEN_ADDRESS_1", 50); // 50%
INDEX_TOKENS.set("TOKEN_ADDRESS_2", 30); // 30% 
INDEX_TOKENS.set("TOKEN_ADDRESS_3", 20); // 20%
```

### Base Token

Edit `contract/assembly/const/baseToken.ts`:

```typescript
export const BASE_TOKEN = "YOUR_BASE_TOKEN_ADDRESS";
```

### Frontend Configuration

Edit `frontend/src/utils/config.ts`:

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: "YOUR_DEPLOYED_CONTRACT_ADDRESS",
  NETWORK: {
    CURRENT: 'testnet', // or 'mainnet'
  },
};
```

## 🛠️ Development

### Smart Contract Development

```bash
cd contract

# Install dependencies
npm install

# Build contract
npm run build

# Run tests
npm run test
```

### Frontend Development

```bash
cd frontend

# Install dependencies  
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## 📚 Documentation

- **[Smart Contract README](./contract/README.md)** - Detailed contract documentation
- **[Frontend README](./frontend/README.md)** - Frontend setup and usage guide
- **[Massa Documentation](https://docs.massa.net/)** - Massa blockchain documentation

## 🔒 Security

- ✅ **No admin keys** - Fully decentralized operation
- ✅ **Non-custodial** - Users control their own funds
- ✅ **Open source** - Fully auditable code
- ✅ **Battle-tested** - Built on proven Massa infrastructure

### Security Best Practices

1. **Verify contract addresses** before any transactions
2. **Use testnet** for development and testing
3. **Keep wallets updated** and secure
4. **Never share** private keys or seed phrases

## 🚀 Deployment

### Smart Contract Deployment

1. **Build the contract**: `npm run build`
2. **Deploy to Massa**: Use Massa CLI or deployment tools
3. **Verify deployment**: Check contract address and functions

### Frontend Deployment

1. **Build for production**: `npm run build`
2. **Deploy to hosting**: Upload `dist/` folder to web server
3. **Configure domain**: Set up custom domain if needed

### Decentralized Hosting

For fully decentralized hosting:

1. **Build the frontend**
2. **Upload to IPFS**
3. **Access via** IPFS gateway or Massa DeWeb

## 🐛 Troubleshooting

### Common Issues

**Wallet Connection Failed**
- Install MassaStation or compatible wallet
- Check wallet extension is enabled
- Ensure you're on the correct network

**Transaction Failed**
- Check gas limits and fees
- Verify contract address is correct
- Ensure sufficient token balance

**Build Errors** 
- Clear dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all configuration files

### Debug Mode

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('debug', 'true');
```

## 📊 Recent Improvements

### Smart Contract Fixes

✅ **Corrected Massa SDK imports and usage**  
✅ **Fixed Context.caller() and Context.callee() implementation**  
✅ **Enhanced storage management and error handling**  
✅ **Improved token transfer logic**  
✅ **Added proper balance checking in rebalance function**  
✅ **Updated to use valid Massa address formats**  

### Frontend Enhancements

✅ **Fixed smart contract function calls**  
✅ **Proper token decimal handling (9 decimals)**  
✅ **Enhanced wallet connection and error handling**  
✅ **Improved transaction status tracking**  
✅ **Added configuration management**  
✅ **Updated Vite config for Node.js polyfills**  

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Development Guidelines

- Use TypeScript for type safety
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **📖 Documentation**: Check the README files in each directory
- **🐛 Issues**: Open an issue on GitHub
- **💬 Community**: Join the Massa Discord
- **📧 Contact**: Reach out to the development team

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic smart contract functionality
- [x] Frontend wallet integration
- [x] Manual rebalancing

### Phase 2 (Upcoming)
- [ ] Automated rebalancing triggers
- [ ] Multiple index fund strategies
- [ ] Performance analytics dashboard

### Phase 3 (Future)
- [ ] Governance token implementation
- [ ] Community-driven fund creation
- [ ] Cross-chain support

## � Acknowledgments

- **Massa Labs** for the innovative blockchain platform
- **AssemblyScript** team for the smart contract tooling
- **React & Vite** communities for frontend technologies
- **Open source** contributors and the DeFi community

---

**⚠️ Disclaimer**: This software is provided as-is for educational and experimental purposes. Cryptocurrency investments carry inherent risks. Always do your own research and never invest more than you can afford to lose.

**Rebalancio** is a fully autonomous, on-chain index fund powered by the **Massa blockchain**. It allows users to invest in a diversified portfolio of crypto assets through a single token, while the protocol automatically rebalances the fund according to predefined asset allocations — without requiring bots, off-chain schedulers, or human intervention.


## 🔍 What is Rebalancio?

Rebalancio is a decentralized finance (DeFi) application built using Massa's **Autonomous Smart Contracts** and **DeWeb frontend hosting**. It enables users to:

* Deposit a base token (like USDT or native Massa tokens)
* Receive shares representing a stake in a multi-asset index
* Automatically benefit from periodic rebalancing (e.g., weekly)
* Withdraw their proportional share of the fund at any time

All logic — from fund accounting to rebalancing — is handled by **autonomous, self-executing smart contracts**.


## 💡 Key Features

### 🛠 Fully On-Chain Architecture

All rebalancing logic and fund management is handled entirely on-chain using Massa's Autonomous Smart Contracts — no off-chain bots, no centralized triggers.

### 📈 Self-Rebalancing Portfolio

Rebalancio maintains a portfolio of selected tokens (e.g., ETH, BTC, LINK) in fixed percentages. The smart contract automatically rebalances these holdings periodically to restore target allocations.

### 🔒 Non-Custodial and Trustless

Users retain full control over their assets. Deposits and withdrawals are permissionless. The protocol does not rely on centralized custody or any admin keys.

### ⚡ On-Chain Execution with Deferred Calls

Rebalancing is triggered using **deferred self-calls** built into Massa smart contracts, ensuring periodic updates without requiring external automation frameworks.

### 🌐 DeWeb Frontend

The UI is deployed directly on Massa's DeWeb infrastructure, making it unstoppable and censorship-resistant. No IPFS or web hosting services are needed.


## 🧱 Architecture Overview

### 1. **Smart Contracts**

* Built with AssemblyScript using Massa's smart contract SDK.
* Implements deposit, withdraw, and rebalance functions.
* Uses `TokenWrapper` interface to interact with MRC20 tokens.
* Stores user balances and fund state using Massa's key-value storage.

### 2. **Frontend**

* Built in React with wallet integration via `@massalabs/wallet-provider`.
* Connects seamlessly to MassaStation and compatible wallets.
* Users can interact with the smart contract directly from the browser.
* Deployable on Massa DeWeb with `manifest.web` support.

### 3. **Rebalance Logic**

* Each asset has a target allocation percentage.
* On rebalance, the contract calculates deltas between current and target values.
* Assets are sold/bought accordingly using on-chain swap interfaces (future versions).
* Triggered autonomously using Massa's built-in scheduler mechanism.

## 📊 Example Token Allocation

| Token     | Symbol | Target % |
| --------- | ------ | -------- |
| Ethereum  | ETH    | 50%      |
| Bitcoin   | BTC    | 30%      |
| Chainlink | LINK   | 20%      |

These values can be hardcoded or governed in future releases via on-chain DAO logic.


## 🧑‍💻 User Flow

1. **Connect Wallet**
   The user connects their MassaStation wallet via the browser-based UI.

2. **Deposit Tokens**
   Users deposit a supported base token (e.g., USDT) into the contract.

3. **Receive Fund Shares**
   Users receive fungible shares representing a claim on the index fund.

4. **Periodic Rebalance**
   The fund rebalances itself periodically based on time intervals set in the contract.

5. **Withdraw at Any Time**
   Users can redeem their shares for underlying assets, according to the fund's current portfolio.


## 🚀 Why Massa?

Rebalancio is only possible on Massa because of two powerful native features:

* **Autonomous Smart Contracts**: Enable contracts to execute code on their own, without keepers or cron jobs.
* **DeWeb**: Lets the frontend live permanently on-chain, with no centralized server or IPFS dependency.

Together, these allow Rebalancio to operate *completely independently* — from frontend to backend — on a decentralized network.


## 🔮 Roadmap

* ✅ MVP: Deposit / Withdraw / Rebalance
* ⏳ Integration with on-chain swap interfaces
* ⏳ DAO-controlled index configuration
* ⏳ Multi-chain support via wrapped assets
* ⏳ Analytics dashboard and mobile-friendly UI


## 🛡 Security Notes

* Rebalancio is non-custodial: user assets remain in smart contracts.
* The contract logic is transparent and open-source.
* Audits and formal verification are planned for future iterations.


## 🤝 Contributing

We welcome community feedback, feature ideas, and contributions. If you're interested in helping extend Rebalancio — whether on the frontend, smart contracts, or documentation — reach out or submit a pull request.


🌐 **Live DApp ( On Building Stage ):**

* Massa DeWeb: [https://rebalancio.dev.massa-deweb.xyz/](https://rebalancio.dev.massa-deweb.xyz/)
* Vercel: [https://rebalancio.vercel.app/](https://rebalancio.vercel.app/)

---

Let me know if you'd like this saved into a file or added to your project ZIP.
