/// <reference types="node" resolution-mode="require"/>
import fs from "fs";
export declare function writeCsv(path: string, header: string): Promise<void>;
export declare function writeOneLine(path: string, data: string): Promise<void>;
export declare function updateCsvHeader(src: string, dest: string, header: string): Promise<void>;
export declare function concatCsvFiles(dest: string, csvPaths: string[], header?: string | undefined): Promise<void>;
export declare function getCsvHeader(rs: fs.ReadStream): Promise<string>;
