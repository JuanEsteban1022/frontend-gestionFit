export interface loginResponse {
  enabled: number;
  role: string;
  token: string;
}

export interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
  idUser: string;
  dni: string;
}
