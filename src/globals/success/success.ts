import { JSONResponse } from "@repo-types/json";

/**
 * @description Gives back a JSON
 * Object to send as response.
 */
function success(successMessage: string): JSONResponse {
  return {
    success: true,
    message: successMessage,
  };
}

export { success };
