import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";

const bookingModel = dbConnection.define("booking", {
    idBooking: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    appointementDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    nbHours: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    cancelDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    isCancelled: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    serviceDone: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});


/* ASSOCIATIONS BOOKING - CLIENT / PARTNER */
clientModel.hasMany(bookingModel, {
    foreignKey: {
      name: 'idClient', allowNull: false
    }
  });
  partnerModel.hasMany(bookingModel, {
    foreignKey: {
      name: 'idPartner', allowNull: false
    }
  });

export default bookingModel;