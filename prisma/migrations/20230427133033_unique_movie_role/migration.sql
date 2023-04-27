/*
  Warnings:

  - A unique constraint covering the columns `[personId,movieId,role]` on the table `MovieCrew` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieCrew_personId_movieId_role_key" ON "MovieCrew"("personId", "movieId", "role");
