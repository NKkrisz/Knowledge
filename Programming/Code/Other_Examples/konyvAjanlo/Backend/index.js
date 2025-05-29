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

// 1. Feladat - összes könyv kérése kategóriával kiegészítve
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

// 2. Feladat - kategória alapján kérés
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


// 3. Feladat - kulcsszavas kérés
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

//4. Feladat - kategóriák kérése
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

//5. Feladat - új kategória bevezetése
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

//6. Feladat  - könyv értékelésének módosítása
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

const port=8000
app.listen(port,()=>console.log(`server listening on port ${port}...`))