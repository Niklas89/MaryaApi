import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const service = dbConnection.define("role", {
    idService: {
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

export default service;