/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { Writable } from "stream";
type WriteListener = (chunk: any, encoding: BufferEncoding) => void;
export declare class WriteStream extends Writable {
    protected readonly listener: WriteListener;
    constructor(listener: WriteListener);
    static from(listener: WriteListener): WriteStream;
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
    waitForClose(): Promise<void>;
}
export {};
