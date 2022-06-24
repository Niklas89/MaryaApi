import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";
import roleModel from "../models/roleModel";
import User from "../types/userType";
import Client from "../types/clientType";
import Partner from "../types/partnerType";
import Role from "../types/roleType";
import Express from "express";

const getUsers = (req: Express.Request, res: Express.Response) => {
  userModel.findAll()
    .then((users: User) => {
      res.status(200).json(users);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const getClients = (req: Express.Request, res: Express.Response) => {
  clientModel.findAll()
    .then((clients: Client) => {
      res.status(200).json(clients);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const getPartners = (req: Express.Request, res: Express.Response) => {
  partnerModel.findAll()
    .then((partners: Partner) => {
      res.status(200).json(partners);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const getRoles = (req: Express.Request, res: Express.Response) => {
  roleModel.findAll()
    .then((roles: Role) => {
      res.status(200).json(roles);
    })
    .catch((err: any) => {
      console.log(err);
    });
};


/* 
exports.postAddUser = (req: { body: { firstName: any; imageUrl: any; price: any; description: any; }; }, res: any, next: any) => {
    const firstName = req.body.firstName;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    userModel.create({
        firstName: firstName,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
      .then((result: any) => {
        // console.log(result);
        console.log("Created User");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }; */


export { getUsers, getClients, getPartners, getRoles };