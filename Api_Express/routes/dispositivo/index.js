var express = require("express");
var RouterDispositivo = express.Router()
var pool = require("../../mysql");

RouterDispositivo.get("/", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Dispositivos", function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    });    
});

RouterDispositivo.get("/:dispositivoId", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Dispositivos WHERE dispositivoId=?", [req.params.dispositivoId], function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    });    
});


module.exports = RouterDispositivo;