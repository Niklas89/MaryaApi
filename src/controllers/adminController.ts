import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";
import bookingModel from "../models/bookingModel";
import serviceModel from "../models/serviceModel";
import categoryModel from "../models/categoryModel";
import typeModel from "../models/typeModel";
import User from "../types/userType";
import Client from "../types/clientType";
import Partner from "../types/partnerType";
import Booking from "../types/bookingType";
import Category from "../types/categoryType";
import Service from "../types/serviceType";
import Express from "express";
import dbConnection from "../config/dbConfig";
import Transaction from "sequelize/types/transaction";
import { number } from "yup";
import { INTEGER, Sequelize } from "sequelize/types";

// Vérifier si l'utilisateur connecté est bien un admin
const isNotAdmin = (req: Express.Request, res: Express.Response) => {
  if (req.user.role !== 3) {
    // 3: admin
    return true;
  }
};

/* Fonctions pour:
    1. CLIENTS
    2. PARTNERS
    3. BOOKINGS
    4. USERS
    5. ADMIN
    6. SERVICES
    7. TYPES
  */

/* ******************************************************************** */
/* ****************************** CLIENTS ******************************* */
/* ******************************************************************** */

// Récupérer les clients que le commercial a recruté
const getRecrutedClients = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findAll({
        include: [
          {
            model: clientModel,
            where: {
              idUser_salesHasClient: req.user.id,
            },
          },
        ],
      })
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

// Récupérer les clients
const getClients = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findAll({
        attributes: { exclude: ["updatedAt", "deactivatedDate", "idRole"] },
        include: [
          {
            model: clientModel,
            required: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      })
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer le client par son identifiant
const getClient = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findByPk(req.params.id, {
        include: [
          {
            model: clientModel,
            where: {
              idUser: req.params.id,
            },
          },
        ],
      })
      .then((client: Client) => {
        res.status(200).json(client);
      })
      .catch((err: Error) => {
        res.status(500).send(err);
      });
  }
};

// Créer un client par le commercial
const addClient = async (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
      const user = await userModel.create(
        {
          firstName: req.body.FirstName,
          lastName: req.body.LastName,
          password: req.body.Password,
          email: req.body.Email,
          isActive: 1,
          idRole: 1,
        },
        { transaction: transaction }
      );

      if (user.idRole === 1) {
        await clientModel.create(
          {
            idUser: user.id,
            idUser_salesHasClient: req.user.id,
            phone: req.body.Client.Phone,
            address: req.body.Client.Address,
            postalCode: req.body.Client.PostalCode,
            city: req.body.Client.City,
          },
          { transaction: transaction }
        );
      }

      //on commit nos changements
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(201).json(user);
    } catch (err) {
      res.status(409).send(err.errors[0].message);
      await transaction.rollback();
    }
  }
};

//fonction permettant de modifier un client par le commercial lui-même
const editClient = async (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    const phone = req.body.Client.Phone;
    const address = req.body.Client.Address;
    const postalCode = req.body.Client.PostalCode;
    const city = req.body.Client.City;
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
      //on modifie notre utilisateur
      const user = await userModel.update(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        {
          where: {
            id: req.params.id,
          },
        },
        { transaction: transaction }
      );

      //on modifie notre client
      const client = await clientModel.update(
        {
          phone: phone,
          address: address,
          postalCode: postalCode,
          city: city,
        },
        {
          where: {
            idUser: req.params.id,
          },
        },
        { transaction: transaction }
      );

      //on commit nos changements
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(200).json({ user, client });
    } catch (err) {
      res.status(400).send(err);
      await transaction.rollback();
    }
  }
};

/* ******************************************************************** */
/* ****************************** PARTNERS ******************************* */
/* ******************************************************************** */

// Récupérer les partenaires que le commercial a recruté
const getRecrutedPartners = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findAll({
        include: [
          {
            model: partnerModel,
            where: {
              idUser_salesHasPartner: req.user.id,
            },
          },
        ],
      })
      .then((partners: Partner) => {
        res.status(200).json(partners);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

// Récupérer les partenaires
const getPartners = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findAll({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "isActive",
          "deactivatedDate",
          "createdAt",
        ],
        include: [
          {
            model: partnerModel,
            required: true,
            attributes: [
              "id",
              "phone",
              "birthdate",
              "address",
              "postalCode",
              "city",
              "SIRET",
              "IBAN",
              "idCategory",
            ],
            /*include: [{
                  model: categoryModel,
                  attributes: ["id", "name"],
              }] */
          },
        ],
      })
      .then((partners: Partner) => {
        res.status(200).json(partners);
      })
      .catch((err: any) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer un partenaire
const getPartnerProfile = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findByPk(req.params.id, {
        include: [
          {
            model: partnerModel,
            where: {
              idUser: req.params.id,
            },
            attributes: [
              "phone",
              "birthdate",
              "address",
              "postalCode",
              "city",
              "SIRET",
              "IBAN",
              "idCategory",
            ],
          },
        ],
        attributes: ["id", "firstName", "lastName", "email", "idRole"],
      })
      .then((partner: Partner) => {
        res.status(200).json(partner);
      })
      .catch((err: any) => {
        res.status(409).send(err);
      });
  }
};

