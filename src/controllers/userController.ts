import userModel from "../models/userModel";
import roleModel from "../models/roleModel";
import User from "../types/userType";
import Role from "../types/roleType";
import Express from "express";
import bcrypt from "bcryptjs";

// Récupérer les utilisateurs
const getUsers = (req: Express.Request, res: Express.Response) => {
  userModel.findAll()
    .then((users: User) => {
      res.status(200).json(users);
    })
    .catch((err: Error) => {
      res.status(403).send(err);
    });
};


//modifier le mot de passe par l'utilisateur
const editPassword = (req: Express.Request, res: Express.Response) => {
  userModel.findByPk(req.user.id)
    .then((user: User) => {
      const auth: boolean = bcrypt.compareSync(req.body.lastPassword, user.password);
      if (auth) {
        userModel.update({
          password: req.body.newPassword,
        }, {
          where: {
            id: req.user.id
          }, individualHooks: true,
        })
          .then((user: User) => {
            res.status(201).json(user);
          })
          .catch((err: Error) => {
            res.status(409).send(err);
          });
      } else {
        res.status(401).json("Ancien mot de passe incorrect.");
      }
    })
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

// supprimer un utilisateur / le mettre en "inactif" dans la bdd
const inactivateUser = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  userModel.update({
    isActive: 0
  }, {
    where: {
      id: req.user.id
    }, individualHooks: true,
  })
    .then((user: User) => {
      res.status(201).json(user);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};



export { getUsers, getRoles, editPassword, inactivateUser };


