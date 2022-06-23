import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const userModel = dbConnection.define("user", {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  signUpDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  deactivatedDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

export default userModel;