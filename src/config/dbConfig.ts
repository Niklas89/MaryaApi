import mariadb from "mariadb";
const Sequelize = require("sequelize");

const {DB_HOST, DB_DATABASE,DB_PASSWORD,DB_PORT,DB_USER} = process.env;


const dbConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    dialect: 'mariadb',
    host: DB_HOST,
    port: DB_PORT != undefined ? parseInt(DB_PORT): 3306,
    connectionLimit: 5
  });
  

export default dbConnection;

