import bcrypt from "bcrypt";

/**
 *
 * @description Hashes the given text
 * using bcrypt
 * @returns The hashed text
 */
async function hash(text: string) {
  const salt = await bcrypt.genSalt();
  const hashedText = await bcrypt.hash(text, salt);

  return hashedText;
}

export { hash };
