import { Schema, model, Types } from "mongoose";
const RolePermissionSchema = new Schema(
  {
    role: { type: Types.ObjectId, ref: "Role" },
    permission: { type: Types.ObjectId, ref: "Permission" },
  },
  {
    timestamps: true,
    toJSON: true,
  }
);

const rolePermission = model("RolePermission", RolePermissionSchema);

export default rolePermission;
