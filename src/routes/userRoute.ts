import express from "express";
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/add-user", userController.postAddUser);

router.get("/", userController.getUsers);

/*
router.get('/', async (req, res) => {
    try {
        let conn = await pool.getConnection();
        let user = await conn.query("SELECT * FROM USER");
        res.status(200).json(user);
        console.log(process.env.DB_HOST);
    } catch (err) {
        throw err;
    }
});
*/


export default router;