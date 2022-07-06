import Partner from "../types/partnerType";
import partnerModel from "../models/partnerModel";
import userModel from "../models/userModel";
import Express from "express";
import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";

//ajouter un partenaire
const createPartner = (req: Express.Request, res: Express.Response) => {
    const { idUser, phone, birthdate, address, postalCode, city, SIRET, IBAN, idCategory } = req.body;

    partnerModel.create({
        idUser: idUser,
        phone: phone,
        birthdate: birthdate,
        address: address,
        postalCode: postalCode,
        city: city,
        SIRET: SIRET,
        IBAN: IBAN,
        idCategory: idCategory
    })
    .then((partner: Partner) => {
        res.status(200).json(partner);
    })
    .catch((err: any) => {
        res.status(409).send(err);
    });
};

// Récupérer les partenaires
const getPartners = (req: Express.Request, res: Express.Response) => {
    userModel.findAll({
        attributes: ["id", "firstName", "lastName", "email", "idRole"],
        include: [{
            model: partnerModel,
            required: true,
            attributes: ["phone", "birthdate", "address", "postalCode", "city", "SIRET", "IBAN", "idCategory"]
        }]
    })
        .then((partners: Partner) => {
            res.status(200).json(partners);
        })
        .catch((err: any) => {
            res.status(409).send(err);
        });
};

//récupérer un partenaire
const getPartnerById = (req: Express.Request, res: Express.Response) => {
    userModel.findByPk(
        req.params.id,
        {
            include: [{
                model: partnerModel,
                where: {
                    idUser: req.params.id
                },
            attributes: ["phone", "birthdate", "address", "postalCode", "city", "SIRET", "IBAN", "idCategory"]
            }],
            attributes: ["id", "firstName", "lastName", "email", "idRole"]
        })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: any) => {
            res.status(409).send(err);
        });
};

// modifier un partenaire par le commercial
const salesEditPartner = async (req: Express.Request, res: Express.Response) => {
    const { firstName, lastName, email, phone, birthdate, address, postalCode, city, img, SIRET, IBAN } = req.body;

    const transaction: Transaction = await dbConnection.transaction();
    try {
        //on crée notre utilisateur
        const user = await userModel.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
        }, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        },
            { transaction: transaction }
        );

        const partner = await partnerModel.update({
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
                idUser: req.params.id
            },
            individualHooks: true,
        },
            { transaction: transaction });

        //on commit nos changements 
        await transaction.commit();
        //on retourner les données de notre utilisateur
        return res.status(200).json({ user, partner });
    } catch (err) {
        res.status(400).send(err);
        await transaction.rollback();
    }
};

// modification des informations personelles par l'utilisateur
const editPersonalInfo = async (req: Express.Request, res: Express.Response) => {
    const { firstName, lastName, email, phone, birthdate } = req.body;

    const transaction: Transaction = await dbConnection.transaction();
    try {
        const user = await userModel.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
        }, {
            where: {
                id: req.params.id
            },
            individualHooks: true,
        },
            { transaction: transaction }
        );

        const partner = await partnerModel.update({
            phone: phone,
            birthdate: birthdate,
        }, {
            where: {
                idUser: req.params.id
            }, individualHooks: true,
        },
            { transaction: transaction });

        //on commit nos changements 
        await transaction.commit();
        //on retourner les données de notre utilisateur
        return res.status(200).json({ user, partner });
    } catch (err) {
        res.status(400).send(err);
        await transaction.rollback();
    }
};

//modification des informations professionnelles par l'utilisateur
const editProfessionalfInfo = (req: Express.Request, res: Express.Response) => {
    const { SIRET, IBAN } = req.body;

    partnerModel.update({
        SIRET: SIRET,
        IBAN: IBAN,
    }, {
        where: {
            idUser: req.params.id
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

//modification de l'adresse par l'utilisateur
const editAddress = (req: Express.Request, res: Express.Response) => {
    const { address, postalCode, city } = req.body;

    partnerModel.update({
        address: address,
        postalCode: postalCode,
        city: city
    }, {
        where: {
            idUser: req.params.id
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

//modification d'une catégorie par l'utilisateur
const editCategory = (req: Express.Request, res: Express.Response) => {

    partnerModel.update({
        idCategory: req.body.idCategory
    }, {
        where: {
            idUser: req.params.id
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

export { createPartner, getPartners, getPartnerById, salesEditPartner, editPersonalInfo, editProfessionalfInfo, editAddress, editCategory };