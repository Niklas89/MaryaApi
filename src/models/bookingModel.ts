import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const bookingModel = dbConnection.define("booking", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    appointmentDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    nbHours: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
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

export default bookingModel;