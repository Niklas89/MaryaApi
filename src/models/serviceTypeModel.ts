import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const serviceType = dbConnection.define("role", {
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

export default serviceType;