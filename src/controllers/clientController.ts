import clientModel from "../models/clientModel";
import Client from "../types/clientType";
import Express from "express";
import bookingModel from "../models/bookingModel";


// Récupérer les clients
const getClients = (req: Express.Request, res: Express.Response) => {
    clientModel.findAll()
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };
  
  
  // modifier un client
  const editClient = (req: Express.Request, res: Express.Response) => {
    const { phone, address, postalCode, city } = req.body;
    clientModel.update({
      phone: phone,
      address: address,
      postalCode: postalCode,
      city: city
    }, {
      where: {
        id: req.params.id
      }, individualHooks: true,
    })
      .then((client: Client) => {
        res.status(201).json(client);
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

  


  export { getClients, editClient, getBookingByIdClient};