#!/bin/bash

echo "Installing Rebalancio Frontend Dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "Error: Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Frontend dependencies installed successfully!"
    echo ""
    echo "📋 Available commands:"
    echo "  npm run dev     - Start development server"
    echo "  npm run build   - Build for production"
    echo "  npm run preview - Preview production build"
    echo "  npm run lint    - Run ESLint"
    echo ""
    echo "🚀 To start development server:"
    echo "  npm run dev"
    echo ""
    echo "📝 Before running, update the contract address in:"
    echo "  src/utils/config.ts"
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
