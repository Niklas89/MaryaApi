import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";
import bookingModel from "../models/bookingModel";
import User from "../types/userType";
import Client from "../types/clientType";
import Partner from "../types/partnerType";
import Booking from "../types/bookingType";
import Express from "express";
import dbConnection from "../config/dbConfig";
import { Transaction } from "sequelize/types";



  // Vérifier si l'utilisateur connecté est bien un admin
  const isNotAdmin = (req: Express.Request, res: Express.Response) => {
    if (req.user.role !== "admin") {
      res.status(403).send("Accès refusé.");
    } 
  };


  /* Fonctions pour:
    1. CLIENTS
    2. PARTNERS
    3. BOOKINGS
    4. USERS
    5. ADMIN
  */


  /* ******************************************************************** */
  /* ****************************** CLIENTS ******************************* */
  /* ******************************************************************** */

  // Récupérer les clients que le commercial a recruté 
  const getRecrutedClients = (req: Express.Request, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      userModel.findAll({ 
        include: [
          { 
              model: clientModel,
              where: {
                idUser_salesHasClient:  req.user.id
              } 
          }
        ]
      })
        .then((clients: Client) => {
          res.status(200).json(clients);
        })
        .catch((err: Error) => {
          res.status(409).send(err);
        });
    };

  // Récupérer les clients
  const getClients = (req: Express.Request, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
    userModel.findAll({
      where: { isActive: 1 },
      attributes: { exclude: ["updatedAt", "deactivatedDate", "idRole"] },
      include: [
        { model: clientModel, attributes: { exclude: ["createdAt", "updatedAt"] } }
      ]
    })
      .then((clients: Client) => {
        res.status(200).json(clients);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };


  //Récupérer le client par son identifiant
  const getClient = (req: Express.Request, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
    userModel.findByPk(req.params.id, {
      include: [
        {
          model: clientModel,
          where: {
            idUser:  req.params.id
          }
        }
      ]
    })
      .then((client: Client) => {
        res.status(200).json(client);
      })
      .catch((err: Error) => {
        res.status(500).send(err);
      });
  };


  // Créer un client par le commercial
  const addClient = async (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      //on initie la transaction
      const transaction: Transaction = await dbConnection.transaction();
      try {
          //on crée notre utilisateur
          const user = await userModel.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              idRole: req.body.idRole
          }, { transaction: transaction });
  
          //on crée un client 
          if (user.idRole === 1) {
              await clientModel.create({
                  idUser: user.id,
                  idUser_salesHasClient: req.user.id,
                  phone: req.body.phone,
                  address: req.body.address,
                  postalCode: req.body.postalCode,
                  city: req.body.city
              }, { transaction: transaction })
          }
  
          //on commit nos changements 
          await transaction.commit();
          //on retourner les données de notre utilisateur
          return res.status(201).json(user);
      } catch (err) {
          await transaction.rollback();
      }
  };

  //fonction permettant de modifier un client par le commercial lui-même
  const editClient = async (req: Express.Request | any, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
    const { firstName, lastName, email, phone, address, postalCode, city } = req.body;
    //on initie la transaction
    const transaction: Transaction = await dbConnection.transaction();
    try {
      //on modifie notre utilisateur
      const user = await userModel.update({
        firstName: firstName,
        lastName: lastName,
        email: email
      }, {
        where: {
          id: req.params.id
        }, individualHooks: true
      }, { transaction: transaction });

      //on modifie notre client
      const client = await clientModel.update({
        phone: phone,
        address: address,
        postalCode: postalCode,
        city: city
      }, {
        where: {
          idUser: req.params.id
        }, individualHooks: true
      }, { transaction: transaction });

      //on commit nos changements 
      await transaction.commit();
      //on retourner les données de notre utilisateur
      return res.status(200).json({ user, client });
    } catch (err) {
      res.status(400).send(err);
      await transaction.rollback();
    }
  };



  /* ******************************************************************** */
  /* ****************************** PARTNERS ******************************* */
  /* ******************************************************************** */

  // Récupérer les partenaires que le commercial a recruté
  const getRecrutedPartners = (req: Express.Request, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
      userModel.findAll({ 
        include: [
          { 
              model: partnerModel,
              where: {
                idUser_salesHasPartner:  req.user.id
              } 
          }
        ]
      })
        .then((partners: Partner) => {
          res.status(200).json(partners);
        })
        .catch((err: Error) => {
          res.status(409).send(err);
        });
    };

      // Récupérer les partenaires
      const getPartners = (req: Express.Request, res: Express.Response) => {
        // Vérifier si l'utilisateur connecté est bien un admin
        isNotAdmin(req,res);
        userModel.findAll({
            attributes: ["id", "firstName", "lastName", "email", "idRole"],
            include: [{
                model: partnerModel,
                required: true,
                attributes: ["phone", "birthdate", "address", "postalCode", "city", "SIRET", "IBAN", "idCategory"]
            }]
        })
            .then((partners: Partner) => {
                res.status(200).json(partners);
            })
            .catch((err: any) => {
                res.status(409).send(err);
            });
    };
    
    //Récupérer un partenaire
    const getPartnerProfile = (req: Express.Request, res: Express.Response) => {
        // Vérifier si l'utilisateur connecté est bien un admin
        isNotAdmin(req,res);
        userModel.findByPk(
            req.params.id,
            {
                include: [{
                    model: partnerModel,
                    where: {
                        idUser: req.params.id
                    },
                    attributes: ["phone", "birthdate", "address", "postalCode", "city", "SIRET", "IBAN", "idCategory"]
                }],
                attributes: ["id", "firstName", "lastName", "email", "idRole"]
            })
            .then((partner: Partner) => {
                res.status(200).json(partner);
            })
            .catch((err: any) => {
                res.status(409).send(err);
            });
    };
  
  // Créer un partenaire par le commercial
  const addPartner = async (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      //on initie la transaction
      const transaction: Transaction = await dbConnection.transaction();
      try {
          //on crée notre utilisateur
          const user = await userModel.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              idRole: req.body.idRole
          }, { transaction: transaction });
  
          //on crée un client 
          if (user.idRole === 2) {
              await partnerModel.create({
                  idUser: user.id,
                  phone: req.body.phone,
                  birthdate: req.body.birthdate,
                  address: req.body.address,
                  postalCode: req.body.postalCode,
                  city: req.body.city,
                  SIRET: req.body.siret,
                  IBAN : req.body.iban,
                  idUser_salesHasPartner: req.user.id,
                  idCategory: req.body.idCategory
              }, { transaction: transaction })
          }
  
          //on commit nos changements 
          await transaction.commit();
          //on retourner les données de notre utilisateur
          return res.status(201).json(user);
      } catch (err) {
          await transaction.rollback();
      }
  };

  // modifier un partenaire par le commercial
  const editPartner = async (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      const { firstName, lastName, email, phone, birthdate, address, postalCode, city, img, SIRET, IBAN } = req.body;
      const transaction: Transaction = await dbConnection.transaction();
      try {
          //on crée notre utilisateur
          const user = await userModel.update({
              firstName: firstName,
              lastName: lastName,
              email: email,
          }, {
              where: {
                  id: req.params.id
              },
              individualHooks: true,
          },
              { transaction: transaction }
          );
  
          const partner = await partnerModel.update({
              phone: phone,
              birthdate: birthdate,
              address: address,
              postalCode: postalCode,
              city: city,
              img: img,
              SIRET: SIRET,
              IBAN: IBAN
          }, {
              where: {
                  idUser: req.params.id
              },
              individualHooks: true,
          },
              { transaction: transaction });
  
          //on commit nos changements 
          await transaction.commit();
          //on retourner les données de notre utilisateur
          return res.status(200).json({ user, partner });
      } catch (err) {
          res.status(400).send(err);
          await transaction.rollback();
      }
  };



  /* ******************************************************************** */
  /* ****************************** BOOKINGS **************************** */
  /* ******************************************************************** */

    // Modifier un booking via son id par un commercial / admin
    const editBooking = (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      bookingModel.update({
          appointementDate: req.body.appointementDate,
          nbHours: req.body.nbHours,
          description: req.body.description,
          idService: req.body.idService
      }, {
          where: {
              id: req.params.id
          }
      })
          .then((booking: Booking) => {
              res.status(201).json({ booking: booking.id });
          })
          .catch((err: Error) => {
              res.status(409).send(err);
          });
    };

    // Annuler une prestation
    const cancelBooking = (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      bookingModel.update({
          cancelDate: req.body.cancelDate,
          isCancelled: 1,
      }, {
          where: {
              id: req.params.id,
              accepted: false
          }
      })
          .then((booking: Booking) => {
              res.status(201).json({ booking: booking.id });
          })
          .catch((err: Error) => {
              res.status(409).send(err);
          });
    };


    //Récupérer par l'id un booking
    const getBooking = (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      bookingModel.findByPk(req.params.id)
          .then((booking: Booking) => {
              res.status(200).json(booking);
          })
          .catch((err: Error) => {
              res.status(409).send(err);
          });
    };


    //Récupérer toutes les réservations
    const getBookings = (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      bookingModel.findAll()
          .then((bookings: Booking) => {
              res.status(200).json(bookings);
          })
          .catch((err: Error) => {
              res.status(409).send(err);
          });
    };



  /* ******************************************************************** */
  /* ****************************** USERS ******************************* */
  /* ******************************************************************** */

    // supprimer un utilisateur / le mettre en "inactif" dans la bdd
    const inactivateUser = (req: Express.Request, res: Express.Response) => {
      // Vérifier si l'utilisateur connecté est bien un admin
      isNotAdmin(req,res);
      userModel.update({
        isActive: 0
      }, {
        where: {
          id: req.params.id
        }, individualHooks: true,
      })
        .then((user: User) => {
          res.status(201).json(user);
        })
        .catch((err: Error) => {
          res.status(409).send(err);
        });
    };



  /* ******************************************************************** */
  /* ****************************** ADMIN ******************************* */
  /* ******************************************************************** */

  // Récupérer les identifiants de l'admin pour que ses détails puissent
  // s'afficher sur sa page profil
  const getAdminProfile = (req: Express.Request, res: Express.Response) => {
    // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
    userModel.findByPk(req.user.id)
        .then((user: User) => {
            res.status(200).json(user);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
  };
  

  // Modifier les identifiants de l'admin sur sa page profil
const editAdminProfile = (req: Express.Request, res: Express.Response) => {
  // Vérifier si l'utilisateur connecté est bien un admin
    isNotAdmin(req,res);
    const { password, email } = req.body;
    userModel.update({
      password: password,
      email: email
    }, {
      where: {
        id: req.user.id
      }, individualHooks: true,
    })
      .then((user: User) => {
        res.status(201).json(user);
      })
      .catch((err: Error) => {
        res.status(409).send(err);
      });
  };
  
  
  export { getAdminProfile, editAdminProfile, getRecrutedClients, getRecrutedPartners, getClients, getClient,
    addClient, editClient, getPartners, getPartnerProfile, addPartner, editPartner,
     editBooking, cancelBooking, getBooking, getBookings,
      inactivateUser };