// Créer un partenaire par le commercial
const addPartner = async (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
      //on crée notre utilisateur
      console.log(req.body.Partner.IBAN);

      const user = await userModel.create(
        {
          firstName: req.body.FirstName,
          lastName: req.body.LastName,
          password: req.body.Password,
          email: req.body.Email,
          isActive: 1,
          idRole: 2,
        },
        { transaction: transaction }
      );

      //on crée un client
      if (user.idRole === 2) {
        await partnerModel.create(
          {
            idUser: user.id,
            phone: req.body.Partner.Phone,
            birthdate: req.body.Partner.Birthdate,
            address: req.body.Partner.Address,
            postalCode: req.body.Partner.PostalCode,
            city: req.body.Partner.City,
            SIRET: req.body.Partner.SIRET,
            IBAN: req.body.Partner.IBAN,
            idUser_salesHasPartner: req.user.id,
            idCategory: req.body.Partner.IdCategory,
          },
          { transaction: transaction }
        );
      }

      //on commit nos changements
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(201).json(user);
    } catch (err) {
      res.status(409).send(err.errors[0].message);
      await transaction.rollback();
    }
  }
};

// modifier un partenaire par l'admin
const editPartner = async (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    const isActive = req.body.IsActive;
    const deactivatedDate = req.body.DeactivatedDate;
    const phone = req.body.Partner.Phone;
    const birthdate = req.body.Partner.Birthdate;
    const address = req.body.Partner.Address;
    const postalCode = req.body.Partner.PostalCode;
    const city = req.body.Partner.City;
    const img = req.body.Partner.Img;
    const SIRET = req.body.Partner.SIRET;
    const IBAN = req.body.Partner.IBAN;
    const idCategory = req.body.Partner.IdCategory;
    const transaction: Transaction = await dbConnection.transaction();
    try {
      //on crée notre utilisateur
      const user = await userModel.update(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isActive: isActive,
          deactivatedDate: deactivatedDate,
        },
        {
          where: {
            id: req.params.id,
          },
        },
        { transaction: transaction }
      );

      const partner = await partnerModel.update(
        {
          phone: phone,
          birthdate: birthdate,
          address: address,
          postalCode: postalCode,
          city: city,
          img: img,
          SIRET: SIRET,
          IBAN: IBAN,
          idCategory: idCategory,
        },
        {
          where: {
            idUser: req.params.id,
          },
        },
        { transaction: transaction }
      );

      //on commit nos changements
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(200).json({ user, partner });
    } catch (err) {
      res.status(400).send(err);
      await transaction.rollback();
    }
  }
};

/* ******************************************************************** */
/* ****************************** BOOKINGS **************************** */
/* ******************************************************************** */

