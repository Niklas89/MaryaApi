import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const serviceCategory = dbConnection.define("role", {
    idServiceCategory: {
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

export default serviceCategory;