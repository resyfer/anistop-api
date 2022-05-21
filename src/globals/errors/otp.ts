import { error } from "@errors/error";

const otpExpired = error("OTP Expired");
const otpIncorrect = error("Incorrect OTP");
const userVerified = error("User already verified");

export { otpExpired, otpIncorrect, userVerified };
