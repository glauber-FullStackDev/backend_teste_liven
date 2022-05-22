import { uuid } from "uuidv4";
import { Knex } from "../app";
import { STATUS } from "../Utils/Constants.utils";

const table = "adresses";

export const addNewAddress = async (userID: string, dataAddres: any) => {
  let dataAddressReady = {
    id: uuid(),
    userID: userID,
    ...dataAddres,
    status: STATUS.active,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await Knex.insert(dataAddressReady).table(table);

    return dataAddressReady;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};

export const updateInputsAddress = async (
  idAdress: string,
  dataInputs: any
) => {
  try {
    await Knex.update({
      ...dataInputs,
    })
      .where({ id: idAdress })
      .table(table);
    dataInputs.id = idAdress;

    return dataInputs;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const getAllAdressesByUserID = (userID: string) => {
  return Knex.select("*").from(table).where({ userID });
};

export const getAdressesByID = async (ID: string) => {
  return (await Knex.select("*").from(table).where({ id: ID }).limit(1))[0];
};
