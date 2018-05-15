var express=require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');
var session = require("express-session");
var fs = require("fs");
var multipart = require('connect-multiparty');
var path = require('path');
app=express();

app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
app.use(express.static('public'));
app.use(multipart());
// parse application/json
app.use(bodyparser.json());
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));




var servidor={
    host: 'localhost', 
 	user: 'root',  
 	password: '', 
 	database: 'db_dropbox'
}

function verificarAutenticacion(req, res, next){
	if(req.session.user)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

app.post("/login",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT cod_usuario,nombre_usuario,pass,img_perfil "+
        "FROM tbl_usuarios "+
        "WHERE nombre_usuario=? "+
        "AND pass=?",
        [
            req.body.user,
            req.body.pass
        ],
        function(error,data){
            if(error) throw error;
            conexion.end();
            req.session.usuario=req.body.user;
            req.session.usuarioId=data[0].cod_usuario;
            res.send(data);
        }
    );
})

app.post("/obtener_datos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var carpetas=[];
    var sql="SELECT cod_carpeta,nombre_carpeta,fecha_creacion,fecha_modificacion,url,cod_usuario "+
            "FROM tbl_carpeta "+
            "WHERE cod_usuario=? "+
            "ORDER BY cod_carpeta ASC LIMIT 1";
    conexion.query(sql,[req.session.usuarioId],
        function(error,data){
            if (error) throw error;
                conexion.end();
                res.send(data);
        });
})


app.post("/obtener_subCarpetas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_carpeta "+
        "WHERE cod_carpeta=? "+
        "AND cod_usuario=?",
        [req.body.codigo,req.session.usuarioId],
        function(error,data){ 
            if(error)throw error;
            conexion.end();
            res.send(data);
        }
    );
})


app.post("/obtener_carpetas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_carpeta "+
        "WHERE cod_carpeta_padre=? "+
        "AND cod_usuario=?",
        [req.body.codigo,req.session.usuarioId],
        function(error,data){ 
            if(error)throw error;
            conexion.end();
            res.send(data);
        }
    );
})


app.post("/obtener_detalles",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_archivos "+
        "WHERE cod_archivo=? "+
        "AND cod_usuario=?",
        [req.body.codigo, req.session.usuarioId],
        function(error,data){ 
            if(error)throw error;
            conexion.end();
            res.send(data);
        }
    );
})


app.post("/obtener_archivos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_archivos "+
        "WHERE cod_carpeta=? "+
        "AND cod_usuario=?",
        [req.body.codigo, req.session.usuarioId],
        function(error,data){ 
            if(error)throw error;
            conexion.end();
            res.send(data);
        }
    );
})

app.post("/crearCarpeta",function(req,res){
    var conexion=mysql.createConnection(servidor);
    if(req.body.raiz!='No tiene Archivos'){
        var url=req.body.raiz+'/'+req.body.nombre;
        fs.mkdir(url,function(err){
            if (err) {
                res.send(err);
            }else{
               conexion.query(
                   "INSERT INTO tbl_carpeta(cod_carpeta,nombre_carpeta,url,fecha_creacion,"+
                   "fecha_modificacion,cod_usuario,cod_carpeta_padre) "+
                   "VALUES (NULL,?,?,sysdate(),sysdate(),?,?)",
                   [
                    req.body.nombre,
                    url,
                    req.session.usuarioId,
                    req.body.carpeta
                   ],
                   function(error,data){
                    if(data.affectedRows==1){
                        conexion.query(
                            "SELECT cod_carpeta,nombre_carpeta,url,fecha_creacion,"+
                            "fecha_modificacion,cod_usuario,cod_carpeta_padre "+
                            "FROM tbl_carpeta "+
                            "WHERE cod_carpeta=?",[data.insertId],
                            function(errorSelect,informacion){
                                if(errorSelect) throw errorSelect;
                                conexion.end();
                                res.send(informacion);
                            }
                        );
                    }
                   }
                );
            }
         });
    }else{
        var url='Archivos/'+req.body.nombre;
        fs.mkdir(url,function(err){
            if (err) {
                res.send(err);
            }else{
               conexion.query(
                   "INSERT INTO tbl_carpeta(cod_carpeta,nombre_carpeta,url,fecha_creacion,"+
                   "fecha_modificacion,cod_usuario,cod_carpeta_padre) "+
                   "VALUES (NULL,?,?,sysdate(),sysdate(),?,NULL)",
                   [
                    req.body.nombre,
                    url,
                    req.session.usuarioId
                   ],
                   function(error,data){
                    if(data.affectedRows==1){
                        conexion.query(
                            "SELECT cod_carpeta,nombre_carpeta,url,fecha_creacion,"+
                            "fecha_modificacion,cod_usuario,cod_carpeta_padre "+
                            "FROM tbl_carpeta "+
                            "WHERE cod_carpeta=?",
                            [data.insertId],
                            function(errorSelect,informacion){
                                if(errorSelect) throw errorSelect;
                                conexion.end();
                                res.send(informacion);
                            }
                        );
                    }
                   }
                );
            }
         });
    }
})

