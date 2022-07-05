import userModel from "./userModel";
import roleModel from "./roleModel";
import clientModel from "./clientModel";
import partnerModel from "./partnerModel";
import bookingModel from "./bookingModel";
import categoryModel from "./categoryModel";
import serviceModel from "./serviceModel";
import typeModel from "./typeModel";


export default function associateModels() {

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
  
  /* ASSOCIATIONS booking - client / partner */
  clientModel.hasMany(bookingModel, {
    foreignKey: {
      name: 'idClient', allowNull: false
    }
  });
  partnerModel.hasMany(bookingModel, {
    foreignKey: {
      name: 'idPartner', allowNull: true
    }
  });


  /* ASSOCIATIONS booking - category */
  categoryModel.hasMany(bookingModel, {
    foreignKey: {
      name: 'idCategory', allowNull: false
    }
  });
  
  /* ASSOCIATION category - partner */
  categoryModel.hasMany(partnerModel, {
    foreignKey: {
      name: 'idCategory', allowNull: false
    }
  });
  
  /* ASSOCIATION service - category */
  categoryModel.hasMany(serviceModel, {
    foreignKey: {
      name: 'idCategory', allowNull: false
    }
  });
  
  /* ASSOCIATION type - service */
  typeModel.hasMany(serviceModel, {
    foreignKey: {
      name: 'idType', allowNull: false
    }
  });

}