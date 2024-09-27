import { PrismaClient } from "@prisma/client";
import { isError } from "lodash";

export async function createAdminData(db: PrismaClient, data: { email: string, password: string }) {
    return await db.administrator.create({
        data: {
            email:data.email,
            password: data.password
        }
    })
}

export async function updateRequestList(db:PrismaClient, firstname: string, lastname: string, id: number, status: number,racerunnerid: number) {


    const updateRaceRunner = status == 1 ? await db.racerunner.update({
        where:{
            id: racerunnerid
        },
        data: {
            firstname,
            lastname
        }
    }) : true;

    const updateRequestChange = await db.reqchangeinfo.update({
        where:{
            id: id
        },
        data:{
            status
        }
    })

    return !isError(updateRaceRunner) && !isError(updateRequestChange)
}