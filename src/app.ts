import { serverHttp } from './server';
import { _Knex } from './database/mysql.config'
import dotEnv from 'dotenv';
dotEnv.config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

const port = process.env.port || 3000;

serverHttp.listen(port, () => {
    console.log('Listening in port: ' + port);
});
