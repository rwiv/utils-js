/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Readable } from "stream";
import { ReadableStream } from "node:stream/web";
export declare function readableToReadableStream(nodeReadable: Readable): ReadableStream<Uint8Array>;
export declare function printReadableStream(rs: ReadableStream): Promise<void>;
