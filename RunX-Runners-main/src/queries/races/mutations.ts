import { parseID } from "../../utils/convert";
import { PrismaClient } from "@prisma/client";
import * as interface_ from "../../utils/interface";


export async function uploadDataToRaces(db: PrismaClient, raceid: string, dataRunner: interface_.ExcelUploadRuner[]) {

    const dataConvert = dataRunner.map((item,i) => {
        return {
            raceid: parseID(raceid),
            firstname: item.FirstName,
            lastname: item.LastName,
            age: item.Age,
            gender: item.Gender,
            nation: item.Nation,
            score: item.Score,
            entrytime: item.Time,
            rank_race: item.Rank.toString()
        }
    })

    const updateData = await db.racerunner.createMany({
        data: dataConvert
    })

    
    return updateData;

    // if(updateData) {
    //     return 
    // }

}