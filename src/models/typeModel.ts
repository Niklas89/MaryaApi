import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const typeModel = dbConnection.define("type", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNul: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNul: false
    }
});

export default typeModel;