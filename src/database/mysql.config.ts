import dotEnv from 'dotenv';
import knex from "knex";

dotEnv.config();

const Knex = knex({
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
});


export {
    Knex
}