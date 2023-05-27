/*
  Warnings:

  - Made the column `image` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "trailer" DROP DEFAULT;
