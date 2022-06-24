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
      res.status(409).send(err);
    });
};


const inactivateUser = (req: Express.Request, res: Express.Response) => {
  userModel.update({
    isActive: false
  }, {
    where: {
      idUser: req.params.id
    }, individualHooks: true,
  })
    .then((user: User) => {
      res.status(201).json(user);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};


const editUser = (req: Express.Request, res: Express.Response) => {
  const { firstName, lastName, password, email } = req.body;
  userModel.update({
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email
  }, {
    where: {
      idUser: req.params.id
    }, individualHooks: true,
  })
    .then((user: User) => {
      res.status(201).json(user);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};

const getClients = (req: Express.Request, res: Express.Response) => {
  clientModel.findAll()
    .then((clients: Client) => {
      res.status(200).json(clients);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};

const getPartners = (req: Express.Request, res: Express.Response) => {
  partnerModel.findAll()
    .then((partners: Partner) => {
      res.status(200).json(partners);
    })
    .catch((err: any) => {
      res.status(409).send(err);
    });
};

const getRoles = (req: Express.Request, res: Express.Response) => {
  roleModel.findAll()
    .then((roles: Role) => {
      res.status(200).json(roles);
    })
    .catch((err: any) => {
      res.status(409).send(err);
    });
};


export { getUsers, getClients, getPartners, getRoles, editUser, inactivateUser };