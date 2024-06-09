import { PassThrough } from "node:stream";
export function readableStreamToReadable(rs) {
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
export async function printReadable(rs) {
    return new Promise((resolve, reject) => {
        rs.on("data", data => {
            console.log(data.toString("utf-8"));
        });
        rs.on("close", () => {
            resolve();
        });
        rs.on("error", err => {
            reject(err);
        });
    });
}
