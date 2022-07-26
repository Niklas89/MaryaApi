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
const handleRefreshToken = (req: Express.Request, res: Express.Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // si cookie n'existe pas: 401
    const refreshToken = cookies.jwt;

    userModel.findOne({ where: { refreshToken: refreshToken } })
        .then((user: User) => {
            const userid = user.id;
            roleModel.findOne({ where: { id: user.idRole } })
            .then((role: Role) => {
                // evaluate jwt 
                if (typeof process.env.REFRESH_TOKEN_SECRET === "string") {
                    jwt.verify(
                        refreshToken,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err: any, decoded: any) => {
                            if (err) return res.sendStatus(403);
                            const accessToken = createAccessToken(user.id, role.name);
                            res.status(200).send( accessToken );
                        }
                    );
                }
            }) 
            .catch(() => {
                res.status(403).send("Rôle de l'utilisateur pas trouvé.");
            })
        })
        .catch(() => {
            res.status(403).send("Accès interdit");
        });
};


export { handleRefreshToken };