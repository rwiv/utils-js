import fs from "fs-extra";
import {walkLines} from "../file/file.js";

export async function writeCsv(path: string, header: string) {
  await fs.writeFile(path, header);
}

export async function writeOneLine(path: string, data: string) {
  await fs.appendFile(path, data);
}

export async function updateCsvHeader(src: string, dest: string, header: string) {
  const h = header[header.length - 1] === "\n" ? header : header + "\n";
  await fs.writeFile(dest, h);
  await walkLines(fs.createReadStream(src), async (line, idx) => {
    if (idx === 0) return;
    await fs.appendFile(dest, line + "\n");
  });
}

export async function concatCsvFiles(dest: string, csvPaths: string[], header: string | undefined = undefined) {
  let head: string | undefined = header;
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
      if (idx === 0) return;
      if (line === "") return;
      await fs.appendFile(dest, line + "\n");
    });
  }
}

export async function getCsvHeader(rs: fs.ReadStream): Promise<string> {
  let result = "";
  await walkLines(rs, async (line, idx, reader) => {
    if (idx === 0) {
      result = line;
      reader.close();
    }
  });
  return result;
}
