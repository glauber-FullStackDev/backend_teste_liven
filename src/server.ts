import dotEnv from 'dotenv';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();
dotEnv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PATHS
// app.use('/user', userRoute);

export const serverHttp = http.createServer(app);

