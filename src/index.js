'use strict';

import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';

import { connectDatabase } from "./server/db/index";
import { development, test, production } from './server/db/config';

const router = new Router();
const app = new Koa();
const PORT = process.env.port || 3002;


const databaseConfig = (process.env.NODE_ENV === 'production' ) ? production : development;

router.get('/', async ctx => {
   ctx.body = {
       data: 'hello world'
   };
});

app.use(router.routes());
app.use(BodyParser());
app.use(Logger());

(async () => {
    try {
        const info = await connectDatabase(databaseConfig);
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
        console.error('Unable to connect to database');
    }

    await app.listen(PORT);

    console.log(`Server running on ${PORT}...`);
})();


// module.exports = server;