import cameraModel from "../../models/camera.mjs";

const allCamera = async (req, res, next) => {
  try {
    const data = await cameraModel.find();

    return res.status(200).json({
      success: true,
      data,
      errors: [],
    });
  } catch (e) {
    console.log(e);
  }
};

export default allCamera;
