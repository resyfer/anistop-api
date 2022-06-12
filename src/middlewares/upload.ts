import { ErrorRequestHandler } from "express";
import { error } from "@errors/error";

const uploadErrors: ErrorRequestHandler = (err, _, res, next) => {
  if (err) {
    console.log(err);
    res.json(error("File of large size or unknown type."));
  } else {
    next();
  }
};

export { uploadErrors };
