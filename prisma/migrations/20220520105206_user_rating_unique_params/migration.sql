/*
  Warnings:

  - A unique constraint covering the columns `[userId,seasonId]` on the table `UserRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRating_userId_seasonId_key" ON "UserRating"("userId", "seasonId");
