import { parseID } from "../../utils/convert";
import { PrismaClient } from "@prisma/client";
import * as interface_ from "../../utils/interface";


export async function addRequestChangeInfo({ db, firstname, lastname, resultrunnerid, file_url }:{ db: PrismaClient, firstname: string, lastname: string, resultrunnerid: string, file_url: string }) {
    const createRequest = await db.reqchangeinfo.create({
        data:{
            firstname,
            lastname,
            file_url,
            racerunnerid: parseID(resultrunnerid)
        }
    })
    return createRequest;
}
// export async function updateRunnerInfo(db: PrismaClient, firstname: string, lastname: string, resultrunnerid: string) {

// }