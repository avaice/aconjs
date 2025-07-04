import { createTranscoder } from "./modules/createTranscoder";

async function main() {
  const transcoder = await createTranscoder((log) => console.log(log));
  const result = await transcoder.toMp3(
    "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi",
    "output.mp3",
    64
  );

  // blob url
  const blobURL = URL.createObjectURL(result);
  console.log(blobURL);
}

main();
