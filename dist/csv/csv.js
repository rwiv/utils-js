import fs from "fs-extra";
import { walkLines } from "../file/file.js";
export async function writeCsv(path, header) {
    await fs.writeFile(path, header);
}
export async function writeOneLine(path, data) {
    await fs.appendFile(path, data);
}
export async function updateCsvHeader(src, dest, header) {
    const h = header[header.length - 1] === "\n" ? header : header + "\n";
    await fs.writeFile(dest, h);
    await walkLines(fs.createReadStream(src), async (line, idx) => {
        if (idx === 0)
            return;
        await fs.appendFile(dest, line + "\n");
    });
}
export async function concatCsvFiles(dest, csvPaths, header = undefined) {
    let head = header;
    if (header === undefined) {
        head = await getCsvHeader(fs.createReadStream(csvPaths[0]));
    }
    if (head === undefined) {
        throw Error("head is null");
    }
    head = head[head.length - 1] === "\n" ? head : head + "\n";
    await fs.appendFile(dest, head);
    for (const csvPath of csvPaths) {
        const rs = fs.createReadStream(csvPath);
        await walkLines(rs, async (line, idx) => {
            if (idx === 0)
                return;
            if (line === "")
                return;
            await fs.appendFile(dest, line + "\n");
        });
    }
}
export async function getCsvHeader(rs) {
    let result = "";
    await walkLines(rs, async (line, idx, reader) => {
        if (idx === 0) {
            result = line;
            reader.close();
        }
    });
    return result;
}
