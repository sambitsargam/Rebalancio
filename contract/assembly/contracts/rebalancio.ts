import { Address, Storage } from '@massalabs/massa-as-sdk';
import { Context, generateEvent } from '@massalabs/massa-as-sdk';
import { TokenWrapper } from '@massalabs/sc-standards/assembly/contracts/FT';
import { u256 } from 'as-bignum/assembly';
import { INDEX_TOKENS } from '../const/indexTokens';
import { BASE_TOKEN } from '../const/baseToken';
import { percentageOf } from '../utils/math';

export function deposit(_: StaticArray<u8>): void {
  const sender = Context.caller();
  const baseToken = new TokenWrapper(new Address(BASE_TOKEN));
  const amount = baseToken.balanceOf(sender);
  
  // Transfer tokens from sender to this contract
  baseToken.transferFrom(sender, Context.callee(), amount);
  
  // Store the deposit amount
  Storage.set("deposit_" + sender.toString(), amount.toString());
  
  // Update total base amount
  const currentTotal = u256.fromString(Storage.get("total_base") || "0");
  const newTotal = currentTotal + amount;
  Storage.set("total_base", newTotal.toString());
  
  generateEvent("Deposited: " + amount.toString());
}

export function withdraw(_: StaticArray<u8>): void {
  const sender = Context.caller();
  const amountStr = Storage.get("deposit_" + sender.toString());
  
  if (amountStr === null || amountStr === "") {
    generateEvent("No deposit found for address: " + sender.toString());
    return;
  }
  
  const baseToken = new TokenWrapper(new Address(BASE_TOKEN));
  const amount = u256.fromString(amountStr!);
  
  // Transfer tokens back to sender
  baseToken.transfer(sender, amount);
  
  // Remove the deposit record
  Storage.del("deposit_" + sender.toString());
  
  // Update total base amount
  const currentTotal = u256.fromString(Storage.get("total_base") || "0");
  const newTotal = currentTotal >= amount ? currentTotal - amount : u256.Zero;
  Storage.set("total_base", newTotal.toString());
  
  generateEvent("Withdrawn: " + amount.toString());
}

export function rebalance(_: StaticArray<u8>): void {
  const totalBase = u256.fromString(Storage.get("total_base") || "0");
  
  if (totalBase == u256.Zero) {
    generateEvent("No funds to rebalance");
    return;
  }
  
  const tokenKeys = INDEX_TOKENS.keys();
  
  for (let i = 0; i < tokenKeys.length; i++) {
    let tokenKey = tokenKeys[i];
    let percent = INDEX_TOKENS.get(tokenKey);
    
    if (percent !== null) {
      let targetAmount = percentageOf(totalBase, percent!);
      
      // Get current token balance
      const tokenAddress = new Address(tokenKey);
      const token = new TokenWrapper(tokenAddress);
      const currentBalance = token.balanceOf(Context.callee());
      
      // Calculate difference and perform rebalancing
      if (targetAmount > currentBalance) {
        // Need to buy more tokens
        const buyAmount = targetAmount - currentBalance;
        generateEvent("Need to buy " + buyAmount.toString() + " of " + tokenKey);
        // TODO: Implement token swap logic here
      } else if (currentBalance > targetAmount) {
        // Need to sell some tokens
        const sellAmount = currentBalance - targetAmount;
        generateEvent("Need to sell " + sellAmount.toString() + " of " + tokenKey);
        // TODO: Implement token swap logic here
      }
      
      generateEvent("Rebalancing " + tokenKey + " to " + targetAmount.toString());
    }
  }
}

// View function to get user deposit amount
export function getUserDeposit(args: StaticArray<u8>): StaticArray<u8> {
  // In a real implementation, you'd decode the address from args
  // For now, we'll return the caller's deposit
  const sender = Context.caller();
  const amountStr = Storage.get("deposit_" + sender.toString());
  return new TextEncoder().encode(amountStr || "0");
}

// View function to get total base amount
export function getTotalBase(_: StaticArray<u8>): StaticArray<u8> {
  const totalBase = Storage.get("total_base") || "0";
  return new TextEncoder().encode(totalBase);
}

// View function to get index allocations
export function getIndexAllocations(_: StaticArray<u8>): StaticArray<u8> {
  let result = "";
  const tokenKeys = INDEX_TOKENS.keys();
  
  for (let i = 0; i < tokenKeys.length; i++) {
    let tokenKey = tokenKeys[i];
    let percent = INDEX_TOKENS.get(tokenKey);
    if (percent !== null) {
      result += tokenKey + ":" + percent!.toString();
      if (i < tokenKeys.length - 1) {
        result += ",";
      }
    }
  }
  
  return new TextEncoder().encode(result);
}
