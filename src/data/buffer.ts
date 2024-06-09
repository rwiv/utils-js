import {ReadableStream} from "node:stream/web";
import {Readable} from "stream";

export async function readableToBuffer(rs: Readable): Promise<Buffer> {
  return new Promise<Buffer> ((resolve, reject) => {
    const buf: any[] = [];
    rs.on("data", chunk => buf.push(chunk));
    rs.on("end", () => resolve(Buffer.concat(buf)));
    rs.on("error", err => reject(err));
  });
}

export async function bufferToString(buffer: Buffer): Promise<string> {
  return buffer.toString("utf-8");
}

export function readableStreamToBuffer(rs: ReadableStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    const reader = rs.getReader();

    const readChunk = ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        resolve(Buffer.concat(chunks));
        return;
      }
      if (value !== undefined) {
        chunks.push(value);
      }
      reader.read().then(readChunk).catch(reject);
    };

    reader.read().then(readChunk).catch(reject);
  });
}
