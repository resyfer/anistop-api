import { Role } from "@prisma/client";

const ROLES: Role[] = ["USER", "UPLOADER", "MODERATOR", "ADMIN", "OWNER"];

const OTP_AGE = 1000 * 60 * 5; // 5 mins
const ROOT = "/api/v1";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; //30 Days

export { ROLES, OTP_AGE, ROOT, COOKIE_MAX_AGE };
