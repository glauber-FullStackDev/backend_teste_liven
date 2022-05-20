import { serverHttp } from './server';
import dotEnv from 'dotenv';
dotEnv.config();

const port = process.env.port || 3000;

serverHttp.listen(port, () => {
    console.log('Listening in port: ' + port);
})