import type { App }  from '../../server'
import { t } from 'elysia'


export default (app: App) => 
    app.get('/', () => {
        return 'NOT_AUTHORIZED'
    })
    .post('/test', async ({ db, body }) => {
        console.log(body)
        return {
            success: true
        }
    }, {
        body: t.Object({
            testFile: t.File()
        })
    })