import {Readable} from "stream";

export async function streamToBuffer(rs: Readable): Promise<Buffer> {
  return new Promise<Buffer> ((resolve, reject) => {
    const buf: any[] = [];
    rs.on("data", chunk => buf.push(chunk));
    rs.on("close", () => resolve(Buffer.concat(buf)));
    rs.on("error", err => reject(err));
  });
}

export async function bufferToString(buffer: Buffer): Promise<string> {
  return buffer.toString("utf-8");
}
