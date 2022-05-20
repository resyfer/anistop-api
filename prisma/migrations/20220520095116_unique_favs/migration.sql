/*
  Warnings:

  - A unique constraint covering the columns `[characterId,userId]` on the table `CharacterFavorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterFavorite_characterId_userId_key" ON "CharacterFavorite"("characterId", "userId");
