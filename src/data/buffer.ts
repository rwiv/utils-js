import {Readable} from "stream";

export async function toBuffer(rs: Readable): Promise<Buffer> {
  return new Promise<Buffer> ((resolve, reject) => {
    const buf: any[] = [];
    rs.on("data", chunk => buf.push(chunk));
    rs.on("close", () => resolve(Buffer.concat(buf)));
    rs.on("error", err => reject(err));
  });
}
