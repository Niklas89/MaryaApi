import express from "express";
import './config/dbConfig';

const app = express();

//middleware
app.use(express.json());

/*app.get('/user', async (req, res) => {
  let conn;
    try {
        conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM USER");
        res.status(200).json(user);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
})*/

app.listen(8080, () => {
  console.log(`server running on port 8080`)
});