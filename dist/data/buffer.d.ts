/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ReadableStream } from "node:stream/web";
import { Readable } from "stream";
export declare function readableToBuffer(rs: Readable): Promise<Buffer>;
export declare function bufferToString(buffer: Buffer): Promise<string>;
export declare function readableStreamToBuffer(rs: ReadableStream): Promise<Buffer>;
