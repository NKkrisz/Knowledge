import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());
app.use(cors());

let con = null;

try{
    con = await mysql.createConnection({ 
        host: "localhost",
        user: "root",
        password: "",
        database: "filmek",
        multipleStatements: true,
    });
}catch(error){
    console.log(error);
}

async function getAlap(req, resp) {
    let sql = "SELECT * FROM `filmek` ORDER BY cim";
    try{
        const [ json ] = await con.query(sql);
        resp.send(json);
    }catch{
        resp.status(400).send({err:error});
    }
}

async function getById(req, resp) {
    let sql = "SELECT * FROM `filmek` where faz = " + req.params.id;
    try{
        const [ json ] = await con.query(sql);
        resp.send(json);
    }catch{
        resp.status(400).send({err:error});
    }
}

async function getEvek(req, resp) {
    let sql = "SELECT ev FROM `filmek` GROUP BY ev";
    try{
        const [ json ] = await con.query(sql);
        resp.send(json);
    }catch{
        resp.status(400).send({err:error});
    }
}



async function getByIdEv(req, resp) {
    let sql = "SELECT * FROM `filmek` where ev = " + req.params.ev;
    try{
        const [ json ] = await con.query(sql);
        resp.send(json);
    }catch{
        resp.status(400).send({err:error});
    }
}

async function postFilm(req, resp) {
    if(req.body.cim && req.body.ev && req.body.imdb && req.body.kep){
        let sql = `insert into filmek set cim="${req.body.cim}", ev=${req.body.ev}, imdb=${req.body.imdb}, kep="${req.body.kep}" `;
        try{
            const [ json ] = await con.query(sql);
            resp.send(json);
        }catch{
            resp.status(400).send({err:error});
        }
    }
}

async function delFilm(req, resp) {
    if(req.params.faz){
        let sql = `delete from filmek where faz=${req.params.faz}`;
        try{
            const [ json ] = await con.query(sql);
            resp.send(json);
        }catch{
            resp.status(400).send({err:error});
        }
    }
}


app.get("/", (req, resp) => resp.send("<h1>Filmek v1.0.0</h1>"));
app.get("/filmek", getAlap);
app.get("/film/:id", getById);
app.get("/evek", getEvek);
app.get("/ev/:ev", getByIdEv);
app.post("/film", postFilm);
app.delete("/film/:faz", delFilm);

app.listen(3000, (error) => {
    if (error) console.log(error); else console.log("Server is on port: 3000");
})