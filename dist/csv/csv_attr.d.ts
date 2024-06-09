interface RowChunks {
    values: string[];
    headerNames: string[];
}
export declare function findValue(rowChunks: RowChunks, headerName: string): string;
export declare function findValueBool(rowChunks: RowChunks, headerName: string): boolean;
export declare function findValueInt(rowChunks: RowChunks, headerName: string): number | undefined;
export {};
