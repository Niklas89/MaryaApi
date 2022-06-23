import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute";
import bookingRoute from "./routes/bookingRoute";
import dbConnection from "./config/dbConfig";

const app = express();

//middleware
app.use(express.json());


app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);

dbConnection
  .sync()
  .then((result: any) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err: any) => {
    console.log(err);
  });
