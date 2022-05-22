import {
  addNewUser,
  selectUserByEmail,
  selectDataUserAndAdressesByUserID,
  selectUserById,
  updateInputsUser,
} from "../Models/Users.model";
import { STATUS } from '../Utils/Constants.utils';

import { generatePasswordAndSalt, checkPassword, generateToken } from "../Utils/Security.utils";

export const createUser = async (dataUser: any) => {
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
  } catch (error) {
    return true;
  }
}

export const signIn = async (email: any, password: any) => {
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
    let userData = (await selectUserById(userID))[0];

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
