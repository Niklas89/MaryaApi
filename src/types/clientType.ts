type Client = {
  id: number,
  phone: string,
  address: string,
  postalCode: string,
  city: string,
  idUser: number,
  idUser_salesHasClient?: number
};

export default Client;