import z from "zod";

const schema = z.object({
  email: z
    .string({
      required_error: "is required",
    })
    .email(),
  password: z.string({
    required_error: "is required",
  }),
});

export default schema;
