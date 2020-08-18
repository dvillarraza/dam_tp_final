var express = require("express");
var RouterElectrovalvula = express.Router()
var pool = require("../../mysql");


RouterElectrovalvula.get("/", function(req, res){
    //Leo en la base de datos toda la lista de electrovalvulas
    pool.query("SELECT * FROM Electrovalvulas", function(err,result){
        if(err){
            res.status(400).send(err);
        }
        res.send(result);
    });    
});

RouterElectrovalvula.get("/:electrovalvulaId", function(req, res){
   //Leo en la base de datos la electrovalvula con el id pasado como parametro
    pool.query("SELECT * FROM Electrovalvulas WHERE electrovalvulaId=?", [req.params.electrovalvulaId], function(err,result){
        if(err){
            res.status(400).send(err);
        }
        res.send(result[0]);
    });    
});


module.exports = RouterElectrovalvula;