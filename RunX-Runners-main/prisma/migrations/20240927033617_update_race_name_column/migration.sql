/*
  Warnings:

  - You are about to drop the column `title` on the `Races` table. All the data in the column will be lost.
  - Added the required column `race_title` to the `Races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Races" DROP COLUMN "title",
ADD COLUMN     "race_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reqchangeinfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
