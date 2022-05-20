-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pictures" TEXT[],

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VA" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "more" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "VA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterFavorites" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CharacterFavorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToVA" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToVA_AB_unique" ON "_CharacterToVA"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToVA_B_index" ON "_CharacterToVA"("B");

-- AddForeignKey
ALTER TABLE "CharacterFavorites" ADD CONSTRAINT "CharacterFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterFavorites" ADD CONSTRAINT "CharacterFavorites_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToVA" ADD CONSTRAINT "_CharacterToVA_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToVA" ADD CONSTRAINT "_CharacterToVA_B_fkey" FOREIGN KEY ("B") REFERENCES "VA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
