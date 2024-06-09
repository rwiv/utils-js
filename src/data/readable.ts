import {ReadableStream} from "node:stream/web";
import {Readable} from "stream";
import {PassThrough} from "node:stream";

export function readableStreamToReadable(rs: ReadableStream): Readable {
  const passThrough = new PassThrough();
  const reader = rs.getReader();

  const pump = async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        passThrough.end();
        break;
      }
      passThrough.write(Buffer.from(value));
    }
  };

  pump().catch(err => passThrough.emit('error', err));

  return passThrough;
}

export async function printReadable(rs: Readable) {
  return new Promise<void>((resolve, reject) => {
    rs.on("data", data => {
      console.log((data as Buffer).toString("utf-8"));
    });
    rs.on("close", () => {
      resolve();
    });
    rs.on("error", err => {
      reject(err);
    })
  });
}
