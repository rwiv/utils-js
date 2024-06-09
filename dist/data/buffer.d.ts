/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Readable } from "stream";
export declare function streamToBuffer(rs: Readable): Promise<Buffer>;
export declare function bufferToString(buffer: Buffer): Promise<string>;
