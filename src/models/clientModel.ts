import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const clientModel = dbConnection.define("client", {
    idUClient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

export default clientModel;