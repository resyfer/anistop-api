import { unauthorizedAcccess, userNotFound } from "@errors/auth";
import { serverError } from "@errors/system";
import { elevateLevel } from "@interfaces/auth";
import { User } from "@prisma/client";
import { permissionLevelChanged } from "@success/auth";
import { levelIndex } from "@utils/levelIndex";
import { sendMail } from "@utils/mailer";
import { prisma } from "@utils/prisma";
import { toCapitalCase } from "@utils/string";
import { Request, Response } from "express";

async function elevate(req: Request, res: Response) {
  try {
    const { identifier, level } = req.body as elevateLevel;

    // Check for user
    if (
      (await prisma.user.count({
        where: { OR: [{ username: identifier }, { email: identifier }] },
      })) === 0
    ) {
      return res.json(userNotFound);
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ username: identifier }, { email: identifier }] },
    });

    if (!user) {
      return res.json(userNotFound);
    }

    // Check authorization
    if (levelIndex(level) >= levelIndex((req.user as User).role)) {
      return res.json(unauthorizedAcccess);
    }

    // Update Role
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        role: level,
      },
    });

    // Send E-Mail
    const subject = `Permission Level Updated | ${process.env.NAME}`;
    const html = `
      <p>
        <h3>Dear ${user.name},</h3>
      Your permission level has been updated to <b>${toCapitalCase(level)}</b>.
      </p>
    `;

    await sendMail({
      email: user.email,
      subject,
      html,
    });

    return res.json(permissionLevelChanged);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { elevate };
