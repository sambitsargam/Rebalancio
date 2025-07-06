# Rebalancio

🧠 Fully Autonomous, Self-Rebalancing Index Fund built on Massa Network.

## Features
- Deposit base token (e.g., USDT) and receive index shares.
- Automatically rebalances across multiple assets.
- Fully on-chain, autonomous via Massa's smart contracts.
- Hosted on DeWeb.

## Project Structure
- `assembly/contracts/`: Main smart contract
- `assembly/const/`: Configuration constants (tokens, allocations)
- `assembly/utils/`: Utility math/helpers
- `package.json`: Project setup
- `asconfig.json`: Build config for AssemblyScript
- `tsconfig.json`: TypeScript compiler options

## Build
```bash
npm install
npm run build
```

## Deploy
Use Massa CLI or deployment tools to upload the generated `.wasm` file.
