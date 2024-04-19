import localStrategy from "passport-local";
import bcrypt from "bcrypt";
import userModel from "../models/user_model.mjs";

export const serializeUser = (user, done) => {
  const id = user._doc._id.toString();

  done(null, id);
};

export const deserializeUser = async (id, done) => {
  try {
    const findUser = await userModel.findOne({ _id: id });
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
};

export default new localStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    const isExits = await userModel.findOne({ email: email });

    if (!isExits || !bcrypt.compareSync(password, isExits.password)) {
      const error = new Error("the credential is not correct");
      return done(error, null);
    }

    const { password: oldPassword, ...restUser } = isExits;

    return done(null, restUser);
  }
);
