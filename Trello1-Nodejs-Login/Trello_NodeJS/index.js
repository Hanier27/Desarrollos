var express= require('express');
var mysql= require('mysql');
var fs = require("fs");
var trello = express()
var bodyParser = require('body-parser');

conexion=mysql.createConnection({
	host: 'localhost', 
 	user: 'root',  
    password: '', 
    port:"3306",
 	database: 'trello2'
});

trello.use(express.static(__dirname+'/public'));
 
// parse application/json
trello.use(bodyParser.json());
// parse application/x-www-form-urlencoded
trello.use(bodyParser.urlencoded({ extended: true }));


trello.get('/',function(req,res) {
    res.send('Bienvenido a Trello');
})

trello.get("/usuarios",function(req,res){
    conexion.query(
        'SELECT * FROM tbl_usuarios;',
        function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
    );
});

trello.get("/listas",function(req,res){
    conexion.query(
        'SELECT * FROM tbl_listas;',
        function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
    );
});

trello.get("/tarjetas",function(req,res){
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

trello.post("/agregarLista",function(req,res){
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

trello.post("/agregarTarjeta",function(req,res){
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

trello.listen(3000,function(){
    console.log("Trello arriba");
});

