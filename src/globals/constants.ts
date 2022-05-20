import { Role, SeasonOfYear } from "@prisma/client";

const ROLES: Role[] = ["USER", "UPLOADER", "MODERATOR", "ADMIN", "OWNER"];
const ANIME_SEASONS: SeasonOfYear[] = ["WINTER", "SPRING", "SUMMER", "FALL"];

const OTP_AGE = 1000 * 60 * 5; // 5 mins
const ROOT = "/api/v1";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; //30 Days

const FILE_UPLOAD_LIMIT = 1024 * 1024 * 5; // 5 MB

export {
  ROLES,
  OTP_AGE,
  ROOT,
  COOKIE_MAX_AGE,
  ANIME_SEASONS,
  FILE_UPLOAD_LIMIT,
};
