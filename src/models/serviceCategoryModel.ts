import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

import partnerModel from "../models/partnerModel";
import serviceModel from "../models/serviceModel";

const serviceCategoryModel = dbConnection.define("serviceCategory", {
    id: {
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

/* ASSOCIATION serviceCategory - partner */
serviceCategoryModel.hasMany(partnerModel, {
    foreignKey: {
      name: 'idServiceCategory', allowNull: false
    }
  });
  
  
  /* ASSOCIATION service - serviceCategory */
  serviceCategoryModel.hasMany(serviceModel, {
    foreignKey: {
      name: 'idServiceCategory', allowNull: false
    }
  });

export default serviceCategoryModel;