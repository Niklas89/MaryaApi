import Partner from "../types/partnerType";
import Booking from "../types/bookingType";
import partnerModel from "../models/partnerModel";
import userModel from "../models/userModel";
import bookingModel from "../models/bookingModel";
import Express from "express";
import dbConnection from "../config/dbConfig";
import moment from "moment";
import { Op } from "sequelize";
import categoryModel from "../models/categoryModel";
import serviceModel from "../models/serviceModel";
import Transaction from "sequelize/types/transaction";

//ajouter un partenaire
const addPartner = (req: Express.Request, res: Express.Response) => {
    const { phone, birthdate, address, postalCode, city, SIRET, IBAN, idCategory } = req.body;
    partnerModel.create({
        idUser: req.user.id,
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

//récupérer un partenaire
const getPartnerProfile = (req: Express.Request, res: Express.Response) => {
    userModel.findByPk(
        req.user.id,
        {
            include: [{
                model: partnerModel,
                where: {
                    idUser: req.user.id
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

// modification des informations personelles par l"utilisateur
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
                id: req.user.id
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
                idUser: req.user.id
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

//modification des informations professionnelles par l"utilisateur
const editProfessionalfInfo = (req: Express.Request, res: Express.Response) => {
    const { SIRET, IBAN } = req.body;

    partnerModel.update({
        SIRET: SIRET,
        IBAN: IBAN,
    }, {
        where: {
            idUser: req.user.id,
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

//modification de l"adresse par l"utilisateur
const editAddress = (req: Express.Request, res: Express.Response) => {
    const { address, postalCode, city } = req.body;

    partnerModel.update({
        address: address,
        postalCode: postalCode,
        city: city
    }, {
        where: {
            idUser: req.user.id,
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

//modification d"une catégorie par l"utilisateur
const editCategory = (req: Express.Request, res: Express.Response) => {

    partnerModel.update({
        idCategory: req.body.idCategory
    }, {
        where: {
            idUser: req.user.id,
        }, individualHooks: true,
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};


//Fonction qui permet de récuperé les bookings du client par (future, present, passé) et (accepté ou pas)
const getBookingById = (req: Express.Request | any, res: Express.Response) => {
    //permet de récuperé l"argument dans l"url
    const dateType = req.params.dateType;
    //On instancie les variable à null
    let whereClause = null;
    //Pour les dates on verifie si c"est un date supperieur à aujourd"hui, 
    if (dateType === "future") {
        whereClause = { [Op.gt]: moment().add(1, "d").format("YYYY-MM-DD") };
    }
    //Si c"est une date inférieur à aujourd"hui
    else if (dateType === "past") {
        whereClause = { [Op.lt]: moment().subtract(1, "d").format("YYYY-MM-DD") };
    }
    //Sinon si c"est une date égale à aujourd"hui
    else {
        whereClause = { [Op.between]: [moment().format("YYYY-MM-DD"), moment().add(1, "d").format("YYYY-MM-DD")] };
    }
    //On fait deux jointure dans la même requette
    userModel.findByPk(req.user.id, {
        include: [
            {
                model: partnerModel,
                where: {
                    idUser: req.user.id
                },
                include: {
                    model: bookingModel,
                    //attributes: ["appointementDate", "nbHours", "description", "totalPrice", "accepted"],
                    where: {
                        appointementDate: whereClause,
                    }
                }
            }
        ]
    })
        .then((partner: Partner) => {
            res.status(200).json(partner);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        })
};

//récuperé les bookings sans partenaire
const getPendingBookings = (req: Express.Request, res: Express.Response) => {
    //on recupère l"idCategory du partenaire via le token
    partnerModel.findOne({
        attributes: ["idCategory"],
        where: {
            idUser: req.user.id
        }
    })
        .then((partner: Partner) => {
            //on recupère les bookings non acceptés correspondant à la catégorie du partenaire
            categoryModel.findAll({
                where: {
                    id: partner.idCategory
                },
                include: [
                    {
                        model: serviceModel,
                        include: {
                            model: bookingModel,
                            where: {
                                accepted: 0,
                                appointmentDate: { [Op.gt]: moment().add(1, "d").format("YYYY-MM-DD") }
                            }
                        }
                    }
                ]
            })
                .then((booking: Booking) => {
                    res.status(200).json(booking);
                })
                .catch((err: Error) => {
                    res.status(409).send(err);
                })

        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};



export { addPartner, getPartnerProfile, editPersonalInfo, editProfessionalfInfo, editAddress, editCategory, getBookingById, getPendingBookings };

