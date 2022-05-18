import { serverError } from "@errors/system";
import { userNotFound } from "@errors/auth";
import { userVerified } from "@errors/otp";
import { otpBody } from "@interfaces/otp";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { generateOtp } from "@utils/otp";
import { otpGenerated } from "@success/otp";

async function newOtp(req: Request, res: Response) {
  try {
    const { identifier } = req.body as otpBody;

    // Check For User
    if (
      (await prisma.user.count({
        where: {
          OR: [{ email: identifier }, { username: identifier }],
        },
      })) === 0
    ) {
      return res.json(userNotFound);
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res.json(userNotFound);
    }

    // Check For User Verification Status
    if (user.verified) {
      return res.json(userVerified);
    }

    // New OTP
    (req as any).body.email = user.email;
    const { expiry, value } = await generateOtp(req);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        otpValue: value,
        otpExpiry: expiry,
      },
    });

    return res.json(otpGenerated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { newOtp };
