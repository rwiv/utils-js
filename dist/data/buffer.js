export async function streamToBuffer(rs) {
    return new Promise((resolve, reject) => {
        const buf = [];
        rs.on("data", chunk => buf.push(chunk));
        rs.on("close", () => resolve(Buffer.concat(buf)));
        rs.on("error", err => reject(err));
    });
}
export async function bufferToString(buffer) {
    return buffer.toString("utf-8");
}
