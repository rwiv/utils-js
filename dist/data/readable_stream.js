import { ReadableStream } from "node:stream/web";
export function readableToReadableStream(nodeReadable) {
    return new ReadableStream({
        start(controller) {
            nodeReadable.on('data', (chunk) => {
                controller.enqueue(new Uint8Array(chunk));
            });
            nodeReadable.on('end', () => {
                controller.close();
            });
            nodeReadable.on('error', (err) => {
                controller.error(err);
            });
        },
        cancel() {
            nodeReadable.destroy();
        }
    });
}
export async function printReadableStream(rs) {
    const reader = rs.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        console.log(Buffer.from(value).toString());
    }
}
