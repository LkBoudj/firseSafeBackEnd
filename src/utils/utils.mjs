import fs from "fs";
import os from "os";
import { pathJoin } from "../../direFilePath.mjs";
import { exec, spawn, spawnSync } from "child_process";

export const hostName = "http://localhost:3000";
export function testRTSPStream(rtspUrl) {
  // Spawn a child process running ffmpeg synchronously
  const ffmpegProcess = spawnSync("ffmpeg", [
    "-i",
    rtspUrl,
    "-f",
    "null", // Output format (null for no output)
    "-",
  ]);

  // Log stdout data
  if (ffmpegProcess.stdout) {
    console.log("FFmpeg stdout:", ffmpegProcess.stdout.toString());
  }

  // Log stderr data
  if (ffmpegProcess.stderr) {
    console.error("FFmpeg stderr:", ffmpegProcess.stderr.toString());
  }

  // Log exit code
  console.log(`FFmpeg process exited with code ${ffmpegProcess.status}`);

  return ffmpegProcess.status;
}

// Use the full path to the kill command based on the operating system
const killCommand =
  process.platform === "win32"
    ? "C:\\Windows\\System32\\kill.exe"
    : "/bin/kill";

export const killProcess = (pid) => {
  const result = spawnSync(killCommand, [pid]);

  if (result.error) {
    console.error("Error occurred while killing the process:", result.error);
    return false;
  }

  if (result.status !== 0) {
    console.error(`Failed to kill process with PID ${pid}`);
    if (result.stderr) {
      console.error("stderr:", result.stderr.toString());
    }
    return false;
  }

  console.log(`Process with PID ${pid} killed successfully.`);
  return true;
};

export const createThumbnail = async (rtsp, dirRecorders, name) => {
  try {
    const myPath = await pathJoin(dirRecorders, name, "thumbnail.jpg");
    const url = `${dirRecorders}/${name}/thumbnail.jpg`;

    if (!fs.existsSync(myPath)) {
      const options = [
        "-v",
        "quiet", // Suppress ffmpeg output during thumbnail generation
        "-i",
        rtsp,
        "-ss",
        "00:00:05", // Seek to 5th second (adjust as needed)
        "-vframes",
        "1", // Capture only 1 frame
        "-vf",
        "scale=320:240", // Resize thumbnail (optional)
        `${myPath}`,
      ];

      const { pid, error } = spawnSync("ffmpeg", options);

      if (error) {
        return { success: false, url: null, processId: pid };
      }
      return { success: true, url, processId: pid };
    } else {
      return { success: true, url, processId: null };
    }
  } catch (e) {
    return { success: false, url: null, processId: null };
  }
};

export const createStreamer = async (rtsp, dirRecorders, name) => {
  const myPath = await pathJoin(dirRecorders, name, "stream.m3u8");
  const url = `${dirRecorders}/${name}/stream.m3u8`;
  const options = [
    "-v",
    "verbose",
    "-i",
    rtsp,

    "-vf",
    "scale=1920:1080",
    "-vcodec",
    "libx264",
    "-preset",
    "ultrafast", // Use ultrafast preset for fastest encoding
    "-r",
    "25",
    "-b:v",
    "100k", // Adjust the bitrate as needed
    "-crf",
    "31",
    "-acodec",
    "aac",
    "-sc_threshold",
    "0",
    "-f",
    "hls",
    "-hls_time",
    "1",
    "-segment_time",
    "1",
    "-hls_list_size",
    "1",
    `${myPath}`,
  ];
  try {
    console.log("_____________starting 1 _________");
    const { pid, error } = await spawn("ffmpeg", options);
    console.log("_____________starting 2_________");
    if (error) {
      return { success: false, url: null, processId: pid };
    }
    return { success: true, url, processId: pid };
  } catch (e) {
    return { success: false, url: null, processId: null };
  }
};

export const getPathFolder = (folder_dir, ...props) =>
  pathJoin(folder_dir, props);

export const createFolderIfNotExists = async (dirRecorders, name) => {
  const myPath = await pathJoin(dirRecorders, name);

  if (!fs.existsSync(myPath)) {
    fs.mkdirSync(myPath);
  }
};
