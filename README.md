# aconjs

**aconjs** is a powerful JavaScript library for converting media files to various audio formats using FFmpeg in the browser. It provides an easy-to-use API for transcoding audio and video files with support for multiple output formats.

## Features

- 🎵 Convert any media file to audio formats (MP3, WAV, OGG, etc.)
- 🎬 Extract audio from video files
- 🌐 Works entirely in the browser using WebAssembly
- 📦 TypeScript support with full type definitions
- 🚀 Simple and intuitive API
- ⚡ Built on top of FFmpeg.wasm for reliable media processing

## Installation

```bash
npm install aconjs
```

## Quick Start

```typescript
import { createTranscoder } from "aconjs";

// Create a transcoder instance
const transcoder = await createTranscoder();

// Convert a file to MP3
const file = document.getElementById("fileInput").files[0];
const mp3File = await transcoder.toMp3(file, "output.mp3");

// Download the converted file
const url = URL.createObjectURL(mp3File);
const a = document.createElement("a");
a.href = url;
a.download = "converted.mp3";
a.click();
```

## API Reference

### `createTranscoder(logCallback?: (log: string) => void)`

Creates a new transcoder instance with FFmpeg loaded and ready to use.

**Parameters:**

- `logCallback` (optional): A callback function to receive FFmpeg log messages

**Returns:** Promise that resolves to a transcoder object

**Example:**

```typescript
const transcoder = await createTranscoder((log) => {
  console.log("FFmpeg:", log);
});
```

### Transcoder Methods

#### `transcode(file: string | File | Blob, outputFileName: string)`

Converts a media file to the format specified by the output filename extension.

**Parameters:**

- `file`: Input file (File object, Blob, or URL string)
- `outputFileName`: Name of the output file with desired extension

**Returns:** Promise that resolves to a File object

**Example:**

```typescript
const wavFile = await transcoder.transcode(inputFile, "output.wav");
```

#### `toMp3(file: string | File | Blob, outputFileName: string, bitrate?: number)`

Converts a media file to MP3 format with optional bitrate control.

**Parameters:**

- `file`: Input file (File object, Blob, or URL string)
- `outputFileName`: Name of the output MP3 file
- `bitrate` (optional): Audio bitrate in kbps (default: 128)

**Returns:** Promise that resolves to a File object

**Example:**

```typescript
// Convert to MP3 with default bitrate (128kbps)
const mp3File = await transcoder.toMp3(inputFile, "output.mp3");

// Convert to MP3 with custom bitrate (320kbps)
const highQualityMp3 = await transcoder.toMp3(inputFile, "output.mp3", 320);
```

## Supported Input Formats

aconjs supports a wide range of input formats including:

- **Audio:** MP3, WAV, FLAC, AAC, OGG, M4A, WMA, and more
- **Video:** MP4, AVI, MOV, MKV, WebM, FLV, and more

## Supported Output Formats

The output format is determined by the file extension you specify:

- **MP3:** `.mp3`
- **WAV:** `.wav`
- **OGG:** `.ogg`
- **AAC:** `.aac`
- **FLAC:** `.flac`
- **M4A:** `.m4a`
- And many more supported by FFmpeg

## Advanced Usage

### Custom FFmpeg Options

For advanced users, you can use the `transcode` method with custom FFmpeg options by modifying the source code or extending the library.

### Error Handling

```typescript
try {
  const transcoder = await createTranscoder();
  const result = await transcoder.toMp3(file, "output.mp3");
  console.log("Conversion successful!", result);
} catch (error) {
  console.error("Conversion failed:", error);
}
```

### Progress Monitoring

```typescript
const transcoder = await createTranscoder((log) => {
  // Parse FFmpeg logs for progress information
  if (log.includes("time=")) {
    console.log("Progress:", log);
  }
});
```

## Browser Compatibility

aconjs works in modern browsers that support:

- WebAssembly
- SharedArrayBuffer (for better performance)
- File API

For browsers without SharedArrayBuffer support, the library will still work but may have reduced performance.

## Performance Considerations

- Large files may take significant time to process
- Processing happens entirely in the browser, so it depends on the user's device performance
- Consider showing a progress indicator for better user experience
- The first load may take some time as FFmpeg WebAssembly needs to be downloaded and initialized

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
