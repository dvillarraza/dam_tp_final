var express = require("express");
var RouterMedicion = express.Router()
var pool = require("../../mysql");

RouterMedicion.get("/:dispositivoId", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Mediciones WHERE dispositivoId=? ORDER BY fecha DESC", [req.params.dispositivoId], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result[0]);
    });    
});

RouterMedicion.get("/todas/:dispositivoId", function(req, res){
    //SELECT (consulta a la base de datos)
    pool.query("SELECT * FROM Mediciones WHERE dispositivoId=?  ORDER BY fecha DESC", [req.params.dispositivoId], function(err,result){
        if(err){
            res.send(err);
            return;
        }
        res.send(result);
    });    
});


RouterMedicion.post("/", function(req, res){

    console.log(req.body.fecha);

    pool.query("INSERT INTO Mediciones (dispositivoId, fecha, valor) VALUES (?,?,?)", 
        [req.body.dispositivoId, req.body.fecha, req.body.valor], function(err,result){
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send(result);
    });    
});



module.exports = RouterMedicion;