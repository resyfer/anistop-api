/*
  Warnings:

  - You are about to drop the column `userEmail` on the `UserRating` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserRating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_userEmail_fkey";

-- AlterTable
ALTER TABLE "UserRating" DROP COLUMN "userEmail",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
