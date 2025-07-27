# Rebalancio Smart Contract

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

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Build
```bash
npm run build
```

### Test
```bash
npm run test
```

## Smart Contract Functions

### `deposit()`
- Allows users to deposit base tokens into the index fund
- Transfers tokens from user to contract
- Updates total base amount and user deposit records
- Emits deposit event

### `withdraw()`
- Allows users to withdraw their deposited tokens
- Transfers tokens back to user
- Updates total base amount and removes deposit record
- Emits withdrawal event

### `rebalance()`
- Rebalances the fund according to predefined allocations
- Calculates target amounts for each index token
- Determines buy/sell requirements (swap logic to be implemented)
- Emits rebalancing events

## Configuration

### Base Token
Configured in `assembly/const/baseToken.ts`:
```typescript
export const BASE_TOKEN = "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT";
```

### Index Tokens
Configured in `assembly/const/indexTokens.ts`:
```typescript
export const INDEX_TOKENS: Map<string, u32> = new Map<string, u32>();
INDEX_TOKENS.set("AS12LmTm4zRYkUQZusw7eevvV5ySzSwndJpENQ7EZHcmDbWafx96T", 50); // 50%
INDEX_TOKENS.set("AS12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq", 30); // 30%
INDEX_TOKENS.set("AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT", 20); // 20%
```

## Development Notes

### Recent Fixes Applied
1. **Corrected imports**: Updated to use proper Massa SDK imports
2. **Added Context usage**: Replaced `Address.fromEventOrigin()` with `Context.caller()` and `Context.callee()`
3. **Enhanced error handling**: Added null checks and proper error messages
4. **Improved storage management**: Added total_base tracking and proper cleanup
5. **Enhanced rebalance logic**: Added current balance checking and swap requirements calculation
6. **Updated token addresses**: Used proper Massa address format instead of placeholder tokens
7. **Added dependencies**: Added required packages to package.json

### Future Enhancements
- Implement actual token swap logic in rebalance function
- Add permission controls (admin functions)
- Implement fee collection mechanism
- Add slippage protection
- Integrate with DEX protocols for automated swapping
npm install
npm run build
```

## Deploy
Use Massa CLI or deployment tools to upload the generated `.wasm` file.
