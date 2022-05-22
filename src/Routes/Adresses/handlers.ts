import { Request, Response } from 'express';
import { createNewAddress } from '../../Controllers/Adresses.ctrl';

interface RequestWithUserData extends Request {
    dataUser?: any,
}

export const onCreateNewAddress = (req: RequestWithUserData, res: Response) => {
    const dataAddress = req.body;
    const dataUser = req.dataUser;

    createNewAddress(dataUser.userID, dataAddress).then(result => {
        return res.status(200).send({error: false, data: {...result, message: 'success'}});
    }).catch(err => {
        return res.status(400).send({error: true, data: {message: err.message}});
    })
}