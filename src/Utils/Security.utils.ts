import { randomBytes, createHmac } from 'crypto';
import { sign, Secret } from 'jsonwebtoken';

export const generatePasswordAndSalt = (password: string) => {
    const salt = randomBytes(32).toString('hex');
    const hashedPassword = encryptPassword(password, salt);
    return {
      salt,
      hashedPassword
    }
}

const encryptPassword = (password: string, salt: string) => {
    return createHmac('sha1', salt).update(password).digest('hex');
}


export const generateToken = (userID: string, email: string, status: string, firstname: string, lastname: string, expiration: string) => {
  const options: any = {}
  const secretKey: Secret = process.env.jwt_secret as string; 

  if (expiration) {
    options['expiresIn'] = expiration
  }

  let dataToken = {
    userID,
    email,
    firstname,
    lastname,
    status
  }

  return sign(
    dataToken,
    secretKey,
    options
  )
}

export const checkPassword = (password: string, hashedPassword: string, salt: string) => {
   return encryptPassword(password, salt) === hashedPassword;
}
