import { Knex } from "../database/mysql.config";
import { uuid } from "uuidv4";
import { STATUS } from "../Utils/Constants.utils";

const table = "users";

export const addNewUser = async (dataUser: any) => {
  let dataUserReady = {
    id: uuid(),
    ...dataUser,
    status: STATUS.active,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await Knex.insert(dataUserReady).table(table);

    delete dataUserReady.password;
    delete dataUserReady.salt;
    return dataUserReady;
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};

export const updateInputsUser = async (idUser: string, dataInputs: any) => {
  try {
    await Knex.update({
      ...dataInputs,
    })
      .where({ id: idUser })
      .table(table);
    dataInputs.id = idUser
    return dataInputs;
  } catch (error: any) {
    return Promise.reject(new Error(error.message));
  }
};

export const selectUserById = (idUser: string) => {
  return Knex.select("*").table(table).where({ id: idUser });
};

export const selectDataUserAndAdressesByUserID = async (idUser: string) => {
  let sql = ``;
  return (await Knex.raw(sql))[0];
};

export const selectUserByEmail = (email: string) => {
  return Knex.select("*").table(table).where({ email }).limit(1);
};
