type User = {
  idUser: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    isActive: boolean,
    deactivatedDate?: string,
    idRole: number,
  };

  export default User;