app.post('/upload', function(req, res) {
    var conexion=mysql.createConnection(servidor);
    /*la foto en este caso se guarda en archivos temporales*/
    var ruta_archivo= req.files.archivo;
    if(req.body.raiz!='No tiene Archivos'){
        var nueva_ruta =req.body.raiz+"/"+ (ruta_archivo.name ).toLowerCase();
        fs.createReadStream(ruta_archivo.path).pipe(fs.createWriteStream(nueva_ruta));
        conexion.query(
            "INSERT INTO tbl_archivos(cod_archivo,nombre_archivo,fecha_creacion,tipo,"+
            "fecha_modificacion,tamaño,cod_usuario,cod_carpeta) "+
            "VALUES (NULL,?,sysdate(),?,sysdate(),?,?,?)",
            [
                req.files.archivo.name,
                req.files.archivo.name.split('.')[1],
                req.files.archivo.size,
                req.session.usuarioId,
                req.body.carpeta
            ],
            function(error,data){
                if(data.affectedRows==1){
                    conexion.query(
                        "SELECT cod_archivo,nombre_archivo,fecha_creacion,fecha_modificacion,"+
                        "tamaño,cod_usuario,cod_carpeta "+
                        "FROM tbl_archivos "+
                        "WHERE cod_archivo=?",
                        [data.insertId],
                        function(errorSelect,informacion){
                            if(errorSelect) throw errorSelect;
                            conexion.end();
                            res.send(informacion)
                        })
                }
            });
    }else{
        var nueva_ruta ='Archivos/'+ (ruta_archivo.name ).toLowerCase();
        fs.createReadStream(ruta_archivo.path).pipe(fs.createWriteStream(nueva_ruta));
        conexion.query(
            "INSERT INTO tbl_archivos(cod_archivo,nombre_archivo,fecha_creacion,tipo"+
            "fecha_modificacion,tamaño,cod_usuario,cod_carpeta) "+
            "VALUES (NULL,?,sydate(),sysdate(),?,?,NULL)",
            [
                req.files.archivo.name,
                req.files.archivo.name.split('.')[1],
                req.files.archivo.size,
                req.session.usuarioId,
            ],
            function(error,data){
                if(data.affectedRows==1){
                    conexion.query(
                        "SELECT cod_archivo,nombre_archivo,fecha_creacion,fecha_modificacion,"+
                        "tamaño,cod_usuario,cod_carpeta "+
                        "FROM tbl_archivos "+
                        "WHERE cod_archivo=?",
                        [data.insertId],
                        function(errorSelect,informacion){
                            if(errorSelect) throw errorSelect;
                            conexion.end();
                            res.send(informacion)
                        })
                }
            });
    }
})

app.get("/cerrar",function(req,res){
    req.session.destroy(function(err) {
		res.send("Correcto");
	  });
})

app.listen('3000',function(){
    console.log('DropBoxs Arriba');
});
