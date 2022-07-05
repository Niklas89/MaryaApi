import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";


const categoryModel = dbConnection.define("category", {
    id: {
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

export default categoryModel;