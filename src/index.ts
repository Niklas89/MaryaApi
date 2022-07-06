import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute";
import serviceRoute from "./routes/serviceRoute";
import bookingRoute from "./routes/bookingRoute";
import partnerRoute from "./routes/partnerRoute";
import clientRoute from "./routes/clientRoute";
import adminRoute from "./routes/adminRoute";
import dbConnection from "./config/dbConfig";
import associateModels from "./models";

import userModel from "./models/userModel";
import roleModel from "./models/roleModel";

import User from "./types/userType";
import Role from "./types/roleType";
import { Sequelize } from "sequelize-typescript";
import checkUser from "./middleware/authMiddleware";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//jwt
//app.get('*', checkUser);

//routes
app.use("/api/service", serviceRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/partner", partnerRoute);
app.use("/api/client", clientRoute);
app.use("/api/admin", adminRoute);

//association
associateModels();

/*
dbConnection
  .sync({alter: true})
  .then((result: any) => {
  })
  .catch((err: Error) => {
    console.log(err);
  });
*/

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});

/*
dbConnection
  //.sync({force: true}) // forcer les tables dans la BDD à être remplacées (DROP et CREATE), à ne pas utiliser après le déploiement, uniquement en développement
  .sync({ force: true })
  // Après création des tables on veut qu'un user soit créé, s'il y n'en a pas déjà.
  .then((result: any) => {
    return roleModel.findByPk(1); // Retourner user avec Id 1 de la BDD.
  })
  // Ajout d'une autre promesse créé un nouveau user s'il n'y en a pas.
  .then((role: Role) => {
    if (!role) { // Vérifier si on a déjà un user, sinon il sera créé.
      return roleModel.create({ name: "client" });
    }
    return role;
  })
  .then((role: Role) => {
    return userModel.findOne({ where: { idRole: role.id } }); // Retourner user avec Id 1 de la BDD.
  })
  // Ajout d'une autre promesse créé un nouveau user s'il n'y en a pas.
  .then((user: User) => {
    if (!user) { // Vérifier si on a déjà un user, sinon il sera créé.
      return userModel.create({
        firstName: "Nicolas", lastName: "Dupont", password: "Supermdp1/", email: "nicolasdupont@email.com",
        isActive: 1, idRole: 1
      });
    }
    return user;
  })
  .then((user: User) => {
    console.log(user);
  })
  .catch((err: Error) => {
    console.log(err);
  });
 
*/
