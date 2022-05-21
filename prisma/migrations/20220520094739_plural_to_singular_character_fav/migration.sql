/*
  Warnings:

  - You are about to drop the `CharacterFavorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharacterFavorites" DROP CONSTRAINT "CharacterFavorites_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFavorites" DROP CONSTRAINT "CharacterFavorites_userId_fkey";

-- DropTable
DROP TABLE "CharacterFavorites";

-- CreateTable
CREATE TABLE "CharacterFavorite" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CharacterFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharacterFavorite" ADD CONSTRAINT "CharacterFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFavorite" ADD CONSTRAINT "CharacterFavorite_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
