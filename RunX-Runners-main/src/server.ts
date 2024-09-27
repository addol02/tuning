import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";
import { swagger } from "@elysiajs/swagger";
// import { cookie } from "@elysiajs/cookie";
import { autoroutes } from "elysia-autoroutes";
import { jwt } from "@elysiajs/jwt";
import * as interface_ from "./utils/interface";
// import * as runnerQuery from './queries/runner';
// import * as eventQuery from './queries/events';
// import * as raceQuery from './queries/races';

// import configs from "./config";

const setup = (app: Elysia) => app.decorate("db", new PrismaClient());

const app = new Elysia()
  .use(cors())
  .use(swagger({
    path: "/debug/_swagger"
  }))
  // .use(cookie())
  .use(setup)
  .model({
    success: t.Object({
        success: t.Boolean(),
        data: t.Optional(t.Any()),
        success_msg: t.Optional(t.String())
        }),
    fail: t.Object({
        error: t.Boolean(),
        error_msg: t.Optional(t.String())
    })
  })
  .use(autoroutes({ routesDir: './api', prefix: '/api' }))
  .get("/", () => "Runx.run X Elysia")
  // .group("/admin", (app) => {
  //   return app
  //     .guard(
  //     {
  //       query: t.Object({
  //         q: t.String(),
  //       }),
  //     }, (app) => app
  //     .get("/profile", ({ query }) => `query: ${query.q}`))
  // })
  // .post('/sign', ({ body: { image, title } }) => title, {
  //   body: t.Object({
  //       image: t.File(),
  //       title: t.String()
  //   })
  // })
  // .post("/sign", async ({ body: { user, pwd }, set, jwt, cookie, setCookie }) => {

  //   if(!user || !pwd) {
  //     set.status == 400;
  //     return {
  //       error:true
  //     }
  //   }

  //   const hash = await Bun.password.hash(pwd, configs.bunHashType);
  //   const isMatch = await Bun.password.verify(pwd, hash);

  //   console.log(isMatch);

  //   const payloadCookie = {
  //     username: user as string
  //   };

  //   setCookie('auth', await jwt.sign(payloadCookie), {
  //     httpOnly: true,
  //     maxAge: 7 * 86400,
  //   });

  //   return {
  //     success: true,
  //     data:{ token: cookie.auth }
  //   }
  // }, {
  //   body: t.Object({
  //     user: t.String(),
  //     pwd: t.String()
  //   }),
  //   response: {
  //     200: 'success',
  //     400: 'fail'
  //   }
  // })
  // .get('/profileInfo', async ({ jwt, set, cookie: { auth } }) => {

  //   if(!auth) {
  //     set.status = 400
  //     return { 
  //       error: true
  //     }
  //   }

  //   const profile = await jwt.verify(auth)

  //   if (!profile) {
  //     set.status = 401
  //     return {
  //       error:true
  //     }
  //   } else {
  //     return {
  //       success: true,
  //       data: profile
  //     }
  //   }

  // }, {
  //   response: {
  //     200: 'success',
  //     400: 'fail',
  //     401: 'fail'
  //   }
  // })
  // .get("/id/:id", async ({ params: { id }, set, db },) => {

  //   //set.status = 400 | 200 or check set.status
  //   const dataRunner = await runnerQuery.getRunnerProfile(db, id);

  //   if(set.status === 400) {
  //     return {
  //       error:true
  //     }
  //   }
    
  //   return {
  //     success:true,
  //     data:dataRunner
  //   }
  // },{
  //     response: {
  //       200: 'success',
  //       400: 'fail'
  //     }
  //   }
  // )
  .get("/info", ({ set }) => {
    const value:interface_.InfoResponse = {
      "version": "1.01"
    }
    if(set.status == 200) {
      return { success: true, data: { value } }

    }  else {
      return { error: true }

    }
  },{
    response: {
      200: 'success',
      400: 'fail'
    }
  })
  // .group("/races", (app) => {
  //   return app
  //     .get("/:eventId", async ({ db, set, params }) => {
  //       const races = await raceQuery.getByEventId(db, params.eventId);
  //       return races;
  //     })
  //     .get("/runner/:raceId", async ({ db, set, params, query }) => {
  //       const runnerOnRace = await raceQuery.getRunnerOnRace(db, params.raceId, query);
  //       return runnerOnRace;
  //     }, {
  //       query: t.Object({
  //         typeSort: t.String(),
  //       })
  //     })
  // })
  .listen(process.env.PORT || 8080);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
