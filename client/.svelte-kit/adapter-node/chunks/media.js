import fs from "fs";
function getMediaDir() {
  return fs.readdirSync(import.meta.dirname + "/media/");
}
async function getMediaFile(file, start = 0) {
  const fileDir = import.meta.dirname + `/media/${file}`;
  if (!fs.existsSync(fileDir)) {
    return void 0;
  }
  const size = fs.statSync(fileDir).size;
  const fileStream = fs.createReadStream(fileDir, { start, end: size - 1 });
  return {
    data: fileStream,
    size
  };
}
function readMedia() {
  let videos = {};
  const mediaDir = import.meta.dirname + "/media/";
  fs.readdirSync(mediaDir).forEach((folder) => {
    fs.readdirSync(`${mediaDir}${folder}`).forEach((file) => {
      const [, ext] = file.split(".");
      const fileDest = `${folder}/${file}`;
      const vidExt = ["mp4", "webm"];
      const capExt = ["vtt"];
      if (!videos[folder])
        videos[folder] = [];
      if (vidExt.includes(ext)) {
        videos[folder].push({
          type: "video",
          src: fileDest
        });
      }
      if (capExt.includes(ext)) {
        videos[folder].push({
          type: "captions",
          src: fileDest
        });
      }
    });
  });
  return videos;
}
export {
  getMediaDir as a,
  getMediaFile as g,
  readMedia as r
};
