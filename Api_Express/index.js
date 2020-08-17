var express = require('express');
var app = express() //Nuestra app tiene todo el objeto de express
var PORT = 3000;
var routerDispositivo = require("./routes/dispositivo");
var routerMedicion = require("./routes/medicion");
var RouterElectrovalvula = require("./routes/electrovalvula");
var RouterRiegos = require("./routes/riego");
var cors = require('cors');

var CorsConfig = { //Me define que restricciones voy a aplicar
    origin: '*',
    optionsSuccesStatus: 200 
}

app.use(cors(CorsConfig)); //Aplico un meadllweare de terceros (cors)

app.use(express.json());

app.use("/api/dispositivo",routerDispositivo)

app.use("/api/medicion",routerMedicion)

app.use("/api/electrovalvula",RouterElectrovalvula)

app.use("/api/riego",RouterRiegos)


app.listen(PORT, function(res, req){
    console.log("Api Funcionando")

});