import { parseID } from "../../utils/convert";
import { PrismaClient } from "@prisma/client";
import { ObjectSort } from "../../utils/interface";

export async function getAllEvent (db: PrismaClient, query: { distanceFilter?: string, title?: string, location?: string, startperiod?: string }) {
    
    const filterQuery: ObjectSort = {};
    const racesFilter: ObjectSort = {};

    if(query.distanceFilter) {
        const lteAndgte = query.distanceFilter.split(",");
        racesFilter["distance"] = {
            ...lteAndgte.length > 1 ? { gte: lteAndgte[0], lte: lteAndgte[1] } : { equals: parseInt(lteAndgte[0]) }
        }
    }

    if(query.title) {
        if((query.title).trim() !== "") {
            filterQuery["title"] = {
                contains:query.title,
                mode: 'insensitive'
            }
        }
        
    }

    if(query.location) {
        if(query.location !== "Anywhere") {
            filterQuery["location"] = {
                equals:query.location
            }
        }
    }

    if(query.startperiod) {
        filterQuery["startperiod"] = {
            gte: new Date(query.startperiod)
        }
    }


    const eventsData = await db.events.findMany({
        include: {
            races: {
                where: {
                    ...racesFilter
                },
                orderBy: {
                    distance: 'asc'
                }
            }
        },
        orderBy: {
            startperiod: 'desc'
        },
        where: {
            ...filterQuery
        }
    });

    return (eventsData.filter((data) => {
        return data.races.length > 0
    }))


}

export async function getByEventId (db: PrismaClient, id: string) {

    return await db.events.findUnique({
        where: {
            id: parseID(id)
        },
        include: {
            races: {
                orderBy: {
                    distance: 'asc'
                }
            }
        }
    });
}