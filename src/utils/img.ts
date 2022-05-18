import { removeWhitespace } from "@utils/string";

/**
 * @description Provides a default
 * profile image link for name
 */
function defaultProfilePic(name: string) {
  return `https://avatars.dicebear.com/api/identicon/${removeWhitespace(
    name
  )}.svg`;
}

export { defaultProfilePic };
