import { Request, Response } from 'express';
import { createUser, signIn, updateDadosUserById, deleteUserByID } from '../../Controllers/Users.ctrl';

interface RequestWithUserData extends Request {
    dataUser?: any,
}

export const onCreateNewUser = (req: RequestWithUserData, res: Response) => {
    let dataUser = req.body;

    createUser(dataUser).then(result => {
        res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        res.status(400).send({error: true, message: err.message});
    })
}

export const onSignIn = (req: RequestWithUserData, res: Response) => {
    const {email, password} = req.body;

    signIn(email, password).then(result => {
        res.status(200).send({error: false, message: 'success', data: {token: result?.token}});
    }).catch(err => {
        res.status(400).send({error: false, message: err.message})
    })
}

export const onUpdateDataByUserID = (req: RequestWithUserData, res: Response) => {
    const dataUpdate = req.body;
    const dataUser = req.dataUser;

    updateDadosUserById(dataUpdate, dataUser.userID).then(result => {
        res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        res.status(400).send({error: false, message: err.message})
    })
}

export const onDeleteUser = (req: RequestWithUserData, res: Response) => {
    const { id } = req.params;

    if(id !== req.dataUser.userID) {
        return res.status(400).send({error: true, message: 'not authorized'});
    }

    deleteUserByID(id).then(result => {
        res.status(200).send({error: false, message: result});
    }).catch(err => {
        res.status(400).send({error: false, message: err.message})
    })
}