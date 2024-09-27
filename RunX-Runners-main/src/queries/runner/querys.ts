import { parseID } from "../../utils/convert";
import { PrismaClient, Prisma, Racerunner, Races, Events } from "@prisma/client";
import { ObjectSort } from "../../utils/interface";

import _ from "lodash"

export async function getRunnerProfile (db: PrismaClient, id: string) {
    return db.racerunner.findUnique({ where:{ id: parseID(id) }});
}

export async function searchRunners (db: PrismaClient, query: { searchTxt: string }) {
    
    const searchTxt = `%${query.searchTxt.toLowerCase()}%`;

    // const data = await db.$queryRaw<any>`
    //     SELECT 
    //         fullname,
    //         firstname,
    //         lastname,
    //         gender
    //     FROM
    //         (SELECT 
    //             LOWER(CONCAT(rcr.firstname, ' ', rcr.lastname)) AS fullname,
    //             rcr.firstname,
    //             rcr.lastname,
    //             rcr.gender
    //         FROM
    //             "Racerunner" rcr
    //         GROUP BY rcr.fullname, rcr.firstname, rcr.lastname, rcr.gender
    //         )
    //     AS subquery
    //     WHERE fullname LIKE ${searchTxt}
    //     LIMIT 20
    // `
    const data = await db.$queryRaw<any>`
        SELECT
            resultrunnerid,
            fullname,
            firstname,
            lastname,
            gender,
            entrytime,
            nation,
            distance,
            event_title,
            start_time,
            race_id,
            event_id
        FROM
            (SELECT 
            LOWER(CONCAT(rcr.firstname, ' ', rcr.lastname)) AS fullname,
            rcr.firstname AS firstname,
            rcr.lastname AS lastname,
            rcr.gender AS gender,
            rcr.entrytime AS entrytime,
            rcr.nation AS nation,
            r.distance AS distance,
            r.starttime AS start_time,
            ev.title AS event_title,
            rcr.id AS resultrunnerid,
            r.id AS race_id,
            ev.id AS event_id
            FROM "Racerunner" rcr 
            INNER JOIN "Races" r ON rcr.raceid = r.id 
            INNER JOIN "Events" ev ON r.eventid = ev.id
            ORDER BY r.starttime DESC) 
        AS subquery 
        WHERE fullname LIKE ${searchTxt}
        LIMIT 50
    `
    // const filterQuery: Object[] = [];

    // filterQuery.push({
    //     firstname: {
    //         contains:query.searchTxt,
    //         mode: 'insensitive'

    //     }
    // });

    // filterQuery.push({
    //     lastname: {
    //         contains:query.searchTxt,
    //         mode: 'insensitive'
    //     }
    // });

    // const data = await db.racerunner.findMany({
    //     distinct: ['firstname'],
    //     take:20,
    //     where: {
    //         OR: filterQuery
    //     }
    // })

    return data;
}

