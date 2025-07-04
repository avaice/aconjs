import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { transcoder } from "./transcoder";
export const createTranscoder = async (logCallback) => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
    const ffmpeg = new FFmpeg();
    ffmpeg.on("log", ({ message }) => {
        logCallback?.(message);
    });
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    return {
        transcode: (file, outputFileName) => transcoder({
            ffmpeg,
            file,
            outputFileName,
        }),
        toMp3: (file, outputFileName, bitrate = 128) => {
            return transcoder({
                ffmpeg,
                file,
                outputFileName,
                options: ["-vn", "-acodec", "libmp3lame", "-b:a", `${bitrate}k`],
            });
        },
    };
};
//# sourceMappingURL=createTranscoder.js.map