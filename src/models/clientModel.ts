import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const clientModel = dbConnection.define("client", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: true
    }
});

export default clientModel;