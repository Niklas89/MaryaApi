import userModel from "./userModel";
import roleModel from "./roleModel";
import clientModel from "./clientModel";
import partnerModel from "./partnerModel";
import bookingModel from "./bookingModel";
import serviceCategoryModel from "./serviceCategoryModel";
import serviceModel from "./serviceModel";
import serviceTypeModel from "./serviceTypeModel";


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

}