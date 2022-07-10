type User = {
  id: number,
  firstName: string,
  lastName: string,
  password: string,
  email: string
  resetToken: string,
  resetTokenExpiration: Date,
  isActive: boolean,
  deactivatedDate?: string,
  idRole: number
};

export default User;