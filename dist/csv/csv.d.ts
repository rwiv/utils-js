/// <reference types="node" resolution-mode="require"/>
import fs from "fs-extra";
export declare function createCsv(path: string, header: string): Promise<void>;
export declare function writeOneLine(path: string, data: string): Promise<void>;
export declare function changeCsvHeader(src: string, dest: string, header: string): Promise<void>;
export declare function concatCsvs(dest: string, csvPaths: string[], header?: string | undefined): Promise<void>;
export declare function getCsvHeader(rs: fs.ReadStream): Promise<string>;
