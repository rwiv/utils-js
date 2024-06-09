import archiver from "archiver";
import {Readable, Writable} from "stream";

export async function zip(
  dirPath: string,
  ws: Writable,
  walk: (
    dirPath: string,
    fn: (filePath: string, rs: Readable) => void,
  ) => Promise<void>,
) {
  const archive = archiver('zip');
  archive.pipe(ws);

  await walk(dirPath, (filePath, rs) => {
    const subPath = filePath.replace(dirPath, "");
    archive.append(rs, { name: subPath });
  });

  await archive.finalize();
}