export async function getRacesWithRunner (db: PrismaClient, id: string) {
    const filterQuery: ObjectSort = {};
    let splitFullname;
    if(id) {
        const checkFilterType = isNaN(parseInt(id));
        if(checkFilterType) {
            splitFullname = id.toLowerCase().split("_");

            if(splitFullname.length > 1) {
                filterQuery["firstname"] = {
                    equals:splitFullname[0]
                }
                filterQuery["lastname"] = {
                    equals:splitFullname[1]
                }
            }

        } else {
            filterQuery["irunId"] = {
                equals:parseID(id)
            }
        }
    }

    // const data = await db.races.findMany({
    //     include: {
    //         racerunners: {
    //             where: {
    //                 ...filterQuery
    //             },
    //             take:1
    //         },
    //         events: true
    //     },
    //     orderBy:{
    //         "starttime":"desc"
    //     }, 
    // })

    const data = await db.$queryRaw<any>`
    SELECT 
        subquery.entrytime,
        subquery.firstname,
        subquery.lastname,
        subquery.age,
        subquery.nation,
        subquery.gender,
        subquery.distance,
        subquery.title,
        subquery.location,
        subquery.province,
        subquery.entrytime,
        subquery.starttime,
        subquery.rank_race,
        CAST(COUNT(subquery.entrytime) AS int),
        subquery.raceid,
        subquery.eventid,
        subquery.resultrunnerid
    FROM
    (SELECT 
        rcr.id AS resultrunnerid,
        rcr.entrytime,
        rcr.firstname,
        rcr.lastname,
        rcr.age,
        rcr.nation,
        rcr.gender,
        r.distance,
        r.starttime,
        r.id,
        ev.title,
        ev.id AS eventid,
        rcr.raceid,
        rcr.rank_race,
        ev.province,
        ev.location
    FROM
        "Racerunner" rcr
    LEFT JOIN
        "Races" r ON r.id = rcr.raceid
    LEFT JOIN
        "Events" ev ON ev.id = r.eventid 
    WHERE
        LOWER(CONCAT(rcr.firstname, ' ', rcr.lastname)) = ${splitFullname? splitFullname[0] + ' ' + splitFullname[1] : ''}
    GROUP BY 
        r.id, r.distance, rcr.entrytime, rcr.firstname, rcr.lastname, rcr.age, rcr.nation, rcr.gender, r.starttime, ev.title, ev.id, rcr.rank_race, rcr.raceid, ev.province, ev.location, eventid, resultrunnerid
    ORDER BY
        r.starttime ASC) 
    AS subquery
    INNER JOIN
    "Racerunner" rcr ON rcr.raceid = subquery.raceid
    GROUP BY
        subquery.eventid, subquery.firstname, subquery.lastname, subquery.age, subquery.nation, subquery.gender, subquery.entrytime, subquery.raceid, subquery.rank_race, subquery.distance, subquery.title, subquery.location, subquery.province, subquery.starttime, subquery.resultrunnerid
    ORDER BY
    subquery.entrytime
    `

    // const allTimePacesData = await db.$queryRaw<any>`
    // SELECT 
    //     rcr.entrytime,
    //     r.distance,
    //     ev.title,
    //     ev.id AS eventid,
    //     rcr.rank_race
    // FROM
    //     "Racerunner" rcr
    // LEFT JOIN
    //     "Races" r ON r.id = rcr.raceid
    // LEFT JOIN
    //     "Events" ev ON ev.id = r.eventid 
    // WHERE
    //     rcr.firstname = ${splitFullname ? splitFullname[0].toString() : ''}
    //     ${splitFullname ? Prisma.sql`AND rcr.lastname::text = ${splitFullname[1].toString()}` : Prisma.empty} 
    // GROUP BY 
    //     r.distance, rcr.entrytime, ev.title, ev.id, rcr.rank_race
    // ORDER BY
    //     rcr.entrytime ASC
    // `
    const allTimePacesData = await db.$queryRaw<any>`
    SELECT 
        subquery.distance,
        subquery.title,
        subquery.location,
        subquery.province,
        subquery.entrytime,
        subquery.rank_race,
        CAST(COUNT(subquery.entrytime) AS int),
        subquery.raceid
    FROM
    (SELECT 
        rcr.entrytime,
        r.distance,
        ev.title,
        ev.id AS eventid,
        rcr.raceid,
        rcr.rank_race,
        ev.province,
        ev.location
    FROM
        "Racerunner" rcr
    LEFT JOIN
        "Races" r ON r.id = rcr.raceid
    LEFT JOIN
        "Events" ev ON ev.id = r.eventid 
    WHERE
        LOWER(CONCAT(rcr.firstname, ' ', rcr.lastname)) = ${splitFullname? splitFullname[0] + ' ' + splitFullname[1] : ''}
    GROUP BY 
        r.distance, rcr.entrytime, ev.title, ev.id, rcr.rank_race, rcr.raceid, ev.province, ev.location
    ORDER BY
        rcr.entrytime ASC) 
    AS subquery
    INNER JOIN
      "Racerunner" rcr ON rcr.raceid = subquery.raceid
    GROUP BY
        subquery.entrytime, subquery.raceid, subquery.rank_race, subquery.distance, subquery.title, subquery.location, subquery.province
    ORDER BY
      subquery.distance
    `
    // const filteredAllTimeData = allTimePacesData.reduce((item:{ entrytime: string, distance: number },next:{ entrytime: string, distance: number }) => {
    //     console.log(next)
    //     return item;
    // })

    // const distinctByDistance = allTimePacesData.reduce((acc:any, current:{ entrytime: string, distance: number }) => {
        
    //     let columnN = 'd'+ current.distance;
    //     if(!_.get(acc, `${columnN}`)) {
    //         acc[columnN] = current;
    //     }

    //     console.log(acc)
        
    //     // if (!acc.some(item => item.distance === current.distance)) {
    //     //   acc.push(current);
    //     // }
    //     return acc;
    //   }, []);
    
    // const distinctByDistance = _.groupBy(allTimePacesData, (item) => 
    //     `d_${item.distance}`
    // );
    let distinctByDistance = _.uniqBy(allTimePacesData,'distance');

    // console.log(distinctByDistance)
  
    if(data) {

        // const dataRace = data.filter((item,i) => {
        //     return item.racerunners.length > 0 && item
        // })

        const filterWithYear = _.groupBy(data, (item) => 
            new Date(item.starttime).getFullYear()
        );


        const achievement_data = await db.$queryRaw<any>`
            SELECT 
                MIN(rcr.entrytime) AS bestpace,
                MIN(rcr.rank_race) AS bestrank,
                COUNT(rcr.raceid) AS racefin
            FROM
                "Racerunner" rcr
            WHERE
                LOWER(CONCAT(rcr.firstname, ' ', rcr.lastname)) = ${splitFullname? splitFullname[0] + ' ' + splitFullname[1] : ''}
            `

        

        return {
            lastRace: data[0],
            filterYear: filterWithYear,
            achievement: achievement_data ? {
                bestrank: achievement_data[0].bestrank,
                bestpace: achievement_data[0].bestpace,
                racefin: parseInt(achievement_data[0].racefin)
            } : {},
            allTimePaces: distinctByDistance
        };
    } else {
        return null;
    }
}

