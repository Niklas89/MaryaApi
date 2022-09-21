import bookingModel from "../models/bookingModel";
import Booking from "../types/bookingType";
import Partner from "../types/partnerType";
import Express from "express";
import partnerModel from "../models/partnerModel";


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

//Enregsitrer une nouvelle réservation
const addBooking = (req: Express.Request, res: Express.Response) => {
    bookingModel.create({
        appointmentDate: req.body.appointmentDate,
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
        appointmentDate: req.body.appointmentDate,
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

//Acceptation de la reservation par le partenaire
const bookedByPartner = (req: Express.Request, res: Express.Response) => {
    partnerModel.findOne({
        where: {
            idUser: req.user.id
        }
    })
        .then((partner: Partner) => {
            bookingModel.update({
                idPartner: partner.id,
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
        })

};

//Prestation términé
const bookingDone = (req: Express.Request, res: Express.Response) => {
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


export { getBookingById, addBooking, editBookingByIdForClient, bookedByPartner, bookingDone, cancelBooking }


