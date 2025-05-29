# Backend Snippets

## Configure Database

### configDB.js

```
export const configDB = {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'books',
        multipleStatements: true,
}
```

#### .env version

```
import dotenv from 'dotenv';
dotenv.config();

export const configDB = {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER, 
        password : process.env.DB_PASSWORD, 
        database : process.env.DB_DATABASE,
        port    : process.env.DB_PORT,
        multipleStatements: true,
}
```

## Initialize & Start

### index.js

```
import express from 'express';
import mysql from 'mysql2/promise';
import {configDB} from './configDB.js';
import cors from 'cors'

let connection;

try {
    connection = await mysql.createConnection(configDB);
  } catch (err) {
    console.log(err);
  }

const app=express()
app.use(express.json())
app.use(cors())

const port=8000
app.listen(port,()=>console.log(`server listening on port ${port}...`))
```

## REST API Examples

```
// Összes könyv kérése kategóriával kiegészítve
app.get('/api/books',async (request,response)=>{
    try {
        const sql = `SELECT * FROM books INNER JOIN categories ON books.category_id = categories.id  ORDER BY title`
        const [rows, fields] = await connection.execute(sql);
        response.status(200).send(rows)
        } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
        }
})

// Kategória alapján kérés
app.get('/api/books/:categId',async (request,response)=>{
    try {
        const {categId} = request.params
        const sql = `SELECT * FROM books INNER JOIN categories ON books.category_id = categories.id WHERE books.category_id=? ORDER BY books.title`
        const [rows, fields] = await connection.execute(sql, [categId]);
        if(rows.length>0) response.status(200).send(rows)
        else response.status(404).json({msg:"A keresés nem eredményezett találatot!"})
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})


// Kulcsszavas kérés
app.get('/api/book/:searchedWord',async (request,response)=>{
    try {
        const {searchedWord} = request.params
        const sql = `SELECT * FROM books WHERE INSTR(title, ?) OR INSTR(description, ?)`
        const [rows, fields] = await connection.execute(sql, [searchedWord, searchedWord]);
        if(rows.length>0) response.status(200).send(rows)
        else response.status(404).json({msg:"A keresés nem eredményezett találatot!"})
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})

// Kategóriák kérése
app.get('/api/categories',async (request,response)=>{
    try {
        const sql = `SELECT * FROM categories`
        const [rows, fields] = await connection.execute(sql);
        if(rows.length>0) response.status(200).send(rows)
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})

// Új kategória bevezetése
app.post('/api/categories',async (request,response)=>{
    const {name}=request.body
    try {
        const sql = 'INSERT INTO categories VALUES (?, ?)'
        const [rows, fields] = await connection.execute(sql,[null, name]);
        response.status(201).json({msg:"Sikeres  hozzáadása!"})
    } catch (err) {    
        if(err.code == "ER_DUP_ENTRY"){
            response.status(409).json({msg:"A kategória már létezik!"})
        } else {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
        }
    }
})

// Könyv értékelésének módosítása
app.put('/api/book/:id',async (request,response)=>{
    const {rating}=request.body
    const {id}=request.params
    try {
        const sql = 'UPDATE books SET rating=? WHERE id=?'
        const [rows, fields] = await connection.execute(sql,[rating, id]);
        response.status(201).json({msg:"Sikeres  módosítás!"})
    } catch (err) {    
        console.log(err);
        response.status(500).json({msg:"Hiba történt"})
    }
})
```