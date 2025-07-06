import { Address, Storage, generateEvent } from '@massalabs/massa-as-sdk';
import { TokenWrapper } from '@massalabs/sc-standards/assembly/contracts/FT';
import { u256 } from 'as-bignum/assembly';
import { INDEX_TOKENS } from '../const/indexTokens';
import { BASE_TOKEN } from '../const/baseToken';
import { percentageOf } from '../utils/math';

export function deposit(_: StaticArray<u8>): void {
  const sender = Address.fromEventOrigin();
  const baseToken = new TokenWrapper(new Address(BASE_TOKEN));
  const amount = baseToken.balanceOf(sender);
  Storage.set("deposit_" + sender.toString(), amount.toString());
  generateEvent("Deposited: " + amount.toString());
}

export function withdraw(_: StaticArray<u8>): void {
  const sender = Address.fromEventOrigin();
  const amountStr = Storage.get("deposit_" + sender.toString());
  if (amountStr === null) return;
  const baseToken = new TokenWrapper(new Address(BASE_TOKEN));
  const amount = u256.fromString(amountStr!);
  baseToken.transfer(sender, amount);
  Storage.del("deposit_" + sender.toString());
  generateEvent("Withdrawn: " + amount.toString());
}

export function rebalance(_: StaticArray<u8>): void {
  const totalBase = u256.fromString(Storage.get("total_base") || "0");
  for (let i = 0; i < INDEX_TOKENS.keys().length; i++) {
    let tokenKey = INDEX_TOKENS.keys()[i];
    let percent = INDEX_TOKENS.get(tokenKey);
    let targetAmount = percentageOf(totalBase, percent!);
    generateEvent("Rebalancing " + tokenKey + " to " + targetAmount.toString());
  }
}
