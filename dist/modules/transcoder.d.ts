import { FFmpeg } from "@ffmpeg/ffmpeg";
export declare const transcoder: ({ ffmpeg, file, outputFileName, options, }: {
    ffmpeg: FFmpeg;
    file: string | File | Blob;
    outputFileName: string;
    options?: string[];
}) => Promise<File>;
//# sourceMappingURL=transcoder.d.ts.map