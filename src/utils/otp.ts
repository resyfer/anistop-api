import { Request } from "express";

import { sendMail } from "@utils/mailer";
import { newHashString } from "@utils/string";
import { hash } from "@utils/hash";
import { OTP_AGE } from "@globals/constants";

/**
 *  Generates OTP and Expiry Date and sends mail.
 */
async function generateOtp(req: Request) {
  const otp = newHashString();
  const hashedOtp = await hash(otp);
  const expiryDuration = OTP_AGE;

  await sendOtpMail(req, otp, expiryDuration);

  return {
    value: hashedOtp,
    expiry: new Date(expiryDuration + new Date().getTime()),
  };
}

/**
 * Sends OTP mail.
 *
 * @param {import("express").Request} req
 * @param {string} otp
 * @param {number} expiryDuration
 */
async function sendOtpMail(req: Request, otp: string, expiryDuration: number) {
  try {
    const { name, email } = req.body;

    const subject = `Please Verify Your Email | ${process.env.NAME}`;

    const html = `
      <p>
        <h3>Dear ${name},</h3>
      Thank you for joining ${process.env.NAME}.
      To verify your account, please verify your OTP.
      </p>
      <p>OTP : <b>${otp}</b></p>
      <p>Duration: ${expiryDuration / (60 * 1000)} min</p>
    `;

    await sendMail({ email, subject, html });
  } catch (err) {
    console.log(err);
  }
}

export { generateOtp, sendOtpMail };
