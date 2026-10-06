import { Pool } from "pg";
import "dotenv/config.js"

export default new Pool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})

