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
        allowNul: true,
        unique: {
            args: true,
            msg: "Ce numéro de téléphone est déjà enregistré sur un autre compte."
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "Le champ est vide."
            },
            isNumeric: {
                args: true,
                msg: "Le code postal n'est pas valide."
            }
        }
    },
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNul: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "Le champ est vide."
            },
            isDate: {
                args: true,
                msg: "Il ne s'agit pas d'une date. Veuillez recommencer"
            }
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNul: true
    },
    postalCode: {
        type: Sequelize.STRING(5),
        allowNul: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "Le champ est vide."
            },
            isNumeric: {
                args: true,
                msg: "Le code postal n'est pas valide."
            },
            min: {
                args: 5,
                msg: "Le code postal est trop court."
            }
        }
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
        allowNul: true,
        unique: {
            args: true,
            msg: "Ce SIRET est déjà enregistré sur un autre compte."
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "Le champ est vide."
            },
            isNumeric: {
                args: true,
                msg: "Le SIRET n'est pas valide."
            },
            min: {
                args: 14,
                msg: "Le SIRET est trop court."
            }
        }
    },
    IBAN: {
        type: Sequelize.STRING(34),
        allowNul: true,
        unique: {
            args: true,
            msg: "Cette IBAN est déjà enregistré sur un autre compte."
        },
        validate: {
            notEmpty: {
                args: true,
                msg: "Le champ est vide."
            },
            isAlphanumeric: {
                args: true,
                msg: "L'IBAN n'est pas valide."
            },
        }
    }
});

export default partnerModel;