import { Request, Response } from 'express';
import { createNewAddress, updateInputsByIdAddress, deleteAddress } from '../../Controllers/Adresses.ctrl';

interface RequestWithUserData extends Request {
    dataUser?: any,
}

export const onCreateNewAddress = (req: RequestWithUserData, res: Response) => {
    const dataAddress = req.body;
    const dataUser = req.dataUser;

    createNewAddress(dataUser.userID, dataAddress).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: true, message: err.message});
    })
}

export const onUpdateInputsAddressByidAddress = (req: RequestWithUserData, res: Response) => {
    const dataAddress = req.body.inputs;
    const idAddress = req.body.id;
    const dataUser = req.dataUser;

    updateInputsByIdAddress(idAddress, dataUser.userID, dataAddress).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: true,  message: err.message});
    })
}

export const onDeleteByidAddress = (req: RequestWithUserData, res: Response) => {
    const idAddress = req.params.id;
    const dataUser = req.dataUser;

    deleteAddress(idAddress, dataUser.userID).then(result => {
        return res.status(200).send({error: false, message: 'address deleted'});
    }).catch(err => {
        return res.status(400).send({error: true,  message: err.message});
    })
}
