interface JSONError {
  success: false;
  error: string;
}

interface JSONSuccess<T> {
  success: true;
  message: T;
}

export { JSONError, JSONSuccess };
