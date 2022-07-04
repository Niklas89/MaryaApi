import bookingModel from "../models/bookingModel";
import Booking from "../types/bookingType";
import Express from "express";


// les function pour les catégories:
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

//Récupérer par l'id
const getBookingById = (req: Express.Request, res: Express.Response) => {
    bookingModel.findByPk(req.params.id)
        .then((booking: Booking) => {
            res.status(200).json(booking);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
}

//Enregsitré une nouvelle catégorie
const addBooking = (req: Express.Request, res: Express.Response) => {
    bookingModel.create({
        appointementDate: req.body.appointementDate,
        nbHours: req.body.nbHours,
        description: req.body.description,
        accepted: req.body.accepted,
        totalPrice: req.body.totalPrice,
        idClient: req.body.idClient,
    })
        .then((booking: Booking) => {
            res.status(201).json({ booking: booking.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier un booking via son id
const editBookingById = (req: Express.Request, res: Express.Response) => {
    bookingModel.update({
        appointementDate: req.body.appointementDate,
        nbHours: req.body.nbHours,
        description: req.body.description,
        accepted: req.body.accepted,
        totalPrice: req.body.totalPrice,
    }, {
        where: {
            idBooking: req.params.id
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
            idBooking: req.params.id
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
            idBooking: req.params.id
        }
    })
        .then((booking: Booking) => {
            res.status(200).json({ booking: booking.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};
export { getBookings, getBookingById, addBooking, editBookingById, bookedByPartner, deleteBookingById }
