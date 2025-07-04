"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcoder = void 0;
const util_1 = require("@ffmpeg/util");
const lite_1 = __importDefault(require("mime/lite"));
const transcoder = async ({ ffmpeg, file, outputFileName, options = [], }) => {
    await ffmpeg.writeFile("input", await (0, util_1.fetchFile)(file));
    await ffmpeg.exec(["-i", "input", outputFileName, ...options]);
    const data = await ffmpeg.readFile(outputFileName);
    const mimeType = lite_1.default.getType(outputFileName) || "application/octet-stream";
    const outputFile = new File([data], outputFileName, {
        type: mimeType,
    });
    return outputFile;
};
exports.transcoder = transcoder;
//# sourceMappingURL=transcoder.js.map