import { Schema, model } from "mongoose";

const PermissionSchema = new Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: true,
  }
);

// methods.users = function () {
//   const role = this;
//   const all = RolePermissionModel.find({ role });
//   console.log(all);
// };

const permissionModel = model("Permission", PermissionSchema);

export default permissionModel;
