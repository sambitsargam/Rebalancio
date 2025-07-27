declare global {
  type u8 = number;
  type u32 = number;
  type u64 = bigint;
  type i32 = number;
  type i64 = bigint;
  type bool = boolean;
  
  class StaticArray<T> {
    static fromArray<T>(array: T[]): StaticArray<T>;
    [index: number]: T;
    length: i32;
  }
  
  class Map<K, V> {
    constructor();
    set(key: K, value: V): void;
    get(key: K): V | null;
    has(key: K): bool;
    keys(): K[];
    values(): V[];
    delete(key: K): bool;
  }
}

export {};
