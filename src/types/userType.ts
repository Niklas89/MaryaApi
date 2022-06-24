type User = {
  idUser: number,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    isActive: boolean,
    signUpDate: string,
    deactivatedDate?: string,
    idRole: number,
  };

  export default User;