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
import bookingModel from "./models/bookingModel";
import serviceCategoryModel from "./models/serviceCategoryModel";
import serviceModel from "./models/serviceModel";
import serviceTypeModel from "./models/serviceTypeModel";

import User from "./types/userType";
import Role from "./types/roleType";
import { Sequelize } from "sequelize-typescript";
import checkUser from "./middleware/authMiddleware";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//jwt
app.get('*', checkUser);

//routes
app.use("/api/service", serviceRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);

/*  ASSOCIATIONS ROLE - USER */
// Par défaut avec Sequelize: ADD CONSTRAINT, ON DELETE CASCADE ON UPDATE CASCADE
roleModel.hasMany(userModel, {
  foreignKey: {
    name: 'idRole', allowNull: false
  }
});

/* ASSOCIATIONS USER - CLIENT / PARTNER */
// si un user est supprimé, le client sera également supprimé
// le user peut être un client ou un partenaire
userModel.hasOne(clientModel, {
  foreignKey: {
    name: 'idUser', allowNull: false
  }
});
userModel.hasOne(partnerModel, {
  foreignKey: {
    name: 'idUser', allowNull: false
  }
});

// le user (commercial) peut recruter un client ou un partenaire
// par défaut avec Sequelize, le FK est allowedNull = true
userModel.hasMany(clientModel, {
  foreignKey: {
    name: 'idUser_salesHasClient'
  }
});
userModel.hasMany(partnerModel, {
  foreignKey: {
    name: 'idUser_salesHasPartner'
  }
});


/* ASSOCIATIONS BOOKING - CLIENT / PARTNER */
clientModel.hasMany(bookingModel, {
  foreignKey: {
    name: 'idClient', allowNull: false
  }
});
partnerModel.hasMany(bookingModel, {
  foreignKey: {
    name: 'idPartner', allowNull: false
  }
});


/* ASSOCIATION serviceCategory - partner */
serviceCategoryModel.hasMany(partnerModel, {
  foreignKey: {
    name: 'idServiceCategory', allowNull: false
  }
});


/* ASSOCIATION service - serviceCategory */
serviceCategoryModel.hasMany(serviceModel, {
  foreignKey: {
    name: 'idServiceCategory', allowNull: false
  }
});


/* ASSOCIATION serviceType - service */
serviceTypeModel.hasMany(serviceModel, {
  foreignKey: {
    name: 'idServiceType', allowNull: false
  }
});

/*
dbConnection
  .sync()
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
    return userModel.findOne({ where: { idRole: role.idRole } }); // Retourner user avec Id 1 de la BDD.
  })
  // Ajout d'une autre promesse créé un nouveau user s'il n'y en a pas.
  .then((user: User) => {
    if (!user) { // Vérifier si on a déjà un user, sinon il sera créé.
      return userModel.create({
        firstName: "Nicolas", lastName: "Dupont", password: "supermdp", email: "nicolasdupont@email.com",
        isActive: 1, idRole: 1
      });
    }
    return user;
  })
  .then((user: User) => {
    console.log(user);
    app.listen(8080);
  })
  .catch((err: Error) => {
    console.log(err);
  });*/

