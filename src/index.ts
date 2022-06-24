import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute";
import serviceRoute from "./routes/serviceRoute";
import bookingRoute from "./routes/bookingRoute";
import dbConnection from "./config/dbConfig";

import userModel from "./models/userModel";
import roleModel from "./models/roleModel";
import clientModel from "./models/clientModel";
import partnerModel from "./models/partnerModel";

const app = express();

//middleware
app.use(express.json());

// Créer un middleware qui run pour toute requêtes entrantes et stocke user pour qu'on puisse l'utiliser
/* A CONTINUER APRES QUAND CA MARCHE AVEC LE TYPESCRIPT
app.use((req, res, next) => {
  userModel.findById(1)
    .then((user:User) => {
      (req: any) => (user: Sequelize) => user;
      next(); // continuer avec la prochaine étape si on a déjà le user et qu'il est stocké
    })
    .catch((err: any) => console.log(err));
});
*/ 

app.use("/api/service", serviceRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);

// Une relation One-To-One (1:1) existe entre userModel et roleModel, la clé étrangère étant définie dans le modèle source (userModel).
userModel.belongsTo(roleModel, { constraints: false });
// Une relation One-To-Many existe entre roleModel et userModel, la clé étrangère étant définie dans le modèle cible (userModel).
roleModel.hasMany(userModel);

// si un user est supprimé, le client sera également supprimé
clientModel.belongsTo(userModel, { constraints: true, onDelete: "CASCADE" });
partnerModel.belongsTo(userModel, { constraints: true, onDelete: "CASCADE" });

dbConnection
  .sync({force: true})
  .then((result: any) => {
    //console.log(user);
    app.listen(8080);
  })
  .catch((err: any) => {
    console.log(err);
  });


  /* A CONTINUER APRES QUAND CA MARCHE AVEC LE TYPESCRIPT
dbConnection
  //.sync({force: true}) // forcer les tables dans la BDD à être remplacées (DROP et CREATE), à ne pas utiliser après le déploiement, uniquement en développement
  .sync()
  // Après création des tables on veut qu'un user soit créé, s'il y n'en a pas déjà.
  .then((result: any) => {
    return roleModel.findByPk(1); // Retourner user avec Id 1 de la BDD.
  })
  // Ajout d'une autre promesse créé un nouveau user s'il n'y en a pas.
  .then((role: any) => {
    if (!role) { // Vérifier si on a déjà un user, sinon il sera créé.
      return  roleModel.create({name: "client"});
    }
    return role;
  })
  .then((role: any) => {
    return userModel.findOne({where: {idRole: role.idRole}}); // Retourner user avec Id 1 de la BDD.
  })
  // Ajout d'une autre promesse créé un nouveau user s'il n'y en a pas.
  .then((user: any) => {
    if (!user) { // Vérifier si on a déjà un user, sinon il sera créé.
      return userModel.create({
        firstName: "Nicolas", lastName: "Dupont", password: "supermdp", email: "nicolasdupont@email.com",
        isActive: 1, signUpDate: "2022-06-22 13:56:01", deactivatedDate: "", idRole: 2
      });
    }
    return user;
  })
  .then((user: any) => {
    console.log(user);
    app.listen(8080);
  })
  .catch((err: any) => {
    console.log(err);
  });
 */