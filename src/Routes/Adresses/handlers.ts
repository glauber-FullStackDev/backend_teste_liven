import { Address } from './../../Interfaces/Address';
import { DataUser } from './../../Interfaces/DataUser';
import { Request, Response } from 'express';
import { createNewAddress, updateInputsByIdAddress, deleteAddress, getAdresses } from '../../Controllers/Adresses.ctrl';
import { RequestWithUserData } from '../../Interfaces/RequestWithUserData';

export const onCreateNewAddress = (req: RequestWithUserData, res: Response) => {
    const dataAddress = req.body;
    const dataUser: DataUser = req.dataUser;

    createNewAddress(dataUser.userID, dataAddress).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: true, message: err.message});
    })
}

export const onUpdateInputsAddressByidAddress = (req: RequestWithUserData, res: Response) => {
    const dataAddress: Address = req.body.inputs;
    const idAddress = req.body.id;
    const dataUser: DataUser = req.dataUser;

    updateInputsByIdAddress(idAddress, dataUser.userID, dataAddress).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: true,  message: err.message});
    })
}

export const onDeleteByidAddress = (req: RequestWithUserData, res: Response) => {
    const idAddress = req.params.id;
    const dataUser: DataUser = req.dataUser;

    deleteAddress(idAddress, dataUser.userID).then(result => {
        return res.status(200).send({error: false, message: 'address deleted'});
    }).catch(err => {
        return res.status(400).send({error: true,  message: err.message});
    })
}

export const onGetAllAdresses = (req: RequestWithUserData, res: Response) => {
    const filter = req.query;
    const dataUser: DataUser = req.dataUser;
    console.log('QUERY PARAMS ===> ', filter);
    
    getAdresses(dataUser.userID, filter).then(result => {
        return res.status(200).send({error: false, message: 'success', data: result});
    }).catch(err => {
        return res.status(400).send({error: true,  message: err.message});
    })
}
