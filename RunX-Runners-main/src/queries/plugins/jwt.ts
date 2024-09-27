import type { App }  from '@/server'
import { t } from 'elysia'
import configs from "@/config";
import { jwt } from "@elysiajs/jwt";

import _ from 'lodash';

export const jwtFn = jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET as string,
});

const authPlugin = (app: App) => 
    app.use(jwtFn)
    .derive(async ({ jwt, cookie: { auth }, set, headers }) => {

        if(!_.get(headers,'authorization')) {
            set.status = 200;
            throw new Error("Please try again to login")
        }

        const bearerToken = _.get(headers,'authorization')?.split("Bearer ")[1];

        const adminProfile = await jwt.verify(bearerToken);

        if(!adminProfile) {
            set.status = 200;
            throw new Error("Please try again to login")
            
        }

        return { adminProfile }
        
    })



export { authPlugin };