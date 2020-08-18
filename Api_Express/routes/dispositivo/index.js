var express = require("express");
var RouterDispositivo = express.Router()
var pool = require("../../mysql");

RouterDispositivo.get("/", function(req, res){
    //Leo en la base de datos toda la lista de dispositivos
    pool.query("SELECT * FROM Dispositivos", function(err,result){
        if(err){
            res.status(400).send(err);
        }
        res.send(result); //Envio respuesta con la lista de dispositivos
    });    
});

RouterDispositivo.get("/:dispositivoId", function(req, res){
    //Leo en la base de datos el dispositivo con el id pasado como parametro
    pool.query("SELECT * FROM Dispositivos WHERE dispositivoId=?", [req.params.dispositivoId], function(err,result){
        if(err){
            res.status(400).send(err);
        }
        res.send(result[0]); //Envio respuesta con el dispositivo requerido
    });    
});

module.exports = RouterDispositivo;