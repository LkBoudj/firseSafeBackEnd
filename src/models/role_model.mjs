import { Schema, model, Types } from "mongoose";

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: true,
  }
);

const RoleModel = model("Role", RoleSchema);

export default RoleModel;
