import { SeasonOfYear } from "@prisma/client";

interface addAnimeSeasonBody {
  seasonOfYear: SeasonOfYear;
  year: number;
}

export { addAnimeSeasonBody };
