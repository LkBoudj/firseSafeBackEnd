import { Schema, model, Types } from "mongoose";

const UserRoleSchema = new Schema(
  {
    role: { type: Types.ObjectId, ref: "Role" },
    user: { type: Types.ObjectId, ref: "User" },
  },
  {
    toJSON: true,
  }
);

const userRoleMode = model("UserRole", UserRoleSchema);

export default userRoleMode;
