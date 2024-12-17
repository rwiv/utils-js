export declare function subLists<T>(list: T[], n: number): T[][];
export type IdxElem<T> = {
    idx: number;
    value: T;
};
export declare function subListsWithIdx<T>(list: T[], n: number): IdxElem<T>[][];
export declare function toMap<T>(arr: T[], getKeyFn: (elem: T, idx: number, elems: T[]) => string): Map<string, T>;
export declare function toListMap<T>(arr: T[], getKey: (elem: T, idx: number, elems: T[]) => string): Map<string, T[]>;
export declare function getFirstElem<T>(arr: T[], fn: (elem: T) => boolean): T | undefined;
