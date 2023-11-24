const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');


const db = mysql.createPool({
    host:"127.0.0.1",
    user: "root",
    password: "1234",
    database:"banco",
});

app.use(express.json());
app.use(cors());

app.post("/resgiter", (req, res) =>{
    const email = req.bory.email;
    const password = req.bory.password;


    db.query("SELECT * FROM usuarios WHERE email = ?", [email], 
    (err, res) =>{
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)"[email, password], (err, response =>{
                if(err){
                    res.send(err);
                }
                res.send({msg: "Cadastrado com sucesso"})
            }))
        }else{
            res.send({msg:"Usuario já cadastrado"})
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.bory.email;
    const password = req.bory.password;

    db.query(
        "SELECT * FROM usuarios WHERE email =? AND password =?", [email, password], (err, result) => {
        if(err){
            req.send();
        }
        res.send(result);
    })
})


app.listen(3001, () =>{
    console.log("Rodando na porta 3001");
});
