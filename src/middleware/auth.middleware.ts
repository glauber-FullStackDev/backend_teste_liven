import {verify, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const authToken = (req: Request | any, res: Response, next: NextFunction) => {
      let token = ''
      let secretKey: Secret = process.env.jwt_secret as string;
  
      token = req.headers.authorization as string;
  
      verify(token, secretKey, (err, decoded: any) =>{
          if(err) {
            return res.status(403).send();
          } else {
            if(decoded['userID']) {
              req['dataUser'] = decoded;
              next();
            }else {
              return res.status(403).send();
            }
          }
      })
  }