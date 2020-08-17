var express = require("express");
var RouterElectrovalvula = express.Router()
var pool = require("../../mysql");


RouterElectrovalvula.get("/", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Electrovalvulas", function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    });    
});

RouterElectrovalvula.get("/:electrovalvulaId", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Electrovalvulas WHERE electrovalvulaId=?", [req.params.electrovalvulaId], function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    });    
});


module.exports = RouterElectrovalvula;