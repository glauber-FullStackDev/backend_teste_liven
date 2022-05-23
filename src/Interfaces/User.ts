import { Address } from "./Address";

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  age: Number;
  password: string;
  salt: string;
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adresses: Address[]
}
