/// <reference types="node" resolution-mode="require"/>
import { Readable, Writable } from "stream";
export declare function zip(dirPath: string, ws: Writable, walk: (dirPath: string, fn: (filePath: string, rs: Readable) => void) => Promise<void>): Promise<void>;
