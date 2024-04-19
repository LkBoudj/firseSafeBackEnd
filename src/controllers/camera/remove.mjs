import cameraModel from "../../models/camera.mjs";
import {
  createThumbnail,
  createStreamer,
  getPathFolder,
  killProcess,
  hostName,
  createFolderIfNotExists,
} from "../../utils/utils.mjs";

const removeCamera = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recorder = await cameraModel.findById(id);

    if (recorder) {
      //const isKill = await killProcess(parseInt(recorder.pid));
      console.log(`isKill ${process.kill(recorder.pid)}`);
      //await recorder.deleteOne();
    }

    res.json({ success: true, data: recorder, errors: [] });
  } catch (e) {
    console.log(e);
    const error = new Error("Failed to delete!! ");
    error.status = 404;
    next(error);
  }
};

export default removeCamera;
