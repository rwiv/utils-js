/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ReadableStream } from "node:stream/web";
import { Readable } from "stream";
export declare function readableStreamToReadable(rs: ReadableStream): Readable;
export declare function printReadable(rs: Readable): Promise<void>;
