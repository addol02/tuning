import type { App }  from '@/server'
import { t } from 'elysia'
import configs from "@/config";
import * as adminQuery from '@/queries/admin';
import _ from 'lodash';
import { authPlugin, jwtFn } from '@/queries/plugins/jwt';
import gcs from '@/services/gcs';

export default (app: App) => 
    app.get('/', () => {
        return 'NOT_AUTHORIZED'
    })
    .use(jwtFn)
    .post('/login', async({ body: { email, password }, set, db, jwt, cookie: { auth }}) => {

        const getAdminProfile = await adminQuery.getAdminProfile(db, email);

        if(_.get(getAdminProfile,'id')) {

            const hash = await Bun.password.hash(_.get(getAdminProfile,'password')!, configs.bunHashType);
            const isMatch = await Bun.password.verify(password, hash);

            if(!isMatch) {
                set.status = 400;
                return {
                    error: true,
                    error_msg: "Oops!, email or password is not found"
                }
            }
            const payloadCookie = {
                    username: email
            };

            const signJwt = await jwt.sign(payloadCookie);

            auth.set({
                value: signJwt,
                httpOnly: false,
                maxAge: 365 * 24 * 60 * 60,//7 * 86400,
            });
           

            if(auth) {
                    set.status = 200;
                    return {
                        success:true,
                        data: {
                            token: signJwt
                        },
                        success_msg: "Success!, login success"
                    }
                } else {
                    set.status = 400;
                    return {
                        error: true,
                        error_msg: "Oops!, some reason mistake."
                    }
                }

        } else {
            set.status = 400;
            return {
                error: true,
                error_msg: "Oops!, email or password is not found"
            }
        }
        
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        }),
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .use(authPlugin) // this will use derive for check first jwt verify automatic
    .post('/currentUser', async({ adminProfile, set}) => {
        if(adminProfile) {

            set.status = 200;
            return {
                success: true,
                data: adminProfile
            }

        } else {
            set.status = 400;
            return {
                error: true,
                error_msg: "Oops!, something went wrong."
            }
        }
    },{
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .get('/requestInfoList', async({ set, db }) => {
        
        const getRequestList = await adminQuery.getRequestChangeInfo(db);
        if(_.isError(getRequestList)) {
            set.status = 400;
            return {
                error: true,
                error_msg: "Oops!, something went wrong."
            }
        } else {
            set.status = 200;

            return {
                success: true,
                data: getRequestList,
            }   
        }
    },{
        response: {
            200: 'success',
            400: 'fail'
        }
    })
    .post('/requestInfoUpdate', async({ body: { firstname, lastname, id, status, racerunnerid }, set, db, adminProfile }) => {

        const updateRequestChange = await adminQuery.updateRequestList(db, firstname, lastname, id, status, racerunnerid);

        if(_.isError(updateRequestChange)) {
            set.status = 400;
            return {
                error: true,
                error_msg: "Oops!, something went wrong."
            }
        } else {
            set.status = 200;

            return {
                success: true,
                success_msg: "Success!, infomation has changed."
            }   
        }
    },{
        body: t.Object({
            firstname: t.String(),
            lastname: t.String(),
            id: t.Number(),
            status: t.Number(),
            racerunnerid: t.Number()
        }),
            response: {
                200: 'success',
                400: 'fail'
            }
    })
    // .post('/addAdmin', async({ set, db}) => {

    //     const user = 0
    //     const pwd = "runxp4ssw0rd!";
    //     const hash = await Bun.password.hash(pwd, configs.bunHashType);

    //     const data = {
    //         email:user,
    //         password:pwd
    //     }

    //     const createAdmin = await adminQuery.createAdminData(db, data);
    //     console.log(createAdmin);
        
    //     if(createAdmin) {
    //         return {
    //             success:true,
    //             success_msg: "Data has been added in races."
    //         }
    //     } else {
    //         set.status = 400;
    //         return {
    //             error: true,
    //             error_msg: "Some fields is missing."
    //         }
    //     }
    // }, {
    //     response: {
    //         200: 'success',
    //         400: 'fail'
    //     }
    // })
  