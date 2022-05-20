-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_animeId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFavorites" DROP CONSTRAINT "CharacterFavorites_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterFavorites" DROP CONSTRAINT "CharacterFavorites_userId_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFavorites" ADD CONSTRAINT "CharacterFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFavorites" ADD CONSTRAINT "CharacterFavorites_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
