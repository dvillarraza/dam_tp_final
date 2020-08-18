var express = require("express");
var RouterRiegos = express.Router()
var pool = require("../../mysql");

RouterRiegos.get("/:electrovalvulaId", function(req, res){
    //Leo en la base de datos el ultimo reigo de la electrovalvula
    pool.query("SELECT * FROM Log_Riegos WHERE electrovalvulaId=? ORDER BY fecha DESC", [req.params.electrovalvulaId], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result[0]);
    });    
});

RouterRiegos.get("/todos/:electrovalvulaId", function(req, res){
    //Leo en la base de datos la lista de todos los riegos de la electrovalvula
    pool.query("SELECT * FROM Log_Riegos WHERE electrovalvulaId=?  ORDER BY fecha DESC", [req.params.electrovalvulaId], function(err,result){
        if(err){
            res.send(err);
            return;
        }
        res.send(result);
    });    
});


RouterRiegos.post("/", function(req, res){

    console.log(req.body.fecha);
    //Inserto una nuevo riego en la base de datos con los datos pasados  en el body del post
    pool.query("INSERT INTO Log_Riegos (electrovalvulaId, fecha, apertura) VALUES (?,?,?)", 
        [req.body.electrovalvulaId, req.body.fecha, req.body.apertura], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result); //Devuelvo el resultado de la insercion
    });    
});

module.exports = RouterRiegos;