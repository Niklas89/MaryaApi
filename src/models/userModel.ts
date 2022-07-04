import dbConnection from "../config/dbConfig";
import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import User from "../types/userType";
import roleModel from "../models/roleModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";

const userModel = dbConnection.define("user", {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le champ est vide."
      },
      is: {
        args: /[a-zA-ZÀ-ÖØ-öø-ÿ\ \-\'\$]*$/,
        msg: "Le champ contient des caractères non autorisés."
      }
    }
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le champ est vide."
      },
      is: {
        args: /[a-zA-ZÀ-ÖØ-öø-ÿ\ \-\'\$]*$/,
        msg: "Le champ contient des caractères non autorisés."
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le champ est vide."
      },
      min: {
        args: 6,
        msg: "Le mot de passe doit contenir 6 caractères au minimum."
      },
      is: {
        args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/,
        msg: "Le champ contient des caractères non autorisés."
      }
    }
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: {
      args: true,
      msg: "L'adresse utilisé est déjà enregistré."
    },
    validate: {
      isEmail: {
        args: true,
        msg: "L'adresse email est incorrect."
      },
      notEmpty: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  deactivatedDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: (user: User) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
    },
    beforeUpdate: (user: User) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
    }
  }
}
);


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

export default userModel;