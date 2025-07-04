import { fetchFile } from "@ffmpeg/util";
import mime from "mime/lite";
export const transcoder = async ({ ffmpeg, file, outputFileName, options = [], }) => {
    await ffmpeg.writeFile("input", await fetchFile(file));
    await ffmpeg.exec(["-i", "input", outputFileName, ...options]);
    const data = await ffmpeg.readFile(outputFileName);
    const mimeType = mime.getType(outputFileName) || "application/octet-stream";
    const outputFile = new File([data], outputFileName, {
        type: mimeType,
    });
    return outputFile;
};
//# sourceMappingURL=transcoder.js.map