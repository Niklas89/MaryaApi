import bookingModel from "../models/bookingModel";

const getBookings = (req: any, res: any, next: any) => {
    bookingModel.findAll()
        .then((bookings: any) => {
            res.status(200).json(bookings);
        })
        .catch((err: any) => {
            console.log(err);
        });
};

export { getBookings }