/*
  Warnings:

  - You are about to drop the column `seasontype` on the `Season` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seasonOfYear,year]` on the table `AnimeSeason` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seasonType` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Season" DROP COLUMN "seasontype",
ADD COLUMN     "seasonType" "SeasonType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AnimeSeason_seasonOfYear_year_key" ON "AnimeSeason"("seasonOfYear", "year");
