import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

import serviceModel from "../models/serviceModel";

const serviceTypeModel = dbConnection.define("serviceType", {
    idServiceType: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNul: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNul: false
    },
});

/* ASSOCIATION serviceType - service */
serviceTypeModel.hasMany(serviceModel, {
    foreignKey: {
      name: 'idServiceType', allowNull: false
    }
  });

export default serviceTypeModel;