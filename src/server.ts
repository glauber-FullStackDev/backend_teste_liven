import dotEnv from 'dotenv';
import express from "express";
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { createServer } from 'http';
import UsersRoute from './Routes/Users';
import AdressesRoute from './Routes/Adresses'; 

const app = express();
dotEnv.config();

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

//PATHS
app.use('/v1/users', UsersRoute);
app.use('/v1/adresses', AdressesRoute);

export const serverHttp = createServer(app);

