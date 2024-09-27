import { Storage } from '@google-cloud/storage'

const gcs = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

export default gcs