import { User } from './../../Interfaces/User';
import { DataUser } from './../../Interfaces/DataUser';
import { Request, Response } from 'express';
import { createUser, signIn, updateDadosUserById, deleteUserByID, getUserData } from '../../Controllers/Users.ctrl';
import { RequestWithUserData } from '../../Interfaces/RequestWithUserData';

export const onCreateNewUser = (req: RequestWithUserData, res: Response) => {
    let dataUser: User = req.body;

    createUser(dataUser).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: true, message: err.message});
    })
}

export const onSignIn = (req: RequestWithUserData, res: Response) => {
    const {email, password} = req.body;

    signIn(email, password).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {token: result?.token}});
    }).catch(err => {
        return res.status(400).send({error: false, message: err.message})
    })
}

export const onUpdateDataByUserID = (req: RequestWithUserData, res: Response) => {
    const dataUpdate: User = req.body;
    const dataUser: DataUser = req.dataUser;

    updateDadosUserById(dataUpdate, dataUser.userID).then(result => {
        return res.status(200).send({error: false, message: 'success', data: {...result}});
    }).catch(err => {
        return res.status(400).send({error: false, message: err.message})
    })
}

export const onDeleteUser = (req: RequestWithUserData, res: Response) => {
    const { id } = req.params;

    if(id !== req.dataUser.userID) {
        return res.status(400).send({error: true, message: 'not authorized'});
    }

    deleteUserByID(id).then(result => {
        return res.status(200).send({error: false, message: result});
    }).catch(err => {
        return res.status(400).send({error: false, message: err.message})
    })
}

export const onGetDataUser = (req: RequestWithUserData, res: Response) => {
    let dataUser: DataUser = req.dataUser;

    getUserData(dataUser.userID).then(result => {
        return res.status(200).send({error: false, message: 'success', data: result});
    }).catch(err => {
        return res.status(400).send({error: false, message: err.message})
    })
}