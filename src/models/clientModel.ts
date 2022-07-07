import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";
import sequelize from "sequelize/types/sequelize";

const clientModel = dbConnection.define("client", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Le champ est vide."
          },
          min: {
            args: 10,
            msg: "Le numéro de téléphone doit contenir 10 chiffres au minimum."
          },
          isNumeric: true,
        }
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Le champ est vide."
          }
        }
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Le champ est vide."
          },
          min: {
            args: 5,
            msg: "Le code postal doit contenir 5 chiffres au minimum."
          },
          isNumeric: true,
        }
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Le champ est vide."
          }
        }
    }
});

export default clientModel;