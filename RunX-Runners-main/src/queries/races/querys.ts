import { parseID } from "../../utils/convert";
import { PrismaClient } from "@prisma/client";
import * as interface_ from "../../utils/interface";

export async function getByEventId (db: PrismaClient, id: string, query: { sortField? : string, sortType? : string, whereField? : string, whereValue? : string, cursorId?: string} ) {
   
    const orderByForm: interface_.ObjectSort = {};

    if(query.sortField && query.sortType) {
        orderByForm[query.sortField] = query.sortType;
    }
    
    const whereByForm: interface_.ObjectSort = {};

    if(query.whereField && query.whereValue) {
        whereByForm[query.whereField] = query.whereValue;
    }

    const cursorByForm: interface_.ObjectSort = {};

    if(query.cursorId) {
        cursorByForm.cursor = { id: (+query.cursorId) }
    }


    return await db.races.findFirst({
        where: {
            id: parseID(id)
        },
        include: {
            racerunners: {
                // take:20,
                ...cursorByForm,
                orderBy:orderByForm,
                where: whereByForm,
            }
        },
    });

}

// export async function getRunnerOnRace (db: PrismaClient, id: string, query: Object) {

//     return await db.raceRunner.findMany({
//         where: {
//             raceId: parseID(id)
//         },
//         orderBy: {
//             entryTime: 'asc'
//         }
//     });

// }