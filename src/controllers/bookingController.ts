import bookingModel from "../models/bookingModel";
import Booking from "../types/bookingType";
import Express from "express";
import moment from "moment";
import { Op } from "sequelize";


// les function pour les catégories:à 
//Récupérer toutes les catégories
const getBookings = (req: Express.Request, res: Express.Response) => {
    bookingModel.findAll()
        .then((bookings: Booking) => {
            res.status(200).json(bookings);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id un booking
const getBookingById = (req: Express.Request, res: Express.Response) => {
    bookingModel.findByPk(req.params.id)
        .then((booking: Booking) => {
            res.status(200).json(booking);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitré une nouvelle catégorie
const addBooking = (req: Express.Request, res: Express.Response) => {
    bookingModel.create({
        appointementDate: req.body.appointementDate,
        nbHours: req.body.nbHours,
        accepted: req.body.accepted,
        totalPrice: req.body.totalPrice,
        idClient: req.body.idClient,
        idService: req.body.idService,
    })
        .then((booking: Booking) => {
            res.status(201).json({ booking: booking.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier un booking via son id pour les modifications clients
const editBookingByIdForClient = (req: Express.Request, res: Express.Response) => {
    bookingModel.update({
        appointementDate: req.body.appointementDate,
        nbHours: req.body.nbHours,
        description: req.body.description,
        totalPrice: req.body.totalPrice,
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

//Modifier un booking via son id par un commercial / admin
const editBookingByIdForAdmin = (req: Express.Request, res: Express.Response) => {
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



//Acceptation de la reservation par le partenaire
const bookedByPartner = (req: Express.Request, res: Express.Response) => {
    bookingModel.update({
        idPartner: req.body.idPartner,
        accepted: 1,
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

//Prestation términé
const bookingDonne = (req: Express.Request, res: Express.Response) => {
    bookingModel.update({
        serviceDone: 1,
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

//annulée une prestation
const cancelBooking = (req: Express.Request, res: Express.Response) => {
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

//Supprimer un booking via sont id
const deleteBookingById = (req: Express.Request, res: Express.Response) => {
    bookingModel.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((booking: Booking) => {
            res.status(200).json({ booking: booking.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//récuperé la date du booking
const dateBooking = (req: Express.Request, res: Express.Response) => {
    //permet de récuperé l'argument dans l'url
    const dateType = req.params.dateType;
    const accepted = req.params.accepted
    let whereClause = null;
    if (dateType === "future") {
        whereClause = { [Op.gt]: moment().add(1, "d").format("YYYY-MM-DD") };
    }
    //Sinon dans l'url === passed alors prend les Bookings passé
    else if (dateType === "past") {
        whereClause = { [Op.lt]: moment().subtract(1, "d").format("YYYY-MM-DD") };
    }
    //Sinon prend les bookings du jour
    else {
        whereClause = { [Op.between]: [moment().format("YYYY-MM-DD"), moment().add(1, "d").format("YYYY-MM-DD")] };
    }
    let acceptedClause = null;
    if (accepted === "true") {
        acceptedClause = true
    } else {
        acceptedClause = false
    }
    bookingModel.findAll({
        attributes: ["appointementDate", "nbHours", "description", "totalPrice", "accepted"],
        where: {
            appointementDate: whereClause,
            accepted: acceptedClause,
        },
    })
        .then((booking: Booking) => {
            res.status(200).json(booking);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};



export { getBookings, getBookingById, addBooking, editBookingByIdForClient, bookedByPartner, bookingDonne, cancelBooking, deleteBookingById, dateBooking, editBookingByIdForAdmin }

