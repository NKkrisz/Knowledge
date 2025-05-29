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

app.get('/api/names/:day/:month',async (request,response)=>{
    try {
        const {day, month} = request.params
        const sql = `SELECT * FROM name_days WHERE day=? AND month=?`
        const [rows, fields] = await connection.execute(sql, [day, month]);
        response.status(200).send(rows)
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})

app.get('/api/dates/:name',async (request,response)=>{
    try {
        const {name} = request.params
        const sql = `SELECT day, month FROM name_days WHERE name=? ORDER BY day, month`
        const [rows, fields] = await connection.execute(sql, [name]);
        if(rows.length>0) response.status(200).send(rows)
        else response.status(404).json({msg:"Nincs találat!"})
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})

app.get('/api/info/:name',async (request,response)=>{
    try {
        const {name} = request.params
        const sql = `SELECT * FROM name_info WHERE name=?`
        const [rows, fields] = await connection.execute(sql, [name]);
        if(rows.length>0) response.status(200).send(rows)
        else response.status(404).json({msg:"Nincs találat!"})
      } catch (err) {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
      }
})

app.post('/api/info',async (request,response)=>{
    const {name, gender, descr}=request.body
    try {
        const sql = 'INSERT INTO name_info VALUES (?,?,?,?)'
        const [rows, fields] = await connection.execute(sql,[null, name, gender, descr]);
        response.status(201).json({msg:"Sikeres  hozzáadása!"})
    } catch (err) {    
        if(err.code == "ER_DUP_ENTRY"){
            response.status(409).json({msg:"A név már létezik!"})
        } else {
            console.log(err);
            response.status(500).json({msg:"Hiba történt"})
        }
    }
})

app.delete('/api/info/:name',async (req,resp)=>{
    const { name } = req.params;
    try {
        const sql = 'DELETE FROM name_info WHERE name=?'
        const [rows, fields] = await connection.execute(sql,[name]);
        console.log(rows.affectedRows);
        if(rows.affectedRows==0) return resp.status(404).json({msg:"A név nem található!"})
        else return resp.status(200).json({msg:"Sikeres törlés!"})
      } catch (err) {
            console.log(err);
            resp.status(500).json({msg:"Hiba történt!"})
      }
    
})

const port=8000
app.listen(port,()=>console.log(`server listening on port ${port}...`))