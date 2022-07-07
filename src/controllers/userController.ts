import userModel from "../models/userModel";
import partnerModel from "../models/partnerModel";
import roleModel from "../models/roleModel";
import User from "../types/userType";
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


export { getUsers, getRoles, editUser, editPassword };

