import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute";
import dbConnection from "./config/dbConfig";

const app = express();

//middleware
app.use(express.json());


app.use("/api/user", userRoute);

/*
app.listen(8080, () => {
  console.log(`server running on port 8080`)
}); */


dbConnection
  .sync()
  .then((result: any) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err: any) => {
    console.log(err);
  });
