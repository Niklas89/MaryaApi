import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";
import User from "../types/userType";
import bcrypt from "bcryptjs";
import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";

//fonction permettant de créer un token
const createToken = (id: number) => {
    if (typeof process.env.TOKEN_SECRET === "string") {
        //on retourne un token suivant l'id de l'utilisateur et son email, qui expires dans 1h
        return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "1 hours" })
    }
};

//fonction permettant de connecter un utilisateur
const signIn = (req: Express.Request, res: Express.Response) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then((user: User) => {
            const auth: boolean = bcrypt.compareSync(req.body.password, user.password);
            if (auth) {
                const token = createToken(user.id);

                res.status(200).send({ user, token });
            } else {
                res.status(401).json("Mot de passe incorrect"); 
            }
        })
        .catch(() => {
            res.status(401).send("Email inconnu");
        });
};

//fonction permettant de créer un utilisateur
const signUp = async (req: Express.Request, res: Express.Response) => {
    //on initie la transaction
    userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        idRole: req.body.idRole
    }).
    then((user:User) => {
        res.status(201).send(user);
    })
    .catch((err:Error) => {
        res.status(422).send(err);
    })
};


//fonction permettant de créer un client par le commercial
const salesAddClient = async (req: Express.Request, res: Express.Response) => {
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
        //on crée notre utilisateur
        const user = await userModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            idRole: req.body.idRole
        }, { transaction: transaction });

        //on crée un client 
        if (user.idRole === 1) {
            await clientModel.create({
                idUser: user.id,
                idUser_salesHasClient: req.body.idUser_salesHasClient,
                phone: req.body.phone,
                address: req.body.address,
                postalCode: req.body.postalCode,
                city: req.body.city
            }, { transaction: transaction })
        }

        //on commit nos changements 
        await transaction.commit();
        //on retourner les données de notre utilisateur
        return res.status(201).json(user);
    } catch (err) {
        await transaction.rollback();
    }
};

//fonction permettant de créer un client par le commercial
const salesAddPartner = async (req: Express.Request, res: Express.Response) => {
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
        //on crée notre utilisateur
        const user = await userModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            idRole: req.body.idRole
        }, { transaction: transaction });

        //on crée un client 
        if (user.idRole === 2) {
            await partnerModel.create({
                idUser: user.id,
                phone: req.body.phone,
                birthdate: req.body.birthdate,
                address: req.body.address,
                postalCode: req.body.postalCode,
                city: req.body.city,
                SIRET: req.body.siret,
                IBAN : req.body.iban,
                idUser_salesHasPartner: req.body.idUser_salesHasPartner,
                idCategory: req.body.idCategory
            }, { transaction: transaction })
        }

        //on commit nos changements 
        await transaction.commit();
        //on retourner les données de notre utilisateur
        return res.status(201).json(user);
    } catch (err) {
        await transaction.rollback();
    }
};

//on exporte les fonctions inscriptions/connexions
export { signIn, signUp, salesAddClient, salesAddPartner };