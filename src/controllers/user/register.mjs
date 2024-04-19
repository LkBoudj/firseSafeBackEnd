import bcrypt from "bcrypt";
import userModel from "../../models/user_model.mjs";
import { getPathFolder, createFolderIfNotExists } from "../../utils/utils.mjs";
const register = async (req, res, next) => {
  try {
    const isExits = await userModel.findOne({ email: req.body.email }).exec();

    if (isExits) {
      return res.status(200).json({
        success: false,
        data: null,
        errors: [
          {
            message: "Email is already in use",
          },
        ],
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const user = await userModel.create(req.body);
    const camera_folder = await getPathFolder(
      "recorders",
      "recorder_" + user.id
    ); // the path

    user.dirRecorders = `recorders/recorder_${user.id}`;

    user.save();

    await createFolderIfNotExists(camera_folder); // create the folder if not exists

    const { password, ...restUser } = user["_doc"];

    return res.json({
      success: true,
      data: restUser,
      errors: [],
    });
  } catch (e) {
    console.log(e);
    const error = new Error("Internal Server Error");
    error.status = 404;
    next(error);
  }
};

export default register;
