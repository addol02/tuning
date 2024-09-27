-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Runner" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "Runner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startperiod" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endperiod" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cover_img" TEXT,
    "location" TEXT NOT NULL,
    "province" TEXT,
    "logo_img" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Races" (
    "id" SERIAL NOT NULL,
    "race_title" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "starttime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endtime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "Races_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racerunner" (
    "id" SERIAL NOT NULL,
    "entrytime" TEXT NOT NULL,
    "raceid" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "nation" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "irunid" INTEGER NOT NULL DEFAULT 0,
    "rank_race" TEXT,

    CONSTRAINT "Racerunner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reqchangeinfo" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "racerunnerid" INTEGER NOT NULL,

    CONSTRAINT "Reqchangeinfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Runner_email_key" ON "Runner"("email");

-- AddForeignKey
ALTER TABLE "Races" ADD CONSTRAINT "Races_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Racerunner" ADD CONSTRAINT "Racerunner_raceid_fkey" FOREIGN KEY ("raceid") REFERENCES "Races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
