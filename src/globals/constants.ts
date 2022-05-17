import { Role } from "@prisma/client";

const roles: Role[] = ["OWNER", "ADMIN", "MODERATOR", "UPLOADER", "USER"];

const OTP_AGE = 1000 * 60 * 5; // 5 mins
const ROOT = "/api/v1";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; //30 Days

export { roles, OTP_AGE, ROOT, COOKIE_MAX_AGE };
