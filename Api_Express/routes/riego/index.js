var express = require("express");
var RouterRiegos = express.Router()
var pool = require("../../mysql");

RouterRiegos.get("/:electrovalvulaId", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Log_Riegos WHERE electrovalvulaId=? ORDER BY fecha DESC", [req.params.electrovalvulaId], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result[0]);
    });    
});

RouterRiegos.get("/todos/:electrovalvulaId", function(req, res){
    //SELECT (consulta a la base de datos)
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
    //SELECT (consulta a la base de datos)
    pool.query("INSERT INTO Log_Riegos (electrovalvulaId, fecha, apertura) VALUES (?,?,?)", 
        [req.body.electrovalvulaId, req.body.fecha, req.body.apertura], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });    
});

module.exports = RouterRiegos;