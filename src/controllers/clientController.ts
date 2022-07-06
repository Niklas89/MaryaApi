import clientModel from "../models/clientModel";
import userModel from "../models/userModel";
import Client from "../types/clientType";
import Express from "express";

import bookingModel from "../models/bookingModel";

import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";

// Récupérer les clients pour les 3 applis
const getClients = (req: Express.Request, res: Express.Response) => {
    userModel.findAll({ 
      where: { isActive: 1 },
      attributes: {exclude: ["updatedAt", "deactivatedDate", "idRole"]},
      include: [
        { model: clientModel, attributes: {exclude: ["createdAt","updatedAt"]} }
      ]
    })
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };


  //fonction permettant de modifier un client par le commercial et le client lui-même
  const editClient  = async (req: Express.Request, res: Express.Response) => {
  const { firstName, lastName, email, phone, address, postalCode, city } = req.body;
  //on initie la transaction
  const transaction:Transaction = await dbConnection.transaction();
  try {
      //on modifie notre utilisateur
      const user = await userModel.update({
          firstName: firstName,
          lastName: lastName,
          email: email
      },  {
          where: {
            id:  req.params.id
          }, individualHooks: true
      }, { transaction: transaction });

      //on modifie notre client
      const client = await clientModel.update({
          phone: phone,
          address: address,
          postalCode: postalCode,
          city: city
      }, {
          where: {
            idUser:  req.params.id
          }, individualHooks: true
    }, { transaction: transaction });

      //on commit nos changements 
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(200).json({user,client});
  } catch (err) {
      res.status(400).send(err);
      await transaction.rollback();
  }
}

  //Récupérer le client par l'id
const getClientById = (req: Express.Request, res: Express.Response) => {
  userModel.findByPk(req.params.id, {
    include: [
      {
        model: clientModel,
        where: {
          idUser:  req.params.id
        }
      }
    ]
  })
      .then((client: Client) => {
          res.status(200).json(client);
      })
      .catch((err: Error) => {
          res.status(409).send(err);
      });
};


  //Récupérer les booking du client
  const getBookingByIdClient = (req: Express.Request, res: Express.Response) => {
    clientModel.findByPK(
      req.params.id,
      {
        include:[{
          model: bookingModel,
          where: {
            idClient: req.params.id
          }
        }]
      }
    )
    .then((client: Client) => {
      res.status(201).json(client);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
  }

  



  export { getClients, editClient, getBookingByIdClient, getClientById};


