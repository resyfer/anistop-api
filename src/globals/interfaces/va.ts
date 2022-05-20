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

interface updateVAImgBody {
  imgUrl: string;
}

export { addVABody, updateVABody, updateVAImgBody };
