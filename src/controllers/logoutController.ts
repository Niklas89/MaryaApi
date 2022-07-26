import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import Express from "express";
import User from "../types/userType";
import Role from "../types/roleType";
import roleModel from "../models/roleModel";

//fonction permettant de créer un access token
const createAccessToken = (id: number, role: string) => {
    if (typeof process.env.ACCESS_TOKEN_SECRET === "string") {
        //on retourne un token suivant l'id de l'utilisateur et son email, qui expires dans 1h: expiresIn: "1 hours"
        return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" })
    }
};

//fonction permettant d'utiliser le refresh token'
const logout = (req: Express.Request, res: Express.Response) => {
    // Dans la mémoire du côté client, aussi supprimer l'accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // pas de contenu dans le cookie
    const refreshToken = cookies.jwt;

    
    userModel.findOne({ where: { refreshToken: refreshToken } })
    .then((user: User) => {
        // supprimer refreshToken de base de données
        userModel.update({ refreshToken: ""}, {where: {id: user.id}})
        // En prod: httpOnly: true, sameSite: "none", secure: true (marche que pour https)
        res.clearCookie('jwt', { httpOnly: true, sameSite: "none" });
        res.sendStatus(204);
    })
    // si le refresh token n'est pas dans la base de données
    .catch(() => { 
        // En prod: httpOnly: true, sameSite: "none", secure: true (marche que pour https)
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none" }); 
        res.sendStatus(204);
    });
};


export { logout };