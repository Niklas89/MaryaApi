import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import Express, { NextFunction } from "express";

type Token = {
    id: number,
    role: string
}

type IntersectionType = JwtPayload | string;

//fonction permettant de vérifier si un utilisateur à un token
const isAuth = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    //on récupère le token via la requete
    const token = req.header("Authorization")?.replace("Bearer ", "");

    //si l'utilisateur n'a pas de token
    if (!token) {
        return res.status(401).send("Accès refusé");
    }

    // si il a un token, on fait un try & catch
    if (typeof process.env.TOKEN_SECRET === "string") {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(500).send("Token invalide")
            }
            req.user = decoded;
            next();
        });
    }
}

export default isAuth;