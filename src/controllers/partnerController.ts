import Partner from "../types/partnerType";
import partnerModel from "../models/partnerModel";
import userModel from "../models/userModel";
import Express from "express";
import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";

// Récupérer les partenaires
const getPartners = (req: Express.Request, res: Express.Response) => {
    partnerModel.findAll()
        .then((partners: Partner) => {
            res.status(200).json(partners);
        })
        .catch((err: any) => {
            res.status(409).send(err);
        });
};

// modifier un partenaire
const editPartnerByCommercial = async (req: Express.Request, res: Express.Response) => {
    const { phone, birthdate, address, postalCode, city, img, SIRET, IBAN } = req.body;

    const transaction: Transaction = await dbConnection.transaction();
    try {
        //on crée notre utilisateur
        const user = await userModel.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        },
        { transaction: transaction }
    )
    //on commit nos changements 
    await transaction.commit();
    //on retourner les données de notre utilisateur
    return res.status(200).json(user);
} catch (err) {
    res.status(400).send(err);
    await transaction.rollback();
}

partnerModel.update({
    phone: phone,
    birthdate: birthdate,
    address: address,
    postalCode: postalCode,
    city: city,
    img: img,
    SIRET: SIRET,
    IBAN: IBAN
}, {
    where: {
        id: req.params.id
    }, individualHooks: true,
})
    .then((partner: Partner) => {
        res.status(201).json(partner);
    })
    .catch((err: Error) => {
        res.status(409).send(err);
    });
};

export { getPartners, editPartnerByCommercial };