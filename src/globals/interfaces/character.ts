interface addCharacterBody {
  name: string;
  description: string;
  vas: string;
}

interface updateCharacterBody {
  name: string;
  description: string;
  vas: string[];
}

export { addCharacterBody, updateCharacterBody };
