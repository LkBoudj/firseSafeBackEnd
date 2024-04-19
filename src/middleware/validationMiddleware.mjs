import { ZodError } from "zod";

import StatusCodes from "http-status-codes";

function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, errors: errorMessages, data: null });
      } else {
        const error = new Error("Internal Server Error");
        error.status = 404;
        next(error);
      }
    }
  };
}

export default validateData;