export async function getRankingRunnerByDistance (db: PrismaClient, query: { limit: string, gender?: string; }, distance: string ) {
    const data = await db.$queryRaw<Racerunner[]|Races[]>`SELECT rcr.firstname,rcr.lastname,rcr.gender,rcr.score,rcr.nation,rcr.age, rcr.entrytime FROM "Races" r INNER JOIN "Racerunner" rcr ON rcr.raceid = r.id WHERE (r.distance = ${parseInt(distance)} ${query.gender ? Prisma.sql`AND rcr.gender::text = ${query.gender}` : Prisma.empty }) ORDER BY rcr.entrytime ASC LIMIT ${parseInt(query.limit)}`
    return data;
}

export async function getRankingRunnerByFilter (db: PrismaClient, query: { distance: string, location?: string, gender?: string, age_range?: string }) {

    let range_age;
    if(query.age_range) {
        range_age = query.age_range.split("-");
    }

    const data = await db.$queryRaw<any>`
    SELECT 
        rcr.firstname,
        rcr.lastname,
        rcr.gender,
        rcr.score,
        rcr.nation,
        rcr.age, 
        rcr.entrytime,
        ev.id as eventid
    FROM "Races" r 
    INNER JOIN 
        "Racerunner" rcr ON rcr.raceid = r.id 
    INNER JOIN 
        "Events" ev ON ev.id = r.eventid 
    WHERE 
    r.distance = ${parseInt(query.distance)} 
        ${query.location ? Prisma.sql`AND ev.location::text = ${query.location}` : Prisma.empty} 
        ${query.gender ? Prisma.sql`AND rcr.gender::text = ${query.gender}` : Prisma.empty} 
        ${range_age ? Prisma.sql`AND rcr.age::text BETWEEN ${range_age[0]} AND ${range_age[1]}` : Prisma.empty} 
    ORDER BY 
        rcr.entrytime ASC 
    LIMIT 50
    `
    console.log(data)
    return data;
}