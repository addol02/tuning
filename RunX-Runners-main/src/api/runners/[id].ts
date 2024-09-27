import type { App }  from '../../server'
import { t } from 'elysia'
import * as runnerQuery from '@/queries/runner';

export default (app: App) => app.get('/', async ({ db, params, set, query }) => {
    
    if(set.status == 400) {
        return {
            error: true
        }
    }
    const dataQuery:{ lastRace: any; filterYear: any; achievement: any, allTimePaces: any } | null = await runnerQuery.getRacesWithRunner(db, params.id);


    if(dataQuery) {
        return {
            success: true,
            data: {
                lastRace: dataQuery.lastRace,
                filterOnYear: dataQuery.filterYear,
                achievement: dataQuery.achievement,
                allTimePaces: dataQuery.allTimePaces
            }
        }
    } else {
        return {
            success: false,
            data: {}
        }
    }

    // set.status = 400
    // return {
    //     error: true
    // }


},{
    params:t.Object({
        id: t.String()
    }),
    response: {
        200: 'success',
        400: 'fail'
    }
})