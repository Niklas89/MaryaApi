import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute";



const app = express();

//middleware
app.use(express.json());


app.use("/api/user", userRoute);

app.listen(8080, () => {
  console.log(`server running on port 8080`)
});