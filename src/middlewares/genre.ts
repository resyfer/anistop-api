import { invalidGenre } from "@errors/genre";
import { serverError } from "@errors/system";
import { Genre } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

async function checkGenre(req: Request, res: Response, next: NextFunction) {
  try {
    const { genre } = req.params;

    if (!(genre in Genre)) {
      return res.json(invalidGenre);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { checkGenre };
