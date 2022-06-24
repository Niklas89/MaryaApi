import bookingModel from "../models/bookingModel";
import Express from "express";

const getBookings = (req: any, res: any, next: any) => {
    bookingModel.findAll()
        .then((bookings: any) => {
            res.status(200).json(bookings);
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const getBooking = (req: Express.Request, res: Express.Response) => {
    bookingModel.findByPk(req.params.id)
        .then((bookings: any) => {
            res.status(200).json(bookings);
        })
        .catch((err: any) => {
            console.log(err);
        });
}
export { getBookings, getBooking }