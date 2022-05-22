import { Knex } from '../database/mysql.config';
import { uuid } from 'uuidv4';
import { STATUS } from '../Utils/Constants.utils'

const table = 'adresses';

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

export const getAllAdressesByUserID = (userID: string) => {
    return Knex.select('*').from(table).where({userID});
}