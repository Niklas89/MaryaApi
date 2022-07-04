import jwt from "jsonwebtoken";
import Express, { NextFunction } from "express";

//fonction permettant de vérifier si un utilisateur à un token
const checkUser = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    //on récupère le token via la requete
    const token = req.body.token;

    //si l'utilisateur n'a pas de token
    if (!token) {
        return res.status(401).send("Accès refusé");
    }

    // si il a un token, on fait un try & catch
    if (typeof process.env.TOKEN_SECRET === "string") {
        try {
            //on vérifie le token, si il correspond, on passe à la suite, sinon on catch l'erreur
            jwt.verify(token, process.env.TOKEN_SECRET);
            next();
        } catch(err) {
            res.status(400).send("Token invalide");
        }
    }
}

export default checkUser;