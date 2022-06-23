import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";

const partnerModel = dbConnection.define("partner", {
    idPartner: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNul: false,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNul: false
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNul: false
    },
    address: {
        type: Sequelize.STRING,
        allowNul: false
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNul: false
    },
    city: {
        type: Sequelize.STRING(50),
        allowNul: false
    },
    img: {
        type: Sequelize.STRING,
        allowNul: true
    },
    SIRET: {
        type: Sequelize.STRING(14),
        allowNul: false
    },
    IBAN: {
        type: Sequelize.STRING(34),
        allowNul: false
    }
});

export default partnerModel;