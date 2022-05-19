/*
  Warnings:

  - You are about to drop the column `status` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'UPCOMING';
