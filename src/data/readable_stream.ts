import {Readable} from "stream";
import {ReadableStream} from "node:stream/web";

export function readableToReadableStream(nodeReadable: Readable): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      nodeReadable.on('data', (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });

      nodeReadable.on('end', () => {
        controller.close();
      });

      nodeReadable.on('error', (err: Error) => {
        controller.error(err);
      });
    },
    cancel() {
      nodeReadable.destroy();
    }
  });
}

export async function printReadableStream(rs: ReadableStream) {
  const reader = rs.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    console.log(Buffer.from(value).toString());
  }
}
