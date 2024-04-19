import z from "zod";

const schema = z.object({
  name: z
    .string({
      required_error: "is required",
    })
    .min(1, { message: "can be empty" }),
  username: z
    .string({
      required_error: "is required",
    })
    .min(1, { message: "can be empty" }),
  password: z
    .string({
      required_error: "is required",
    })
    .min(1, { message: "can be empty" }),
  rtsp: z.string({ required_error: "is required" }).url(),
  isActive: z.boolean().default(true),
});

export default schema;
