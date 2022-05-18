import { Request, Response } from "express";
import { serverError } from "@errors/system";
import { userLoggedIn } from "@success/auth";

async function login(_: Request, res: Response) {
  try {
    return res.json(userLoggedIn);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { login };
