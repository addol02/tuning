import type { App }  from '@/server'
import { t } from 'elysia'

import mime from 'mime'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import gcs from '@/services/gcs';
import _ from 'lodash'

import { Storage } from '@google-cloud/storage'


export default (app: App) => 
    app.get('/', () => {

    })
    .post('/getUrlUpload', async({ body: { type }, set }) => {

        // const type = (_.get(file_upload,'type'));
        // const { file_upload } = body

        const filePath = `${uuidv4()}.${mime.getExtension(type)}`
        const [uploadUrl] = await gcs
            .bucket(process.env.GOOGLE_BUCKET_URL!)
            .file(filePath)
            .getSignedUrl({
                action: 'write',
                expires: moment().add(5, 'minute').toDate(),
                contentType: type,
            })

        if(uploadUrl) {
            set.status = 200;
            return {
                success:true,
                data: {
                    uploadUrl,
                    filePath
                },
                success_msg: "success"
            }
        } else {
            set.status = 400;
            return {
                error:true,
                error_msg: "Please try again later"
            }
        }
    }, {
        body: t.Object({
            type: t.String()
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })