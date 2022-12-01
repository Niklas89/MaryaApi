import crypto from 'crypto';
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";
import User from "../types/userType";
import Role from "../types/roleType";
import bcrypt from "bcryptjs";
import roleModel from "../models/roleModel";
import nodemailer from "nodemailer";
import { IsEmail } from "sequelize-typescript";
import { Error } from 'sequelize/types';
import { Op } from "sequelize";
import clientModel from '../models/clientModel';
import Client from '../types/clientType';
import partnerModel from '../models/partnerModel';
import Partner from '../types/partnerType';

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

//fonction permettant de créer un access token
const createAccessToken = (id: number, role: number) => {
  if (typeof process.env.ACCESS_TOKEN_SECRET === "string") {
    //on retourne un token suivant l'id de l'utilisateur et son email, qui expires dans 1h: expiresIn: "1 hours"
    return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1 hours" }) // pour définir 20 sec: expiresIn: "20s" 
  }
};

//fonction permettant de créer un refresh token
const createRefreshToken = (id: number, role: number) => {
  if (typeof process.env.REFRESH_TOKEN_SECRET === "string") {
    return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" }) // expiresIn: "1d" (1 jour)
  }
};

//fonction permettant de connecter un utilisateur
const signIn = (req: Express.Request, res: Express.Response) => {
  userModel.findOne({ where: { email: req.body.email } })
    .then((user: User) => {
      const auth: boolean = bcrypt.compareSync(req.body.password, user.password);
      if (auth) {
        roleModel.findOne({ where: { id: user.idRole } })
          .then((role: Role) => {
            const idRole = role.id; // l'id du role va être utilisé côté client dès sa connexion
            const accessToken = createAccessToken(user.id, idRole);
            const refreshToken = createRefreshToken(user.id, idRole);
            // Enregistrer le refreshToken avec l'utilisateur actuel
            userModel.update({ refreshToken: refreshToken }, { where: { id: user.id } })
            if (accessToken && refreshToken) {
              // le refresh token va être stocké en cookie
              // httpOnly: true signifie que le cookie ne peut pas être accédé par javascript
              // En prod: httpOnly: true, sameSite: "none", secure: true (marche que pour https)
              res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // maxAge: 1day
              // envoyer l'access token, il va être stocké en mémoire, 
              // ce n'est pas sécurisé en localStorage/Session ou cookie
              res.status(200).send({ user, idRole, accessToken });
            } else {
              return res.status(500).json("Erreur à la création du token.");
            }
          })
          .catch((err: Error) => {
            return res.status(401).send("Erreur, rôle de l'utilisateur pas trouvé.");
          })
        //return user;
      } else {
        return res.status(401).json("Mot de passe incorrect");
      }
    })
    .catch((err: Error) => {
      return res.status(401).send("Email inconnu");
    });
};

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
  }, { individualHooks: true })
    .then((user: User) => {
      clientModel.create({
        idUser: user.id,
        phone: phone,
        address: address,
        postalCode: postalCode,
        city: city
      })
        .then((client: Client) => {
          res.status(201).json({ user, client });
          transporter.sendMail({
            to: user.email,
            from: "contact@marya.app",
            subject: "Inscription réussie !",
            html: "<h1>Vous vous êtes bien inscrit sur Marya.app, félicitations !<h1>"
          });
        })
        .catch((e: any) => {
          console.error(e);
          res.status(422).send("Erreur de la création du partenaire.");
        });
    })
    .catch((e: any) => {
      console.error(e);
      res.status(422).send("Erreur de la création de l'utilisateur.");
    });
};

//fonction permettant à un client de s'inscrire
const signUpPartner = (req: Express.Request | any, res: Express.Response) => {
  const { firstName, lastName, email, password, phone, address, postalCode, city, idCategory } = req.body;
  userModel.create({
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    isActive: 1,
    idRole: 2
  }, { individualHooks: true })
    .then((user: User) => {
      partnerModel.create({
        idUser: user.id,
        phone: phone,
        address: address,
        postalCode: postalCode,
        city: city,
        idCategory: idCategory
      })
        .then((partner: Partner) => {
          res.status(201).json({ user, partner });
          transporter.sendMail({
            to: user.email,
            from: "contact@marya.app",
            subject: "Inscription réussie !",
            html: "<h1>Vous vous êtes bien inscrit sur Marya.app, félicitations !<h1>"
          });
        })
        .catch((e: any) => {
          console.error(e);
          res.status(422).send("Erreur de la création du client.");
        });
    })
    .catch((e: any) => {
      console.error(e);
      res.status(422).send("Erreur de la création de l'utilisateur.");
    });
};


// Etape 1: mot de passe oublié
// Quand on renseigne son email dans le formulaire pour que l'email s'envoie pour réinitialiser le mot de passe
const postResetPassword = (req: Express.Request, res: Express.Response) => {
  // librarie crypto: génerer des valeures uniques et sécurisées
  // 32 bytes aléatoires: recoit une erreur ou des bytes
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur génération de votre token.");
    }
    // ce buffer va générer des valeurs hexadécimales, on doit les convertir en caractères avec toString()
    // stocker ce token dans le user qu'on veut réinitialiser
    const token = buffer.toString('hex');
    let today: Date = new Date();
    // on veut que le token soit valable 1h, on fait +3 car l'heure retourné est 2h en moins de l'heure de Paris
    today.setHours(today.getHours() + 3);
    userModel.findOne({ where: { email: req.body.email } })
      .then((user: User) => {
        if (!user) {
          res.status(401).send("L'adresse email que vous avez renseigné n'a pas été trouvée.");
        }
        return userModel.update({
          resetToken: token,
          resetTokenExpiration: today
        }, {
          where: {
            email: user.email
          }, individualHooks: true
        });
      })
      .then((user: User) => {
        res.status(200).send(user);
        transporter.sendMail({
          to: req.body.email,
          from: "contact@marya.app",
          subject: "Réinitialisation du mot de passe",
          html: `
              <p>Vous avez demandé une réinitialisation du mot de passe</p>
              <p>Cliquez ici: <a href="http://localhost:3000/resetpassword/new/${token}">lien</a>, pour définir un nouveau mot de passe.</p>
              <p>Votre token de réinitialisation est valable qu'une heure.</p>
            `
        });
      })
      .catch((err: Error) => {
        res.status(401).send(err);
      });
  });
};


// Etape 2: mot de passe oublié
// Quand on clique sur le lien dans l'email pour aller sur la page pour réinitialiser le mot de passe
// on vérifie si le token passé en paramètre et l'expiration du token est bon
const getNewPassword = (req: Express.Request, res: Express.Response) => {
  const token = req.params.token;
  // si le token "resetToken" correspond au token passé en paramètres et que "resetTokenExpiration",
  // la date d'expiration du token, n'a pas été atteinte (Op.gt = plus grand que la date maintenant)
  // alors on peut changer le mot de passe
  let today: Date = new Date();
  today.setHours(today.getHours() + 2); // heure actuelle Paris 
  userModel.findOne({ where: { resetToken: token, resetTokenExpiration: { [Op.gt]: today } } })
    .then((user: User) => {
      if (user === null) {
        res.status(401).send("Accès refusé.");
      } else {
        res.status(200).send({ user, token });
      }
    })
    .catch((err: Error) => {
      res.status(401).send(err);
    });
};


// Etape 3: mot de passe oublié - on recupère les données du formulaires pour finaliser le changement de mdp
const postNewPassword = (req: Express.Request, res: Express.Response) => {
  const newPassword = req.body.password;
  const userId = req.body.id;
  const passwordToken = req.body.resetToken;
  let today: Date = new Date();
  today.setHours(today.getHours() + 2); // heure actuelle Paris 
  userModel.findOne({
    where: {
      resetToken: passwordToken,
      resetTokenExpiration: { [Op.gt]: today },
      id: userId
    }
  })
    .then((user: User) => {
      userModel.update({
        password: newPassword,
        resetToken: null,
        resetTokenExpiration: null
      }, {
        where: {
          id: user.id,
        }, individualHooks: true,
      })
        .then((user: User) => {
          res.status(200).json(user);
        })
        .catch((err: Error) => {
          res.status(409).send(err);
        });
    })
    .catch((err: Error) => {
      res.status(401).send(err);
    });
};


//on exporte les fonctions inscriptions/connexions
export { signIn, signUpClient, signUpPartner, postResetPassword, getNewPassword, postNewPassword };