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

/*const getBookingId = (req: any, res: any, next: any) => {
    bookingModel.findByPk()
        .then((bookingId: any) => {
            res.status(200).json(bookingId);
        })
        .catch((err: any) => {
            console.log(err);
        });
}*/

export { getBookings }