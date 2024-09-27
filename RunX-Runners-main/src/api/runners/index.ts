
import type { App }  from '@/server'
import { t } from 'elysia'
import * as runnerQuery from '@/queries/runner';

import * as interface_ from '@/utils/interface';
import _ from 'lodash';
import gcs from '@/services/gcs';
import moment from 'moment';


export default (app: App) =>  
    app.get('/', () => {
        return 'NOT_AUTHORIZED'
    })
    .post('/requestChangeInfo', async ({ body: { firstname, surname, file_upload, resultrunnerid }, set, db }) => {

        const bucket = gcs.bucket(process.env.GOOGLE_BUCKET_URL!);
        const file = bucket.file(file_upload);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: moment().add(5,'years').toDate()
        });
        
        const addRequestChangeInfo = await runnerQuery.addRequestChangeInfo({ db:db, firstname, lastname:surname, resultrunnerid, file_url: url});
    
        if(_.get(addRequestChangeInfo,'id')) {
            return {
                success:true,
                data:[],
                success_msg: "Data has been added in races."
            }
        } else {
            set.status = 400;
            return {
                error: true,
                error_msg: "Some fields is missing."
            }
        }
    
    }, {
        body: t.Object({
            firstname: t.String(),
            surname: t.String(),
            file_upload: t.String(),
            resultrunnerid: t.String()
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .get('/searchRunners',  async ({ db, set, query }) => {
        const dataObject: any = await runnerQuery.searchRunners(db, query);
        if(dataObject) {
            return {
                success: true,
                data: dataObject
            }
        } else {
            set.status = 400
            return {
                error: true
            }
        }
    }, {
        query: t.Object({
            searchTxt: t.String(),
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .get('/rankingFilter',  async ({ db, set, query }) => {
        const dataObject: interface_.RunnersRanking = await runnerQuery.getRankingRunnerByFilter(db, query);
        if(dataObject) {
            return {
                success: true,
                data: dataObject
            }
        } else {
            set.status = 400
            return {
                error: true
            }
        }
    }, {
        query: t.Object({
            distance: t.String(),
            location: t.Optional(t.String()),
            age_range: t.Optional(t.String()),
            gender:  t.Optional(t.String()),
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .get('/rankingByDistance', async ({ db, set, query }) => {

        const dataObject: interface_.ObjectSort = {};

        for await(const dist of query.distance.split(",")) {
            // console.log(dist)
            dataObject[dist] = await runnerQuery.getRankingRunnerByDistance(db, query, dist);
        }

        if(dataObject) {
            return {
                success: true,
                data: dataObject
            }
        } else {
            set.status = 400
            return {
                error: true
            }
        }
    }, {
        query: t.Object({
            distance: t.String(),
            limit: t.String(),
            gender: t.Optional(t.String())
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })
