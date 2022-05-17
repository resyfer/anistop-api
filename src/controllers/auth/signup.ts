import { serverError } from "@errors/system";
import { Request, Response } from "express";
import { prisma } from "@utils/prisma";
import { signUpBody } from "@interfaces/auth";
import { defaultProfilePic } from "@utils/img";
import { generateOtp } from "@utils/otp";
import { userCreated } from "@success/auth";
import { improperEmail, insecurePassword, userExists } from "@errors/auth";
import { hash } from "@utils/hash";

async function signup(req: Request, res: Response) {
  try {
    const { name, username, email, password, dob, img } =
      req.body as signUpBody;

    // Check if email is taken
    if ((await prisma.user.count({ where: { email } })) !== 0) {
      return res.json(userExists);
    }

    // Check if username is taken
    if ((await prisma.user.count({ where: { username } })) !== 0) {
      return res.json(userExists);
    }

    // For emails of the form abcde@fgh.ij.kl
    const emailValidation = /[0-9A-Za-z._]+@[A-Za-z]{2,}(\.[0-9A-Za-z]{2,})+/;

    if (!emailValidation.test(email)) {
      return res.json(improperEmail);
    }

    // Lookahead for 1 digit, 1 special character and 1 capital character.
    const passwordValidation =
      /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=[\]\\|<>,.?/:;"'])[A-Za-z0-9!@#$%^&*()_+\-=[\]\\|<>,.?/:;"']{8,20}/;

    if (!passwordValidation.test(password)) {
      return res.json(insecurePassword);
    }

    const { expiry, value } = await generateOtp(req);
    await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: await hash(password),
        dob: new Date(dob),
        img: img ?? defaultProfilePic(name),
        otpValue: value!,
        otpExpiry: expiry,
        role: "USER",
      },
    });

    return res.json(userCreated);
  } catch (err) {
    console.log(err);
    return res.json(serverError);
  }
}

export { signup };
