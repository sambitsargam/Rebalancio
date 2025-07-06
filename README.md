# 🌀 Rebalancio

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
