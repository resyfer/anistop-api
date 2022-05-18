import { Country, Genre, Status } from "@prisma/client";

interface addAnimeBody {
  englishName: string;
  japaneseName: string;
  description: string;
  genres: Genre[];
  country: Country;
  keywords: string[];
  posterUrl: string;
  backgroundImgUrl: string;
}

interface updateAnimeBody {
  description?: string;
  genres?: Genre[];
  country?: Country;
  keywords?: string[];
  posterUrl?: string;
  backgroundImgUrl?: string;
  status?: Status;
}

export { addAnimeBody, updateAnimeBody };
