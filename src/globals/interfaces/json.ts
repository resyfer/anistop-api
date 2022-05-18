interface JSONError {
  success: false;
  error: string;
}

interface JSONSuccess {
  success: true;
  message: string;
}

export { JSONError, JSONSuccess };
