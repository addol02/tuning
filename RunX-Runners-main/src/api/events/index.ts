import type { App }  from '../../server'
import { t } from 'elysia'
import * as eventQuery from '@/queries/events';

export default (app: App) => app
    .get("/", async ({ db, set, query}) => {
        const events = await eventQuery.getAllEvent(db, query);

        if(events) {
            return {
                success: true,
                data: events
            }
        } else {
            set.status = 400;
            return {
                error: true
            }
        }

    }, {
        query: t.Object({
            distanceFilter: t.Optional(t.String()),
            title: t.Optional(t.String()),
            location: t.Optional(t.String()),
            startperiod: t.Optional(t.String())
        }),
        response: {
            200: "success",
            400: "fail"
        }
    })
    .get("/test", async ({ db, set}) => {
        
        const events = await db.events.findMany({
            where:{
                races:{
                    some: {
                        distance: 21
                    }
                }
            },
            include:{
                races: true
            }
        })


        if(events) {
            return {
                success: true,
                data: events
            }
        } else {
            set.status = 400;
            return {
                error: true
            }
        }
        
    })
    // .post("/", async ({ db, set, body }) => {
    //     const events = await eventQuery.getAllEventFilter(db, body);

    //     if(events) {
    //         return {
    //             success: true,
    //             data: events
    //         }
    //     } else {
    //         set.status = 400;
    //         return {
    //             error: true
    //         }
    //     }

    // }, {
    //     body: t.Object({
    //         distanceFilter: t.String()
    //     }),
    //     response: {
    //         200: "success",
    //         400: "fail"
    //     }
    // })
