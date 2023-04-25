/*
  Warnings:

  - Made the column `movieId` on table `MovieCrew` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MovieCrew" DROP CONSTRAINT "MovieCrew_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCrew" DROP CONSTRAINT "MovieCrew_personId_fkey";

-- AlterTable
ALTER TABLE "MovieCrew" ALTER COLUMN "movieId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
