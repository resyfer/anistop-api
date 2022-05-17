import { userNotFound } from "@errors/auth";
import { serverError } from "@errors/system";
import { otpExpired, otpIncorrect, userVerified } from "@errors/otp";
import { otpBody } from "@interfaces/otp";
import { prisma } from "@utils/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { otpVerified } from "@success/otp";

async function verifyOtp(req: Request, res: Response) {
  try {
    const { identifier, otp } = req.body as otpBody;

    // Check For User
    if (
      (await prisma.user.count({
        where: {
          OR: [{ username: identifier }, { email: identifier }],
        },
      })) === 0
    ) {
      return res.json(userNotFound);
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    // Check For User
    if (!user) {
      return res.json(userNotFound);
    }

    // Check For User Verification Status
    if (user.verified) {
      return res.json(userVerified);
    }

    // Check For OTP validity
    if (user.otpExpiry < new Date()) {
      return res.json(otpExpired);
    }

    // Check For OTP Correctness
    if (await bcrypt.compare(otp, user.otpValue)) {
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          verified: true,
        },
      });

      return res.json(otpVerified);
    } else {
      console.log(otp, user.otpValue);
      return res.json(otpIncorrect);
    }
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { verifyOtp };
