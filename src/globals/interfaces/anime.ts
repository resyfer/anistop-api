import { Country, Genre } from "@prisma/client";

interface addAnimeBody {
  englishName: string;
  japaneseName: string;
  description: string;
  genres: string;
  country: Country;
  keywords: string;
}

interface updateAnimeBody {
  description?: string;
  genres?: Genre[];
  country?: Country;
  keywords?: string[];
  englishName: string;
  japaneseName: string;
}

export { addAnimeBody, updateAnimeBody };
