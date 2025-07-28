// Essential polyfills for Massa SDK in the browser
import { Buffer } from 'buffer';
import process from 'process';

// Simple and effective polyfill setup
(globalThis as unknown as Record<string, unknown>).global = globalThis;
(globalThis as unknown as Record<string, unknown>).Buffer = Buffer;
(globalThis as unknown as Record<string, unknown>).process = process;

// Set up process environment for browser
if (!process.env) {
  process.env = {};
}

// Essential process.nextTick polyfill
if (!process.nextTick) {
  process.nextTick = (callback: (...args: unknown[]) => void, ...args: unknown[]) => {
    setTimeout(() => callback(...args), 0);
  };
}

export {};
