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

//fonction permettant de créer un token
const createToken = (id: number, role: string) => {
    if (typeof process.env.TOKEN_SECRET === "string") {
        //on retourne un token suivant l'id de l'utilisateur et son email, qui expires dans 1h
        return jwt.sign({ id, role }, process.env.TOKEN_SECRET, { expiresIn: "1 hours" })
    }
};

//fonction permettant de connecter un utilisateur
const signIn = (req: Express.Request, res: Express.Response) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then((user: User) => {
            const auth: boolean = bcrypt.compareSync(req.body.password, user.password);
            if (auth) {
                return user;
            } else {
                res.status(401).json("Mot de passe incorrect"); 
            }
        })
        .then((user: User) => {
            roleModel.findOne({ where: { id: user.idRole } })
            .then((role: Role) => {
                const token = createToken(user.id, role.name);
                if (token) {
                    res.status(200).send({ user, token });
                } else {
                    res.status(500).json("Erreur à la création du token."); 
                }
            }) 
            .catch(() => {
                res.status(500).send("Erreur, rôle de l'utilisateur pas trouvé.");
            })
        })
        .catch(() => {
            res.status(401).send("identifiants inconnu");
        });
};

//fonction permettant de créer un utilisateur
const signUp = async (req: Express.Request, res: Express.Response) => {
    //on initie la transaction
    userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        idRole: req.body.idRole
    }).
    then((user:User) => {
        res.status(201).send(user);
        transporter.sendMail({
            to: user.email,
            from: "contact@marya.app",
            subject: "Inscription réussie !",
            html: "<h1>Vous vous êtes bien inscrit sur Marya.app, félicitations !<h1>"
        });
    })
    .catch((err:Error) => {
        res.status(422).send(err);
    })
};

// Quand on renseigne son email dans le formulaire pour que l'email s'envoie pour réinitialiser le mot de passe
const postResetPassword = (req: Express.Request, res: Express.Response) => {
  // librarie crypto: génerer des valeures uniques et sécurisées
  // 32 bytes aléatoires: recoit une erreur ou des bytes
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur génération de votre token.");
    }

    // ce buffer va générer des valeurs hexadécimales, on doit les convertir en caractères ASCII avec toString()
    // stocker ce token dans le user qu'on veut réinitialiser
    const token = buffer.toString('hex');
    let today: Date = new Date();
    // on veut que le token soit valable 1h, on fait +3 car l'heure retourné est 2h en moins de l'heure de Paris
    today.setHours(today.getHours() + 3); 
    userModel.findOne({ where: {email: req.body.email} })
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
            <p>Cliquez ici: <a href="http://localhost:8080/reset/${token}">lien</a>, pour définir un nouveau mot de passe.</p>
          `
        });
      })
      .catch((err: Error) => {
          res.status(401).send(err);
      });
  });
};


  // Quand on clique sur le lien dans l'email pour aller sur la page pour réinitialiser le mot de passe
  // on vérifie si le token passé en paramètre et l'expiration du token est bon
  const getNewPassword = (req: Express.Request, res: Express.Response) => {
    const token = req.params.token;
    // si le token "resetToken" correspond au token passé en paramètres et que "resetTokenExpiration",
    // la date d'expiration du token, n'a pas été atteinte (gt Date.now = plus grand que la date maintenant)
    // alors on peut changer le mot de passe
    userModel.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
      .then((user: User) => {
        res.status(200).send({ user, token });
      })
      .catch((err: Error) => {
        res.status(401).send(err);
    });
  };



  const postNewPassword = (req: Express.Request, res: Express.Response) => {
    const newPassword = req.body.password;
    const userId = req.body.id;
    const passwordToken = req.body.token;
    userModel.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      id: userId
    })
      .then((user: User) => {
        userModel.update({
          password: newPassword,
          resetToken: undefined,
          resetTokenExpiration: undefined
        }, {
          where: {
            id: userId,
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
export { signIn, signUp, postResetPassword, getNewPassword, postNewPassword };