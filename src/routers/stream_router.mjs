import express from "express";
const router = express.Router();
import { validateData, isAuthenticated } from "../middleware/index.mjs";
import createStream from "../validation/stream/create.mjs";
import {
  allCamera,
  createCamera,
  removeCamera,
} from "../controllers/camera/index.mjs";
router.get("/", isAuthenticated, allCamera);

router.get("/:id", isAuthenticated, function (req, res) {
  res.status(200).json({
    message: "single",
  });
});
router.post("/", isAuthenticated, validateData(createStream), createCamera);

router.patch("/:id", isAuthenticated, function (req, res) {
  res.status(200).json({
    message: "update",
  });
});

router.delete("/:id", isAuthenticated, removeCamera);

export default router;
