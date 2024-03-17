

import express from 'express'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
/*const express =  require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');*/
var app = express();

var con = mysql.createConnection({
    host: process.env.DB_HOST ,//'buvmysjovxerblls4fap-mysql.services.clever-cloud.com', //DB_HOST, buvmysjovxerblls4fap-mysql.services.clever-cloud.com
    user: process.env.DB_USER,//'ujuxzmolakxbdlt0',  //DB_USER, ujuxzmolakxbdlt0
    password: process.env.BD_PASSWORD,//'OXdfMT6ZJt8jZQk8jBLk', //DB_PASSWORD, OXdfMT6ZJt8jZQk8jBLk
    database: process.env.DB_NAME,//'buvmysjovxerblls4fap', //DB_NAME, buvmysjovxerblls4fap
    port: process.env.DB_CONST
})
con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static('public'));

app.post('/agregarCarro',(req,res)=>{
    let carro=req.body.Carro;
    let modelo=req.body.Modelo
    let precio= req.body.Precio;
    console.log(carro)
    console.log(modelo)
    console.log(precio)
    con.query('INSERT INTO Carros(nombre_coche,modelo_coche,precio_coche) VALUES ("'+carro+'","'+modelo+'","'+precio+'")', (err, respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        return res.send('<h1>Nombre del carro :</h1>+"'+carro+'"');

    });
});

//Delete
app.post('/borrarCarro', (req,res)=>{
    let dcarro = req.body.DCarro;
    console.log(dcarro)
    con.query('DELETE FROM Carros WHERE id = "'+dcarro+'"', (err, respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        return res.send('<h1>Se ha borrado el carro con el id: </h1>+"'+dcarro+'"');
    });
    
});
//Update
//fun consultar


app.get('/obtenerCarro',(req,res)=>{
    
    con.query('select * from Carros', (err,respuesta, fields)=>{
        if(err)return console.log('ERROR: ', err);
        var carrosHTML=``;
        var i=0;

        respuesta.forEach(carros => {
            i++;
            carrosHTML+= `  <tr>
                            <td>${i}</td>
                            <td>${carros.nombre_coche}</td>
                            <td>${carros.modelo_coche}</td>
                            <td>${carros.precio_coche}</td>  
                            <td>${carros.id}</td>
                            </tr>`;


        });

        return res.send(`<table border=1>
                <tr>
                    <th>Num</th>
                    <th>Nombre</th>
                    <th>Modelo</th>
                    <th>Precio</th>
                    <th>ID</th>
                <tr>
                ${carrosHTML}
                </table>`
        );


    });
});

app.listen(3000,()=>{

    console.log('servidor escuchando en el puerto 3000 ');

}); 