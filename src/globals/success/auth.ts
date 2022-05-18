import { success } from "@success/success";

const userCreated = success("User created successfully.");
const userLoggedIn = success("User logged in successfully.");
const userLoggedOut = success("User logged out successfully.");
const permissionLevelChanged = success(
  "Permission level changed successfully."
);

export { userCreated, userLoggedIn, userLoggedOut, permissionLevelChanged };
