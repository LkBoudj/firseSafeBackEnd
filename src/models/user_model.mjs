import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dirRecorders: { type: String },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isLogin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // toJSON: true,
    // getters: true,
    // setter: true,
  }
);

const userModel = model("User", UserSchema);

export default userModel;
