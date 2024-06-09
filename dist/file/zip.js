import archiver from "archiver";
export async function zip(dirPath, ws, walk) {
    const archive = archiver('zip');
    archive.pipe(ws);
    await walk(dirPath, (filePath, rs) => {
        const subPath = filePath.replace(dirPath, "");
        archive.append(rs, { name: subPath });
    });
    await archive.finalize();
}
