import cameraModel from "../../models/camera.mjs";
import {
  createThumbnail,
  createStreamer,
  getPathFolder,
  killProcess,
  hostName,
  createFolderIfNotExists,
} from "../../utils/utils.mjs";

const createCamera = async (req, res, next) => {
  try {
    const { id, dirRecorders } = req.user;
    const { rtsp, name } = req.body;
    const camera = {
      ...req.body,
      user: id,
      dirRecorders,
    };
    // Create a root folder for all user recorders
    await createFolderIfNotExists(dirRecorders, name);

    const result = await createThumbnail(rtsp, dirRecorders, name);

    if (result.success) {
      camera.thumbnail = `${hostName}/${result.url}`;
      const resultVideoStm = await createStreamer(rtsp, dirRecorders, name);
      if (resultVideoStm.success) {
        camera.pid = resultVideoStm.processId;
        camera.streamUrl = `${hostName}/${resultVideoStm.url}`;

        const data = await cameraModel.create(camera);
        return res.status(200).json({
          success: true,
          data: data,
          errors: [],
        });
      }
    } else {
      const error = new Error("URL streaming not working ");
      error.status = 404;
      next(error);
    }
  } catch (e) {
    const error = new Error("Failed to create!! ");
    error.status = 404;
    next(error);
  }
};

export default createCamera;
