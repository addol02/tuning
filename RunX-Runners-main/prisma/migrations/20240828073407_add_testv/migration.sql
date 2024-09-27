/*
  Warnings:

  - Added the required column `testv` to the `Reqchangeinfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reqchangeinfo" ADD COLUMN     "testv" TEXT NOT NULL;
