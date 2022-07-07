import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";
import User from "../types/userType";
import Role from "../types/roleType";
import bcrypt from "bcryptjs";
import roleModel from "../models/roleModel";

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
    })
    .catch((err:Error) => {
        res.status(422).send(err);
    })
};

//on exporte les fonctions inscriptions/connexions
export { signIn, signUp };