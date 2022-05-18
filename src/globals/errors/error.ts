import { JSONResponse } from "@repo-types/json";

/**
 * @description Gives back a JSON
 * Object to send as response.
 */
function error(errorMessage: string): JSONResponse {
  return {
    success: false,
    error: errorMessage,
  };
}

export { error };
