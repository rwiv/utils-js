interface RowChunks {
    values: string[];
    headerNames: string[];
}
export declare function findCsvValue(rowChunks: RowChunks, headerName: string): string;
export declare function findCsvBool(rowChunks: RowChunks, headerName: string): boolean;
export declare function findCsvInt(rowChunks: RowChunks, headerName: string): number | undefined;
export {};
