import { checkPassword, generatePasswordAndSalt, generateToken } from '../../Utils/Security.utils';
import { Secret, verify } from 'jsonwebtoken';
import dotEnv from 'dotenv';
dotEnv.config();

describe('Security Features', () => {
    it('generate correct object password', () => {
        const passAndSalt = generatePasswordAndSalt('123456');

        expect(passAndSalt).toHaveProperty('hashedPassword');
        expect(passAndSalt).toHaveProperty('salt');
    })

    it('check the password correctly', () => {
        let password = '123456';

        let hashedPassAndSalt = generatePasswordAndSalt(password);

        let resultCheckPass = checkPassword(password, hashedPassAndSalt.hashedPassword, hashedPassAndSalt.salt);

        expect(resultCheckPass).toBeTruthy();
    })

    it('generate token with correct data', () => {
        let userID = '123456';
        let email = 'test@email.com';
        let status = 'ACTIVE';
        let firstname = 'Test';
        let lastname = 'da silva';
        let secretKey: Secret = process.env.jwt_secret as string;

        let token = generateToken(userID, email, status, firstname, lastname, '2d');

        verify(token, secretKey, ((err, decoded: any) =>{
            expect(decoded.userID).toBe(userID);
            expect(decoded.email).toBe(email);
            expect(decoded.status).toBe(status);
            expect(decoded.firstname).toBe(firstname);
            expect(decoded.lastname).toBe(lastname);
        }))
    })
})