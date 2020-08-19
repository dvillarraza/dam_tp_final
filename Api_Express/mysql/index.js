var mysql = require("mysql");
var configPool = {
    connectionLimit: 10, //Cantidad de conexiones simulyaneas 
    host: 'mysql-server', //Si se usa el contenedor de docker y sino es localhost
    port: 3306,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}

var pool = mysql.createPool(configPool);

pool.getConnection((err, conexion)=>{
    if(err){
        switch(err.code){
            case 'PROTOCOL_CONEXION_LOST':
                console.log("La conexio a la DB se cerró.");
                break;
            case 'ER_CON_COUNT_ERROR':
                console.log("La base de datos tiene muchas conexiones");
                break;
            case 'ECONNREFUSED':
                console.log("LA conexión fue rechazada");
                break;
        }
    }
    if (conexion){
        console.log("Conexion OK")
        conexion.release();
    }
    return;
});

module.exports = pool;