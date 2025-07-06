import { u256 } from "as-bignum/assembly";

export function percentageOf(amount: u256, percent: u32): u256 {
  return amount * u256.fromU32(percent) / u256.fromU32(100);
}
