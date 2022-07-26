import allowedOrigins from "../config/allowedOrigins";
import Express, { NextFunction } from "express";
import { BOOLEAN } from "sequelize/types";

const credentials = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    const origin: any = req.headers.origin;
    // si mon origine (le client qui fait la demande de requête) se trouve dans ma liste blanche des origines
    if (allowedOrigins.includes(origin)) {
        // alors met ce header dans la réponse, c'est nécessaire CORS qui va chercher ce header
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
}

export default credentials;