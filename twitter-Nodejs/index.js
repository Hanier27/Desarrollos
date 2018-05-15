var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

conexion=mysql.createConnection({
	host: 'localhost', 
 	user: 'root',  
    password: '', 
    port:"3306",
 	database: 'db_twitter'
});

app.post("/login",function(req,res){
	conexion.query(
		'SELECT codigo_usuario,nombre,apellido,nickname,password,url_imagen_perfil,cantidad_tweets,followers,following '+
		'FROM tbl_usuarios '+
		'WHERE nickname = ?'+
		'AND password = ?',
		[
			req.body.usuario,
			req.body.pass,
		],
		function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
	);
});

app.get("/Trends",function(req,res){
	conexion.query(
		'SELECT * FROM tbl_hashtags_trends',
		function(error,data){
			if(error) throw error;
            res.send(data);
		});
});

app.post("/twitters",function(req,res){
	conexion.query(
		'SELECT  a.codigo_tweet, b.nombre, b.nickname,'+
        'a.codigo_usuario, a.contenido, a.hashtags, a.fecha,'+
        'b.url_imagen_perfil, b.nombre, b.nickname '+
		'FROM tbl_tweets a '+
		'INNER JOIN tbl_usuarios b '+
		'ON (a.codigo_usuario = b.codigo_usuario) '+
		'WHERE a.codigo_usuario = ? '+
		'OR a.codigo_usuario in ('+
		'select codigo_usuario_sigue from tbl_seguidores '+ 
		'where codigo_usuario  = ? '+
		');',
		[
			req.body.User,
			req.body.User,
		],
		function (error, data, fields){
            if(error) throw error;
            res.send(data);
        }
	);
});



app.post("/agregarTweets",function(req,res){
	conexion.query(
		"INSERT INTO tbl_tweets(codigo_tweet,codigo_usuario,contenido,hashtags,fecha) "+
		"VALUES (NULL,?,?,?,sysdate())",
		[
			req.body.usuario,
			req.body.contenido,
			req.body.hashtags,
		],
		function(error,resultado){
			if (resultado.affectedRows==1){
				conexion.query(
							'SELECT t.codigo_tweet,t.codigo_usuario,t.contenido,t.hashtags,t.fecha,u.url_imagen_perfil,u.nombre,u.nickname '+
							'FROM tbl_tweets t '+
							'INNER JOIN tbl_usuarios u '+
							'ON (t.codigo_usuario = u.codigo_usuario)'+
							'WHERE codigo_tweet = ?',
							[resultado.insertId],
							function(errorSelect, informacion, campos){
								if (errorSelect) throw errorSelect;
								res.send(informacion);		
					}
				);
			}	
		});
});

app.listen(3000,function(){
	console.log('Twitter Arriba');
});