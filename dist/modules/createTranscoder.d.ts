export declare const createTranscoder: (logCallback?: (log: string) => void) => Promise<{
    transcode: (file: string | File | Blob, outputFileName: string) => Promise<File>;
    toMp3: (file: string | File | Blob, outputFileName: string, bitrate?: number) => Promise<File>;
}>;
//# sourceMappingURL=createTranscoder.d.ts.map