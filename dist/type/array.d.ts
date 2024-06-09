export declare function subArrays<T>(origin: T[], n: number): T[][];
export type IdxElem<T> = {
    idx: number;
    value: T;
};
export declare function subArraysWithIdx<T>(origin: T[], n: number): IdxElem<T>[][];
export declare function toMap<T>(arr: T[], getKey: (elem: T, idx: number, elems: T[]) => string): Map<string, T>;
export declare function toArrayMap<T>(arr: T[], getKey: (elem: T, idx: number, elems: T[]) => string): Map<string, T[]>;
export declare function first<T>(arr: T[], fn: (elem: T) => boolean): T | undefined;
