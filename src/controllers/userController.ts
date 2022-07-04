import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";
import roleModel from "../models/roleModel";
import User from "../types/userType";
import Client from "../types/clientType";
import Partner from "../types/partnerType";
import Role from "../types/roleType";
import Express from "express";

// Récupérer les utilisateurs
const getUsers = (req: Express.Request, res: Express.Response) => {
  userModel.findAll()
    .then((users: User) => {
      res.status(200).json(users);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};


// supprimer un utilisateur / le mettre en "inactif" dans la bdd
const inactivateUser = (req: Express.Request, res: Express.Response) => {
  userModel.update({
    isActive: 0
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


// modifier le mot de passe d'un utilisateur lors du mot de passe oublié
const editPassword = (req: Express.Request, res: Express.Response) => {
  userModel.update({
    password: req.body.password,
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


// modifier un utilisateur
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


// Récupérer les rôles
const getRoles = (req: Express.Request, res: Express.Response) => {
  roleModel.findAll()
    .then((roles: Role) => {
      res.status(200).json(roles);
    })
    .catch((err: any) => {
      res.status(409).send(err);
    });
};


export { getUsers, getClients, getPartners, getRoles, editUser, inactivateUser, editPassword };