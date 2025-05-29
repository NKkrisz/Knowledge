import cors from "cors"
import express from "express"
import mysql from "mysql2/promise"
import {configDB} from "./configDB.js"

//Connect to SQL database
let connection;

try {
    connection = await mysql.createConnection(configDB);
} catch (err) {
    console.log(err);
}

//Configure Express
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

// API
app.get("/", async (request, response) => {
    try {
        response.status(200).send("<h1>Filmek v1.0.0</h1>");
    } catch (err) {
        console.log(err);
        response.status(500).json({ msg: "Error" });
    }
});

app.get("/filmek", async (request, response) => {
    try {
        const SQL = `SELECT * FROM filmek ORDER BY cim ASC`;
        const [rows] = await connection.execute(SQL);
        response.status(200).json(rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({ msg: "Error" });
    }
});

app.get("/film/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const SQL = `SELECT * FROM filmek WHERE faz = ?`;
        const [rows] = await connection.execute(SQL, [id]);
        response.status(200).json(rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({ msg: "Error" });
    }
});

app.get("/evek", async (request, response) => {
    try {
        const SQL = `SELECT DISTINCT ev FROM filmek`;
        const [rows] = await connection.execute(SQL);
        response.status(200).json(rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({ msg: "Error" });
    }
});

app.get("/ev/:ev", async (request, response) => {
    try {
        const {ev} = request.params
        const SQL = `SELECT * FROM filmek WHERE ev = ?`;
        const [rows] = await connection.execute(SQL, [ev]);
        response.status(200).json(rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({ msg: "Error" });
    }
});

app.post("/film", async (request, response) => {
    try {
        const {cim, ev, imdb, kep} = request.body
        const SQL = `INSERT INTO filmek VALUES(?, ?, ?, ?, ?)`;
        const [rows] = await connection.execute(SQL, [null, cim, ev, imdb, kep]);
        response.status(201).json(rows);
    } catch (err) {
        console.log(err);
        response.status(400).json({ msg: "Hibas parameter" });
    }
});


//Run Express - Place always at the end
app.listen(port, ()=>console.log(`Server started and is listening on port ${port}`))