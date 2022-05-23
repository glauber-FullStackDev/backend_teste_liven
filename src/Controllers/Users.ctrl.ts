import { User } from "../Interfaces/User";
import {
  addNewUser,
  selectUserByEmail,
  selectDataUserAndAdressesByUserID,
  selectUserById,
  updateInputsUser,
} from "../Models/Users.model";
import { STATUS } from '../Utils/Constants.utils';

import { generatePasswordAndSalt, checkPassword, generateToken } from "../Utils/Security.utils";

export const createUser = async (dataUser: User) => {
  let passAndSalt = generatePasswordAndSalt(dataUser.password);

  dataUser['password'] = passAndSalt.hashedPassword;
  dataUser['salt'] = passAndSalt.salt;

  return addNewUser(dataUser);
};

export const checkEmailAlreadyExist = async (email: string) => {
  try {
    let users = await selectUserByEmail(email);

    if(users.length == 0) {
      return false;
    }else {
      return true;
    }
  } catch (error: any) {
    return true;
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const dataUserByEmail = (await selectUserByEmail(email))[0];
    
    if(!dataUserByEmail) {
      return Promise.reject(new Error('user not exist'));
    }

    let checkPass = checkPassword(password, dataUserByEmail.password, dataUserByEmail.salt);

    if(checkPass) {
      return {token: generateToken(dataUserByEmail.id, dataUserByEmail.email, dataUserByEmail.status, dataUserByEmail.firstname, dataUserByEmail.lastname, '2d')} 
    }
  } catch (error: any) {
    return Promise.reject(new Error(error.message))
  }
  
}

export const updateDadosUserById = async (dataAndInputs: any, userID: string) => {
  return updateInputsUser(userID, dataAndInputs);
}

export const deleteUserByID = async (userID: string) => {
  try {
    let userData: User = (await selectUserById(userID))[0];

    if(!userData) {
      return Promise.reject(new Error('user not exist'));
    }

    let emailFormatedOld = `${userData.email}_deleted`;
    
    await updateDadosUserById({
      email: emailFormatedOld,
      status: STATUS.deleted
    }, userID);

    return 'user deleted';
  } catch (error: any) {
    return Promise.reject(new Error(error.message))
  }
}

export const getUserData = async (idUser: string) => {
  try {
    let dataBD = await selectDataUserAndAdressesByUserID(idUser);
    let adresses: any[] = [];
    let bdDataReady = {
      id: dataBD[0].id,
      email: dataBD[0].email,
      firstname: dataBD[0].firstname,
      lastname: dataBD[0].lastname,
      age: dataBD[0].age,
      gender: dataBD[0].gender,
      status: dataBD[0].status,
      createdAt: dataBD[0].createdAt,
      updatedAt: dataBD[0].onUpdateDataByUserID,
      adresses: adresses
    }

    dataBD.forEach((address: any) => {
      let dataAdress: any = {
        id: address.idAddress,
        userID: address.userID,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        complement: address.complement,
        state: address.state,
        country: address.country,
        status: address.status,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      }

      bdDataReady.adresses.push(dataAdress);
    });

    return bdDataReady;

  } catch (error: any) {
    return Promise.reject(new Error(error.message))
  }
}