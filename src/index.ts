import "dotenv/config";
import express from "express";

import pool from "./config/dbConfig";

const app = express();

//middleware
app.use(express.json());

app.get('/user', async (req, res) => {
    try {
        let conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM USER");
        res.status(200).json(user);
        console.log(process.env.DB_HOST);
    } catch (err) {
        throw err;
    }
});

app.listen(8080, () => {
  console.log(`server running on port 8080`)
});