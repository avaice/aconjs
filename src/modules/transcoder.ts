import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import mime from "mime/lite";

export const transcoder = async ({
  ffmpeg,
  file,
  outputFileName,
  options = [],
}: {
  ffmpeg: FFmpeg;
  file: string | File | Blob;
  outputFileName: string;
  options?: string[];
}): Promise<File> => {
  await ffmpeg.writeFile("input", await fetchFile(file));
  await ffmpeg.exec(["-i", "input", outputFileName, ...options]);
  const data = await ffmpeg.readFile(outputFileName);
  const mimeType = mime.getType(outputFileName) || "application/octet-stream";
  const outputFile = new File([data], outputFileName, {
    type: mimeType,
  });
  return outputFile;
};
