import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const serviceModel = dbConnection.define("service", {
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
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    priceId: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

export default serviceModel;