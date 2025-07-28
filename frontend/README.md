# Rebalancio Frontend

A modern React-based frontend for the Rebalancio decentralized index fund on Massa blockchain.

## Features

- 🔗 **Massa Wallet Integration**: Connect with MassaStation and other Massa-compatible wallets
- 💰 **Portfolio Management**: Deposit, withdraw, and view your index fund positions
- 🔄 **Auto-Rebalancing**: Trigger portfolio rebalancing with a single click
- 📊 **Real-time Data**: Live portfolio values and allocation tracking
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast & Secure**: Built with Vite and TypeScript for optimal performance

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Massa Web3** - Massa blockchain interaction
- **Massa Wallet Provider** - Wallet connection handling

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Massa wallet (MassaStation recommended)

## Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd Rebalancio/frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Update configuration**:
   - Edit `src/utils/config.ts` to set the correct contract address
   - Update network settings if needed

4. **Start development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DAppInterface.tsx    # Main app interface
│   │   └── LandingPage.tsx      # Landing/connect page
│   ├── utils/
│   │   └── config.ts           # Configuration and utilities
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## Key Components

### App.tsx
- Main application entry point
- Handles wallet connection state
- Routes between landing page and main interface

### LandingPage.tsx
- Welcome screen with project features
- Wallet connection interface
- Error handling for connection issues

### DAppInterface.tsx
- Main portfolio management interface
- Deposit/withdraw functionality
- Portfolio rebalancing
- Real-time data fetching
- Transaction status tracking

## Smart Contract Integration

The frontend interacts with the Rebalancio smart contract through several functions:

### Read Functions (View Data)
- `getUserDeposit()` - Get user's deposited amount
- `getTotalBase()` - Get total fund value
- `getIndexAllocations()` - Get token allocation percentages

### Write Functions (Transactions)
- `deposit()` - Deposit tokens into the fund
- `withdraw()` - Withdraw user's deposited tokens
- `rebalance()` - Trigger portfolio rebalancing

## Configuration

### Contract Address
Update the contract address in `src/utils/config.ts`:

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT",
  // ... other config
};
```

### Network Settings
Switch between mainnet and testnet in the config:

```typescript
NETWORK: {
  MAINNET: 'mainnet',
  TESTNET: 'testnet', 
  CURRENT: 'testnet', // Change for production
},
```

## Error Handling

The frontend includes comprehensive error handling for:

- Wallet connection failures
- Transaction errors
- Network connectivity issues
- Smart contract errors
- Input validation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Development Tips

1. **Hot Reload**: Changes are automatically reflected in the browser
2. **TypeScript**: Use TypeScript for better development experience
3. **Console Logs**: Check browser console for detailed error information
4. **Wallet Testing**: Use testnet for development and testing

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Web Server

Upload the contents of `dist/` to your web server or hosting platform.

### Deploy to IPFS/DeWeb

For decentralized hosting:

1. Build the application
2. Upload to IPFS
3. Access via IPFS gateway or DeWeb

## Troubleshooting

### Common Issues

1. **Wallet Not Found**
   - Install MassaStation or compatible wallet
   - Ensure wallet extension is enabled

2. **Transaction Failures**
   - Check gas limits in configuration
   - Verify contract address is correct
   - Ensure sufficient token balance

3. **Network Errors**
   - Check internet connection
   - Verify Massa network status
   - Try refreshing the page

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Debug Mode

Enable debug mode by setting localStorage:

```javascript
localStorage.setItem('debug', 'true');
```

This will show additional console logs for debugging.

## Security

- Always verify contract addresses before transactions
- Use testnet for development and testing
- Keep wallet software updated
- Never share private keys or seed phrases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Recent Updates

### Frontend Fixes Applied

1. **Smart Contract Integration**:
   - Fixed function calls to match actual contract methods
   - Updated parameter handling for deposit/withdraw
   - Added proper error handling for contract interactions

2. **Token Amount Handling**:
   - Implemented proper decimal conversion (9 decimals for Massa)
   - Added validation for amount inputs
   - Fixed display formatting for token amounts

3. **Wallet Connection**:
   - Enhanced error handling for wallet connection
   - Added proper disconnection handling
   - Improved address display and copying

4. **Transaction Management**:
   - Added proper gas limit configuration
   - Enhanced transaction status tracking
   - Improved error message display

5. **Configuration Management**:
   - Created centralized config file
   - Added utility functions for common operations
   - Improved maintainability

6. **Build Configuration**:
   - Updated Vite config for Node.js polyfills
   - Fixed dependency resolution issues
   - Enhanced development experience

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section
- Open an issue on GitHub
- Join the community Discord
