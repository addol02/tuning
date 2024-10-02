-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "series_title" TEXT NOT NULL,
    "series_startperiod" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "series_endperiod" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "series_cvimg" TEXT,
    "eventid" INTEGER NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);
