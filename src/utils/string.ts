import { getRandomNum } from "@utils/random";

/**
 * @returns A random character between `0-9`, `A-Z`
 * and `a-z`.
 */
function getRandomChar() {
  const digit = getRandomNum(61, 0); //0-9,A-Z,a-z

  if (digit <= 9) return digit.toString();
  //0-9
  else if (digit <= 35)
    return String.fromCharCode(digit - 10 + "A".charCodeAt(0));
  //A-Z
  else return String.fromCharCode(digit - 36 + "a".charCodeAt(0)); //a-z
}

/**
 * @returns A random string with a length between `8-20` characters,
 * with characters each being multiple return values of `getRandomChar`
 */
function newHashString() {
  const hashLength = getRandomNum(20, 8);
  let hash = "";
  for (let i = 0; i < hashLength; i++) hash += getRandomChar();

  return hash;
}

/**
 *
 * @description Removes every whitespace in
 * a string
 *
 * @param text
 */
function removeWhitespace(text: string) {
  return text.split(" ").join("");
}

export { getRandomChar, newHashString, removeWhitespace };
