import mariadb from "mariadb";

/*const pool:mariadb.Pool = mariadb.createPool({
    host: "localhost",
    user: "api",
    password: "api",
    database: "api",
    port: 3306,
    connectionLimit: 5
});*/

const conn = mariadb.createConnection({
    host: "",
    user: "api",
    password: "api",
    database: "api",
    port: 3306
}).then(err => {
    if (err) return console.log("Failed to connect");
    console.log(`Successfully connected to mariadb server: ${conn}`);
})

//export default pool;

