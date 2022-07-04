import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const partnerModel = dbConnection.define("partner", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNul: false,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNul: true
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNul: true
    },
    address: {
        type: Sequelize.STRING,
        allowNul: true
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNul: true
    },
    city: {
        type: Sequelize.STRING(50),
        allowNul: true
    },
    img: {
        type: Sequelize.STRING,
        allowNul: true
    },
    SIRET: {
        type: Sequelize.STRING(14),
        allowNul: true
    },
    IBAN: {
        type: Sequelize.STRING(34),
        allowNul: true
    }
});

export default partnerModel;