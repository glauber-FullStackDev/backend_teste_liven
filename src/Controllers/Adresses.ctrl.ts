import { addNewAddress, getAllAdressesByUserID } from '../Models/Adresses.model';

export const createNewAddress = (userID: string, dataAddress: any) => {
    return addNewAddress(userID, dataAddress);
}