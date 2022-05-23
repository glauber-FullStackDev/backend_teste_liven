import knex from "knex";
import dotEnv from 'dotenv';
dotEnv.config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});


const _Knex = knex({
    client: 'mysql2',
    connection: {
      host :process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      user : process.env.DB_USER ,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
});


export {
    _Knex
}