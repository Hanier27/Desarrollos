var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var trello2 = express();

conexion=mysql.createConnection({
	host: 'localhost', 
 	user: 'root',  
    password: '', 
    port:"3306",
 	database: 'trello'
});

trello2.use(express.static(__dirname+'/public'));

trello2.get("/",function(peticion, respuesta){
	respuesta.send("Hola mundo");
});

// parse application/json
trello2.use(bodyParser.json());
// parse application/x-www-form-urlencoded
trello2.use(bodyParser.urlencoded({ extended: true }));

trello2.post("/login",function(req,res){
    conexion.query(
		'SELECT codigo_usuario,nombre_usuario,password,url_imagen '+ 
		'FROM tbl_usuarios '+
		'WHERE nombre_usuario = ? '+
		'AND password = ?',
		[
			req.body.usuario,
			req.body.pass
		],
        function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
    );
});

trello2.post("/listas",function(req,res){
    conexion.query(
		'SELECT codigo_lista,titulo_lista,fecha_creacion,cod_usuario'+
		' FROM tbl_listas '+
		'WHERE cod_usuario = ?',
		[
			req.body.usuario,
		],
        function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
    );
});

trello2.get("/tarjetas",function(req,res){
    conexion.query(
        "SELECT t.codigo_tarjeta,t.contenido_tarjeta,t.codigo_lista,t.codigo_usuario,u.nombre_usuario,u.url_imagen,t.fecha_creacion "+
        "FROM tbl_tarjetas t "+
        "INNER JOIN tbl_usuarios u "+
        "ON (t.codigo_usuario=u.codigo_usuario) ",
        function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
    );
});

trello2.post("/agregarLista",function(req,res){
    conexion.query("INSERT INTO tbl_listas(codigo_lista,titulo_lista,fecha_creacion,cod_usuario)"+
        "VALUES (NULL,?,sysdate(),?)",
        [
            req.body.titulo,
            req.body.usuario,
        ],
        function (error, resultado){
            if (resultado.affectedRows==1){
                conexion.query("SELECT codigo_lista, titulo_lista, fecha_creacion, cod_usuario "+
                    "FROM tbl_listas "+
                    "WHERE codigo_lista = ?",
                    [resultado.insertId],
					function(errorSelect, informacion, campos){
						if (errorSelect) throw errorSelect;
						res.send(informacion);		
					}
                );
            }
        }
    );
});

trello2.post("/agregarTarjeta",function(req,res){
    conexion.query(
        "INSERT INTO tbl_tarjetas(codigo_tarjeta,codigo_usuario,codigo_lista,contenido_tarjeta,fecha_creacion)"+
        "VALUES (NULL,?,?,?,sysdate())",
        [
            req.body.usuario,
            req.body.lista,
            req.body.contenido,
        ],
        function (error, data){
            if (data.affectedRows==1){
                conexion.query(
                    "SELECT t.codigo_tarjeta,t.contenido_tarjeta,t.codigo_lista,t.codigo_usuario,u.nombre_usuario,u.url_imagen,t.fecha_creacion "+
                    "FROM tbl_tarjetas t "+
                    "INNER JOIN tbl_usuarios u "+
                    "ON (t.codigo_usuario=u.codigo_usuario) "+
                    "WHERE codigo_tarjeta = ?",
                    [data.insertId],
					function(errorSelect, informacion, campos){
						if (errorSelect) throw errorSelect;
						res.send(informacion);		
					}
                );
            }
        }
    );
});

trello2.listen(3000,function(){
    console.log("Trello 2 arriba");
});

