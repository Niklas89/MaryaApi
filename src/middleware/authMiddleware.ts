import jwt from "jsonwebtoken";
import Express, { NextFunction } from "express";


//fonction permettant de vérifier si un utilisateur à un token
const checkUser =(req: Express.Request | any, res: Express.Response, next: NextFunction) => {
    
    //on récupère le token via la requete
    const token = req.header("Authorization")?.replace("Bearer ", "");
    let decodedToken: any;
    
    //si l'utilisateur n'a pas de token
    if (!token) {
        return res.status(401).send("Accès refusé");
    }

    // si il a un token, on fait un try & catch
    if (typeof process.env.TOKEN_SECRET === "string") {
        try {
            //on vérifie le token, si il correspond, on passe à la suite, sinon on catch l'erreur
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch(err) {
            res.status(500).send("Token invalide");
        }
        if (!decodedToken) {
            res.status(401).send("Pas authentifié.");
          }
          req.userId = decodedToken.id;
          req.userRole = decodedToken.role;
          next();
    }
}

export default checkUser;