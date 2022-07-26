import jwt from "jsonwebtoken";
import Express, { NextFunction } from "express";

//fonction permettant de vérifier si un utilisateur à un token
const isAuth = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    //on récupère le token via la requete
    const token = req.header("Authorization")?.replace("Bearer ", "");

    //si l'utilisateur n'a pas de token
    if (!token) {
        return res.status(401).send("Accès refusé");
    }

    // si il a un token, on fait un try & catch
    if (typeof process.env.ACCESS_TOKEN_SECRET === "string") {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send("Token invalide")
            }
            req.user = decoded;
            next();
        });
    }
}

export default isAuth;