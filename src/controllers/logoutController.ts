import userModel from "../models/userModel";
import Express from "express";
import User from "../types/userType";


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
        // En prod: httpOnly: true, sameSite: "none", secure: true (pour https)
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        res.sendStatus(204);
    })
    // si le refresh token n'est pas dans la base de données
    .catch(() => { 
        // En prod: httpOnly: true, sameSite: "none", secure: true (pour https)
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); 
        res.sendStatus(204);
    });
};


export { logout };