var express = require("express");
var RouterMedicion = express.Router()
var pool = require("../../mysql");

RouterMedicion.get("/:dispositivoId", function(req, res){
    //Leo en la base de datos la ultima medicion del dispositvo
    pool.query("SELECT * FROM Mediciones WHERE dispositivoId=? ORDER BY fecha DESC", [req.params.dispositivoId], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result[0]);
    });    
});

RouterMedicion.get("/todas/:dispositivoId", function(req, res){
    //Leo en la base de datos la lista de todas las mediciones del dispositvo
    pool.query("SELECT * FROM Mediciones WHERE dispositivoId=?  ORDER BY fecha DESC", [req.params.dispositivoId], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });    
});

RouterMedicion.post("/", function(req, res){
    //Inserto una nueva medicion en la base de datos con los datos pasados  en el body del post
    pool.query("INSERT INTO Mediciones (dispositivoId, fecha, valor) VALUES (?,?,?)", 
        [req.body.dispositivoId, req.body.fecha, req.body.valor], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result); //Devuelvo el resultado de la insercion
    });    
});

module.exports = RouterMedicion;