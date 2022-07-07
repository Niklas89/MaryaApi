import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import User from "../types/userType";
import Client from "../types/clientType";
import Partner from "../types/partnerType";
import partnerModel from "../models/partnerModel";
import Express from "express";


  //Récupérer le user par l'id sur l'appli bureautique pour la page profil
  const getAdminById = (req: Express.Request, res: Express.Response) => {
    userModel.findByPk(req.params.id)
        .then((user: User) => {
            res.status(200).json(user);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
  };
  

  // modifier un admin sur l'appli bureautique
const editAdmin = (req: Express.Request, res: Express.Response) => {
    const { password, email } = req.body;
    userModel.update({
      password: password,
      email: email
    }, {
      where: {
        id: req.params.id
      }, individualHooks: true,
    })
      .then((user: User) => {
        res.status(201).json(user);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };


  // Récupérer les clients que le commercial a recruté
const getRecrutedClients = (req: Express.Request, res: Express.Response) => {
    userModel.findAll({ 
      include: [
        { 
            model: clientModel,
            where: {
              idUser_salesHasClient:  req.params.id
            } 
        }
      ]
    })
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };


  // Récupérer les partenaires que le commercial a recruté
const getRecrutedPartners = (req: Express.Request, res: Express.Response) => {
    userModel.findAll({ 
      include: [
        { 
            model: partnerModel,
            where: {
              idUser_salesHasPartner:  req.params.id
            } 
        }
      ]
    })
      .then((partners: Partner) => {
        res.status(200).json(partners);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };


    //Récupérer le client par son avec vérification admin
  const getClientById = (req: Express.Request | any, res: Express.Response) => {
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
        if (req.userRole !== "admin") {
          res.status(403).send("Accès refusé.");
        } 
        res.status(200).json(client);
      })
      .catch((err: Error) => {
        res.status(500).send(err);
      });
  };
  
  
    export { getAdminById, editAdmin, getRecrutedClients, getRecrutedPartners, getClientById };