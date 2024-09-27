import { PrismaClient, Reqchangeinfo } from "@prisma/client";

export async function getAdminProfile(db:PrismaClient, email: string) {
    return await db.administrator.findUnique({
        where:{
            email:email
        }
     })
}

export async function getRequestChangeInfo(db:PrismaClient) {
    return await db.$queryRaw<any>`
        SELECT
            reqch.id,
            reqch.firstname,
            reqch.lastname,
            reqch.file_url,
            reqch.created_at,
            rcr.firstname AS old_firstname,
            rcr.lastname AS old_lastname,
            reqch.racerunnerid AS racerunnerid,
            reqch.status
        FROM
            "Reqchangeinfo" reqch
        INNER JOIN
            "Racerunner" rcr ON rcr.id = reqch.racerunnerid
    `
}