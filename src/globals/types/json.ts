import { JSONError, JSONSuccess } from "@interfaces/json";

type JSONResponse<T = string> = JSONError | JSONSuccess<T>;

export { JSONResponse };
