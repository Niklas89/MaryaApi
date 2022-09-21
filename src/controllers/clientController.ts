import clientModel from "../models/clientModel";
import userModel from "../models/userModel";
import Client from "../types/clientType";
import Express from "express";
import bookingModel from "../models/bookingModel";
import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";
import nodemailer from "nodemailer";
import moment from "moment";
import { Op } from "sequelize";
import User from "../types/userType";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
});

//fonction permettant à un client de s'inscrire
const signUpClient = (req: Express.Request | any, res: Express.Response) => {
  const { firstName, lastName, email, password, phone, address, postalCode, city } = req.body;
  userModel.create({
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    isActive: 1,
    idRole: 1
  }, {individualHooks: true})
    .then((user: User) => {
      clientModel.create({
        idUser: user.id,
        phone: phone,
        address: address,
        postalCode: postalCode,
        city: city
      })
        .then((client: Client, user: User) => {
          res.status(200).json({user, client});
          transporter.sendMail({
            to: user.email,
            from: "contact@marya.app",
            subject: "Inscription réussie !",
            html: "<h1>Vous vous êtes bien inscrit sur Marya.app, félicitations !<h1>"
          });
        })
        .catch(() => {
          res.status(422).send("Erreur de la création du client.");
        });
    })
    .catch(() => {
      res.status(422).send("Erreur de la création de l'utilisateur.");
    });
};

//ajouter un client
const addClient = (req: Express.Request | any, res: Express.Response) => {
  const { phone, address, postalCode, city } = req.body;

  clientModel.create({
    idUser: req.user.id,
    phone: phone,
    address: address,
    postalCode: postalCode,
    city: city
  })
    .then((client: Client) => {
      res.status(200).json(client);
    })
    .catch((err: any) => {
      res.status(422).send(err);
    });
};

//fonction permettant de modifier un client par le client lui-même
const editClient = async (req: Express.Request | any, res: Express.Response) => {
  const { firstName, lastName, email, phone, address, postalCode, city } = req.body;
  //on initie la transaction
  const transaction: Transaction = await dbConnection.transaction();
  try {
    //on modifie notre utilisateur
    const user = await userModel.update({
      firstName: firstName,
      lastName: lastName,
      email: email
    }, {
      where: {
        id: req.user.id
      }, individualHooks: false
    }, { transaction: transaction });

    //on modifie notre client
    const client = await clientModel.update({
      phone: phone,
      address: address,
      postalCode: postalCode,
      city: city
    }, {
      where: {
        idUser: req.user.id
      }, individualHooks: false
    }, { transaction: transaction });

    //on commit nos changements 
    await transaction.commit();
    //on retourner les données de notre utilisateur
    return res.status(200).json({ user, client });
  } catch (err) {
    res.status(409).send(err);
    await transaction.rollback();
  }
};


//Récupérer le client par l'id dans son token
const getClientProfile = (req: Express.Request, res: Express.Response) => {
  userModel.findByPk(req.user.id, {
    include: [
      {
        model: clientModel,
        where: {
          idUser: req.user.id
        }
      }
    ]
  })
    .then((client: Client) => {
      res.status(200).json(client);
    })
    .catch((err: Error) => {
      res.status(500).send(err);
    });
};

//Fonction qui permet de récuperé les bookings du client par (future, present, passé) et (accepté ou pas)
const getClientBooking = (req: Express.Request, res: Express.Response) => {
  //permet de récuperé l'argument dans l'url
  const dateType = req.params.dateType;
  const accepted = req.params.accepted;
  //On instancie les variable à null
  let whereClause = null;
  let acceptedClause = null;
  //Pour les dates on verifie si c'est un date supperieur à aujourd'hui, 
  if (dateType === "future") {
    whereClause = { [Op.gt]: moment().add(1, "d").format("YYYY-MM-DD") };
  }
  //Si c'est une date inférieur à aujourd'hui
  else if (dateType === "past") {
    whereClause = { [Op.lt]: moment().subtract(1, "d").format("YYYY-MM-DD") };
  }
  //Sinon si c'est une date égale à aujourd'hui
  else {
    whereClause = { [Op.between]: [moment().format("YYYY-MM-DD"), moment().add(1, "d").format("YYYY-MM-DD")] };
  }
  //Pour l'acceptation de la prestation :
  if (accepted === "true") {
    acceptedClause = true
  } else {
    acceptedClause = false
  }
  //On fait deux jointure dans la même requette
  userModel.findByPk(req.user.id, {
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: clientModel,
        attributes: ["idUser"],
        where: {
          idUser: req.user.id
        },
        include: {
          model: bookingModel,
          attributes: ["appointmentDate", "nbHours", "description", "totalPrice", "accepted", "idService"],
          where: {
            appointmentDate: whereClause,
            accepted: acceptedClause,
          }
        }
      }
    ]
  })
    .then((client: Client) => {
      res.status(201).json(client);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};


export { signUpClient, editClient, getClientProfile, getClientBooking, addClient };



