"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranscoder = void 0;
const ffmpeg_1 = require("@ffmpeg/ffmpeg");
const util_1 = require("@ffmpeg/util");
const transcoder_1 = require("./transcoder");
const createTranscoder = async (logCallback) => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    const ffmpeg = new ffmpeg_1.FFmpeg();
    ffmpeg.on("log", ({ message }) => {
        logCallback?.(message);
    });
    await ffmpeg.load({
        coreURL: await (0, util_1.toBlobURL)(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await (0, util_1.toBlobURL)(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    return {
        transcode: (file, outputFileName) => (0, transcoder_1.transcoder)({
            ffmpeg,
            file,
            outputFileName,
        }),
        toMp3: (file, outputFileName, bitrate = 128) => {
            return (0, transcoder_1.transcoder)({
                ffmpeg,
                file,
                outputFileName,
                options: ["-vn", "-acodec", "libmp3lame", "-b:a", `${bitrate}k`],
            });
        },
    };
};
exports.createTranscoder = createTranscoder;
//# sourceMappingURL=createTranscoder.js.map