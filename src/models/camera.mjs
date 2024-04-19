import { Schema, model, Types } from "mongoose";
const CameraSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    user: { type: Types.ObjectId, ref: "User" },
    streamUrl: { type: String, required: true },
    rtsp: { type: String, required: true },
    thumbnail: { type: String, required: true },
    pid: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: true,
    getters: true,
    setter: true,
  }
);

const CameraModel = model("Camera", CameraSchema);

export default CameraModel;
