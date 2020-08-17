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
                console.log("Se cerro la conexion");
                break;
            case 'ER_CON_COUNT_ERROR':
                console.log("Tiene muchas conexiones");
                break;
            case 'ECONNREFUSED':
                console.log("Algo cnofigure mal");
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