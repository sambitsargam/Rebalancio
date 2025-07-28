import { Address, Storage } from '@massalabs/massa-as-sdk';
import { Context, generateEvent } from '@massalabs/massa-as-sdk';
import { stringToBytes } from '@massalabs/as-types';
import { INDEX_TOKENS } from '../const/indexTokens';

export function deposit(_: StaticArray<u8>): void {
  const sender = Context.caller();
  // For MVP, we'll simulate deposits with a fixed amount
  const amount = "1000000"; // 1 token with 6 decimals
  
  // Store the deposit amount
  Storage.set("deposit_" + sender.toString(), amount);
  
  // Update total base amount - simple addition for MVP
  const currentTotalStr = Storage.get("total_base") || "0";
  const currentTotal = parseInt(currentTotalStr);
  const newTotal = currentTotal + parseInt(amount);
  Storage.set("total_base", newTotal.toString());
  
  generateEvent("Deposited: " + amount + " by " + sender.toString());
}

export function withdraw(_: StaticArray<u8>): void {
  const sender = Context.caller();
  const amountStr = Storage.get("deposit_" + sender.toString());
  
  if (amountStr === null || amountStr === "") {
    generateEvent("No deposit found for address: " + sender.toString());
    return;
  }
  
  // Remove the deposit record
  Storage.del("deposit_" + sender.toString());
  
  // Update total base amount
  const currentTotalStr = Storage.get("total_base") || "0";
  const currentTotal = parseInt(currentTotalStr);
  const amount = parseInt(amountStr!);
  const newTotal = currentTotal >= amount ? currentTotal - amount : 0;
  Storage.set("total_base", newTotal.toString());
  
  generateEvent("Withdrawn: " + amountStr + " by " + sender.toString());
}

export function rebalance(_: StaticArray<u8>): void {
  const totalBaseStr = Storage.get("total_base") || "0";
  const totalBase = parseInt(totalBaseStr);
  
  if (totalBase == 0) {
    generateEvent("No funds to rebalance");
    return;
  }
  
  // Iterate over tokens manually
  const tokens = ["AS12LmTm4zRYkUQZusw7eevvV5ySzSwndJpENQ7EZHcmDbWafx96T", 
                  "AS12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq", 
                  "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT"];
  
  for (let i = 0; i < tokens.length; i++) {
    let tokenKey = tokens[i];
    let percent = INDEX_TOKENS.get(tokenKey);
    
    if (percent !== null) {
      // Simple percentage calculation for MVP
      let targetAmount = (totalBase * percent!) / 100;
      
      // Store the target allocation for this token
      Storage.set("allocation_" + tokenKey, targetAmount.toString());
      
      generateEvent("Rebalancing " + tokenKey + " to " + targetAmount.toString() + " (" + percent!.toString() + "%)");
    }
  }
  
  // Update last rebalance timestamp
  Storage.set("last_rebalance", Context.timestamp().toString());
  generateEvent("Rebalance completed at " + Context.timestamp().toString());
}

// View function to get user deposit amount
export function getUserDeposit(_: StaticArray<u8>): StaticArray<u8> {
  const sender = Context.caller();
  const amountStr = Storage.get("deposit_" + sender.toString());
  return stringToBytes(amountStr || "0");
}

// View function to get total base amount
export function getTotalBase(_: StaticArray<u8>): StaticArray<u8> {
  const totalBase = Storage.get("total_base") || "0";
  return stringToBytes(totalBase);
}

// View function to get index allocations
export function getIndexAllocations(_: StaticArray<u8>): StaticArray<u8> {
  let result = "";
  const tokens = ["AS12LmTm4zRYkUQZusw7eevvV5ySzSwndJpENQ7EZHcmDbWafx96T", 
                  "AS12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq", 
                  "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT"];
  
  for (let i = 0; i < tokens.length; i++) {
    let tokenKey = tokens[i];
    let percent = INDEX_TOKENS.get(tokenKey);
    if (percent !== null) {
      result += tokenKey + ":" + percent!.toString();
      if (i < tokens.length - 1) {
        result += ",";
      }
    }
  }
  
  return stringToBytes(result);
}

// View function to get current allocations
export function getCurrentAllocations(_: StaticArray<u8>): StaticArray<u8> {
  let result = "";
  const tokens = ["AS12LmTm4zRYkUQZusw7eevvV5ySzSwndJpENQ7EZHcmDbWafx96T", 
                  "AS12UBnqTHDQALpocVBnkPNy7y5CndUJQTLutaVDDFgMJcq5kQiKq", 
                  "AS12BqZEQ6sByhRLyEuf0YbQmcF2PsDdkNNG1akBJu9XcjZA1eT"];
  
  for (let i = 0; i < tokens.length; i++) {
    let tokenKey = tokens[i];
    let allocation = Storage.get("allocation_" + tokenKey) || "0";
    result += tokenKey + ":" + allocation;
    if (i < tokens.length - 1) {
      result += ",";
    }
  }
  
  return stringToBytes(result);
}

// View function to get last rebalance time
export function getLastRebalanceTime(_: StaticArray<u8>): StaticArray<u8> {
  const lastRebalance = Storage.get("last_rebalance") || "0";
  return stringToBytes(lastRebalance);
}
