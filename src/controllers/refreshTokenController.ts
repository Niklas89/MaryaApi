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
        return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1 hours" }) // pour définir 20 sec: expiresIn: "20s" 
    }
};

//fonction permettant de créer un refresh token
const createRefreshToken = (id: number, role: string) => {
    if (typeof process.env.REFRESH_TOKEN_SECRET === "string") {
        return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" }) // expiresIn: "1d" (1 jour)
    }
  };

//fonction permettant d'utiliser le refresh token'
const handleRefreshToken = (req: Express.Request, res: Express.Response) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401); // si cookie n'existe pas: 401
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    console.log(refreshToken);

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
                            const idRole = role.id;
                            const accessToken = createAccessToken(user.id, role.name);
                            const refreshToken = createRefreshToken(user.id, role.name);
                            userModel.update({ refreshToken: refreshToken}, {where: {id: user.id}})
                            res.cookie("jwt", refreshToken, {httpOnly: true, sameSite: "none", secure: true, maxAge: 24*60*60*1000});  // maxAge: 1day
                            res.status(200).send({ idRole, accessToken });
                        }
                    );
                }
            }) 
            .catch(() => {
                res.status(403).send("Rôle de l'utilisateur pas trouvé.");
            })
        })
        .catch(() => { // If not found user
            res.status(403).send("Accès interdit");
        });
};


export { handleRefreshToken };