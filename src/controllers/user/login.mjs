import bcrypt from "bcrypt";
import userModel from "../../models/user_model.mjs";

const login = (req, res, next) => {
  return res.json({
    success: true,
    data: req.body,
    errors: [],
  });
};

export default login;
