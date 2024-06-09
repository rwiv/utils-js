/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import readline from "readline";
import { ReadStream } from "node:fs";
export declare function readFile(filepath: string): Promise<string>;
export declare function walkLines(input: ReadStream, fn: (line: string, idx: number, reader: readline.Interface) => Promise<void>): Promise<void>;
export declare function readLines(input: ReadStream): Promise<string[]>;
