import { uuid } from "uuidv4";
import dotEnv from 'dotenv';
dotEnv.config({
  path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});
import { _Knex } from '../database/mysql.config'
import { STATUS } from "../Utils/Constants.utils";

const Knex = _Knex;
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
  let sql = `select u.*, a.*, a.id as idAddress from users as u inner join adresses as a on u.id = a.userID where u.id = "${idUser}";`;
  return (await Knex.raw(sql))[0];
};

export const selectUserByEmail = (email: string) => {
  return Knex.select("*").table(table).where({ email }).limit(1);
};
