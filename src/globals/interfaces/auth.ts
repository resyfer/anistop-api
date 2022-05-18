import { Role } from "@prisma/client";

interface signUpBody {
  name: string;
  email: string;
  username: string;
  password: string;
  dob: string;
  img: string | undefined;
}

interface elevateLevel {
  identifier: string;
  level: Role;
}

export { signUpBody, elevateLevel };
