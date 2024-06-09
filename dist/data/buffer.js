export async function readableToBuffer(rs) {
    return new Promise((resolve, reject) => {
        const buf = [];
        rs.on("data", chunk => buf.push(chunk));
        rs.on("end", () => resolve(Buffer.concat(buf)));
        rs.on("error", err => reject(err));
    });
}
export async function bufferToString(buffer) {
    return buffer.toString("utf-8");
}
export function readableStreamToBuffer(rs) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        const reader = rs.getReader();
        const readChunk = ({ done, value }) => {
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
