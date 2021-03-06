import { Address } from './../Interfaces/Address';
import {
  addNewAddress,
  updateInputsAddress,
  getAdressesByID,
  getAllAdressesByUserID
} from "../Models/Adresses.model";

import { STATUS } from '../Utils/Constants.utils'

export const createNewAddress = (userID: string, dataAddress: any) => {
  return addNewAddress(userID, dataAddress);
};

export const updateInputsByIdAddress = async (
  idAddress: string,
  userID: string,
  dataInputs: any
) => {
  try {
    const dataAddressAtual: Address = await getAdressesByID(idAddress);

    if (dataAddressAtual.userID !== userID) {
      return Promise.reject(new Error("not authorized"));
    }

    return updateInputsAddress(idAddress, dataInputs);
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const deleteAddress = async (idAddress: string, userID: string) => {
  try {
    const dataAddressAtual: Address = await getAdressesByID(idAddress);

    if (dataAddressAtual.userID !== userID) {
      return Promise.reject(new Error("not authorized"));
    }

    return updateInputsAddress(idAddress, {status: STATUS.deleted});
    
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getAdresses = (userID: string, conditions: any) => {
  return getAllAdressesByUserID(userID, conditions);
}
