import { PrismaClient } from "@prisma/client";
import { parseID } from "../../utils/convert";
import { ObjectSort } from "../../utils/interface";

// Fetch all series with optional filters
export async function getAllSeries(db: PrismaClient, query: { seriesTitle?: string, startPeriod?: string, endPeriod?: string }) {
    const filterQuery: ObjectSort = {};

    if (query.seriesTitle) {
        filterQuery["series_title"] = {
            contains: query.seriesTitle,
            mode: 'insensitive'
        };
    }

    if (query.startPeriod) {
        filterQuery["series_startperiod"] = { gte: new Date(query.startPeriod) };
    }

    if (query.endPeriod) {
        filterQuery["series_endperiod"] = { lte: new Date(query.endPeriod) };
    }

    const seriesData = await db.series.findMany({
        where: { ...filterQuery },
        orderBy: { series_startperiod: 'asc' }
    });

    return seriesData;
}

// Fetch series by ID with related events
export async function getBySeriesId(db: PrismaClient, id: string) {
    return await db.series.findUnique({
        where: { id: parseID(id) },
        include: {
            events: true // This will include related events
        }
    });
}
