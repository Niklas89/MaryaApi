type Partner = {
  id: number,
  phone: string,
  birthdate: string,
  address: string,
  postalCode: string,
  city: string,
  img?: string,
  SIRET: string,
  IBAN: string,
  idUser: number,
  idUser_salesHasPartner?: number
};

export default Partner;