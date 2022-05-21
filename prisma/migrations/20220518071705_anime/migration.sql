-- CreateEnum
CREATE TYPE "SeasonOfYear" AS ENUM ('WINTER', 'SPRING', 'SUMMER', 'FALL');

-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM ('TV_SERIES', 'MOVIE', 'SPECIAL', 'OVA', 'ONA');

-- CreateEnum
CREATE TYPE "EpisodeType" AS ENUM ('SUB', 'DUB');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('JAPAN', 'CHINA', 'KOREA');

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "SeasonsOfYear";

-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "englishName" TEXT NOT NULL,
    "japaneseName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "backgroundImgUrl" TEXT NOT NULL,
    "genres" "Genre"[],
    "country" "Country" NOT NULL,
    "keywords" TEXT[],
    "status" "Status" NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seasontype" "SeasonType" NOT NULL,
    "episodeType" "EpisodeType" NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "animeId" INTEGER NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeSeason" (
    "id" SERIAL NOT NULL,
    "seasonOfYear" "SeasonOfYear" NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "AnimeSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "viewerId" INTEGER NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SeasonToStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeSeasonToSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_englishName_key" ON "Anime"("englishName");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_japaneseName_key" ON "Anime"("japaneseName");

-- CreateIndex
CREATE UNIQUE INDEX "_SeasonToStudio_AB_unique" ON "_SeasonToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_SeasonToStudio_B_index" ON "_SeasonToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeSeasonToSeason_AB_unique" ON "_AnimeSeasonToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeSeasonToSeason_B_index" ON "_AnimeSeasonToSeason"("B");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeasonToStudio" ADD CONSTRAINT "_SeasonToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeasonToStudio" ADD CONSTRAINT "_SeasonToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeSeasonToSeason" ADD CONSTRAINT "_AnimeSeasonToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "AnimeSeason"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeSeasonToSeason" ADD CONSTRAINT "_AnimeSeasonToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
