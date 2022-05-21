-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_animeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_viewerId_fkey";

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
