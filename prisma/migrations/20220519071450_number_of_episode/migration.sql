/*
  Warnings:

  - A unique constraint covering the columns `[number,seasonId]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Episode_number_seasonId_key" ON "Episode"("number", "seasonId");
