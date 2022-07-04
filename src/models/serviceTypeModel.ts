import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

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

export default serviceTypeModel;