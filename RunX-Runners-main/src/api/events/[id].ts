import type { App }  from '../../server'
import { t } from 'elysia'
import * as eventQuery from '@/queries/events';

export default (app: App) => app.get('/', async ({ db, params, set }) => {
    
    if(set.status == 400) {
        return {
            error: true
        }
    }
    const races = await eventQuery.getByEventId(db, params.id);

    if(races) {
        return {
            success: true,
            data: races
        }
    } else {
        set.status = 400
        return {
            error: true
        }
    }


},{
    params:t.Object({
        id: t.String()
    }),
    response: {
        200: 'success',
        400: 'fail'
    }
})