-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "seriesId" INTEGER;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;