// Modifier un booking via son id par un commercial / admin
// Modifier un booking via son id par un commercial / admin
const editBooking = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    bookingModel
      .update(
        {
          appointementDate: req.body.appointementDate,
          nbHours: req.body.nbHours,
          description: req.body.description,
          idService: req.body.idService,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((booking: Booking) => {
        res.status(201).json({ booking: booking.id });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

// Annuler une prestation
const cancelBooking = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    bookingModel
      .update(
        {
          cancelDate: req.body.CancelDate,
          isCancelled: 1,
        },
        {
          where: {
            id: req.params.id,
            accepted: false,
          },
        }
      )
      .then((booking: Booking) => {
        res.status(201).json({ booking: booking.id });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer par l'id un booking
const getBooking = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    bookingModel
      .findByPk(req.params.id)
      .then((booking: Booking) => {
        res.status(200).json(booking);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer par l'id un service
const getBookingsByService = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    bookingModel
      .findAll({ where: { idService: req.params.id } })
      .then((booking: Booking) => {
        res.status(200).json(booking);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer toutes les réservations
const getBookings = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  // isNotAdmin(req,res);
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    bookingModel
      .findAll()
      .then((bookings: Booking) => {
        res.status(200).json(bookings);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

/* ******************************************************************** */
/* ****************************** USERS ******************************* */
/* ******************************************************************** */

// supprimer un utilisateur / le mettre en "inactif" dans la bdd
const inactivateUser = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .update(
        {
          isActive: 0,
        },
        {
          where: {
            id: req.params.id,
          },
          individualHooks: true,
        }
      )
      .then((user: User) => {
        res.status(201).json(user);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

/* ******************************************************************** */
/* ****************************** ADMIN ******************************* */
/* ******************************************************************** */

// Récupérer les identifiants de l'admin pour que ses détails puissent
// s'afficher sur sa page profil
const getAdminProfile = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    userModel
      .findByPk(req.user.id)
      .then((user: User) => {
        res.status(200).json(user);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

// Modifier les identifiants de l'admin sur sa page profil
const editAdminProfile = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    const { password, email } = req.body;
    userModel
      .update(
        {
          password: password,
          email: email,
        },
        {
          where: {
            id: req.user.id,
          },
          individualHooks: true,
        }
      )
      .then((user: User) => {
        res.status(201).json(user);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

/* ******************************************************************** */
/* **************************** SERVICES ****************************** */
/* ******************************************************************** */

//Récupérer toutes les catégories
const getCategories = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    categoryModel
      .findAll()
      .then((categories: Category) => {
        res.status(200).json(categories);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer une catégorie pour l'afficher avant de la modifier
const getCategory = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    categoryModel
      .findByPk(req.params.id)
      .then((category: Category) => {
        res.status(200).json(category);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Enregistrer une nouvelle catégorie
const addCategory = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    categoryModel
      .create({ name: req.body.Name })
      .then((category: Category) => {
        res.status(201).json({ category });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Modifier une catégorie via sont id
const editCategory = async (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    categoryModel
      .update(
        {
          name: req.body.name,
        },
        {
          where: {
            idCategory: req.params.id,
          },
        }
      )
      .then((category: Category) => {
        res.status(201).json({ category });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Supprimer une catégorie
const deleteCategory = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    categoryModel
      .destroy(
        {
          where: {
            id: req.params.id,
          }
        }
      )
      .then((category: Category) => {
        res.status(201).json({ category });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

// Récupérer tous les services par catégorie - l'id de la catégorie est passé en paramètre
const getServicesByCategory = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .findAll({ where: { idCategory: req.params.id } })
      .then((services: Service) => {
        res.status(200).json(services);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer le service par son id
const getService = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .findByPk(req.params.id)
      .then((service: Service) => {
        res.status(200).json(service);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Enregsitré un nouveau service, avec son type et son tarif
const addService = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .create({
        name: req.body.Name,
        idCategory: req.body.IdCategory,
        idType: req.body.IdType,
        price: req.body.Price,
        priceId: req.body.PriceId,
      })
      .then((service: Service) => {
        res.status(201).json({ service });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Supprimer un service
const deleteService = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((service: Service) => {
        res.status(201).json({ service });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Modifier un service, avec son type et son tarif
const editService = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .update(
        {
          name: req.body.Name,
          idType: req.body.IdType,
          price: req.body.Price,
          priceId: req.body.PriceId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((service: Service) => {
        res.status(201).json({ service });
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

//Récupérer tous les services
const getServices = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    serviceModel
      .findAll()
      .then((services: Service) => {
        res.status(200).json(services);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};


/* ******************************************************************** */
/* **************************** TYPES ****************************** */
/* ******************************************************************** */

//Récupérer tous les types
const getTypes = (req: Express.Request, res: Express.Response) => {
  if (isNotAdmin(req, res)) res.status(403).send("Accès refusé.");
  else {
    typeModel
      .findAll()
      .then((categories: Category) => {
        res.status(200).json(categories);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  }
};

export {
  getAdminProfile,
  editAdminProfile,
  addClient,
  editClient,
  getRecrutedClients,
  getClients,
  getClient,
  getPartners,
  getPartnerProfile,
  addPartner,
  editPartner,
  getRecrutedPartners,
  editBooking,
  cancelBooking,
  getBooking,
  getBookingsByService,
  getBookings,
  inactivateUser,
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  getServicesByCategory,
  getService,
  addService,
  getServices,
  deleteService,
  editService,
  getTypes,
};
