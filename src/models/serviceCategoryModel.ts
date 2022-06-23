import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const serviceCategoryModel = dbConnection.define("serviceCategory", {
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

export default serviceCategoryModel;