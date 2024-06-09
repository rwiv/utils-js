export async function toBuffer(rs) {
    return new Promise((resolve, reject) => {
        const buf = [];
        rs.on("data", chunk => buf.push(chunk));
        rs.on("close", () => resolve(Buffer.concat(buf)));
        rs.on("error", err => reject(err));
    });
}
