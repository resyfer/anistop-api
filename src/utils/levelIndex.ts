import { Role } from "@prisma/client";
import { ROLES } from "@globals/constants";

function levelIndex(newLevel: Role) {
  return ROLES.indexOf(newLevel);
}

export { levelIndex };
