import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { transcoder } from "./transcoder";

export const createTranscoder = async (logCallback?: (log: string) => void) => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ message }) => {
    logCallback?.(message);
  });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  return {
    transcode: (file: string | File | Blob, outputFileName: string) =>
      transcoder({
        ffmpeg,
        file,
        outputFileName,
      }),
    toMp3: (
      file: string | File | Blob,
      outputFileName: string,
      bitrate: number = 128
    ) => {
      return transcoder({
        ffmpeg,
        file,
        outputFileName,
        options: ["-vn", "-acodec", "libmp3lame", "-b:a", `${bitrate}k`],
      });
    },
  };
};
