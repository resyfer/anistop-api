interface addVABody {
  name: string;
  dob: {
    year: number;
    month: number;
    day: number;
  };
  more: string;
}

interface updateVABody {
  more: string;
}

export { addVABody, updateVABody };
