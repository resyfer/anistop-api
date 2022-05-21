/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `VA` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VA_name_dob_key";

-- CreateIndex
CREATE UNIQUE INDEX "VA_name_key" ON "VA"("name");
