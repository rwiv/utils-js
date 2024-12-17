/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Dirent } from "node:fs";
import readline from "readline";
import { ReadStream } from "node:fs";
export declare function readFile(filepath: string): Promise<string>;
export declare function ensureDir(dirPath: string): Promise<void>;
export declare function walkLines(input: ReadStream, fn: (line: string, idx: number, reader: readline.Interface) => Promise<void>): Promise<void>;
export declare function readLines(input: ReadStream): Promise<string[]>;
export declare function walk(dirPath: string, fn: (file: Dirent) => Promise<void>): Promise<void>;
export interface FileInfo {
    filename: string;
    absPath: string;
    isDirectory: boolean;
    size: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
}
export declare function exists(filepath: string): Promise<boolean>;
export declare function readdir(dirPath: string): Promise<FileInfo[]>;
export declare function readdirRecur(dirPath: string): Promise<FileInfo[]>;
export declare function travel(baseDir: FileInfo, fn: (file: FileInfo) => void): Promise<void>;
export declare function travelPromise(baseDir: FileInfo, fn: (file: FileInfo) => Promise<void>): Promise<void>;
export declare function getFileInfo(basePath: string, filename: string): Promise<FileInfo>;
