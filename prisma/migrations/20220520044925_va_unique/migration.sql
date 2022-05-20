/*
  Warnings:

  - A unique constraint covering the columns `[name,dob]` on the table `VA` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VA_name_dob_key" ON "VA"("name", "dob");
