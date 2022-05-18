import { error } from "@errors/error";

const userExists = error("User already exists.");
const userNotFound = error("User not found.");
const usernameTaken = error("Username is already taken.");
const improperEmail = error("Please enter a valid Email ID.");
const insecurePassword = error(
  "Please enter a secure password with atleast 1 number, 1 capital character and 1 special character. "
);
const wrongPassword = error("Wrong password.");
const userNotLoggedIn = error("User not logged in.");
const userAlreadyLoggedIn = error("User already logged in.");
const userNotVerified = error("User Not Verified.");
const unauthorizedAcccess = error("Unauthorized access.");

export {
  userExists,
  userNotFound,
  usernameTaken,
  improperEmail,
  insecurePassword,
  wrongPassword,
  userNotLoggedIn,
  userAlreadyLoggedIn,
  userNotVerified,
  unauthorizedAcccess,
};
