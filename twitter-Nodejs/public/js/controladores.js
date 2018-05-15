$(document).ready(function(){
	console.log("El DOM ha sido cargado");
});

$("#btn-login").click(function(){
	var login=
	"usuario="+$('#txt-user').val()+"&"+
	"pass="+$('#txt-pass').val();
	if($('#txt-user').val()!="" && $('#txt-pass').val()!=""){
		$('#txt-user').removeClass('is-invalid');
		$('#txt-pass').removeClass('is-invalid');
		$('#txt-user').addClass('is-valid');
		$('#txt-pass').addClass('is-valid');
		$('#btn-login').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Iniciando...');
		setTimeout(function(){
			$.ajax({
				url:"/login",
				method:"POST",
				data:login,
				success:function(respuesta){
					$('#div-detalles-usuario').html(' <div class="component-header">'+
								'<img src = "'+respuesta[0].url_imagen_perfil+'" class="img-fluid rounded-circle img-thumbnail">'+
								'</div>'+
								'<hr>'+
								'<h2 class="blue-text">'+respuesta[0].nombre+' '+respuesta[0].apellido+'</h2>'+
								'<small>'+respuesta[0].nickname+'</small>'+
								'<hr>'+
								'<div class="row">'+
									'<div class="col-lg-4">'+
									'Tweets<br>'+
									'<span class="blue-text">'+respuesta[0].cantidad_tweets+
									'</span>'+
									'</div>'+
									'<div class="col-lg-4">'+
									'Following<br>'+
									'<span class="blue-text">'+respuesta[0].following
									+'</span>'+
									'</div>'+
									'<div class="col-lg-4">'+
									'Followers<br>'+
									'<span class="blue-text">'+respuesta[0].followers+'</span>'+
									'</div>'+
								'</div>');
					Twitters(respuesta[0].codigo_usuario);
					Trends();
					$('#boton-tweets').html('<button id="btn-agregarTweets" type="button" class="btn btn-primary" onclick="agregarTweets('+respuesta[0].codigo_usuario+')">Tweet</button>');			
					$('#navbar-user-section').html('<img src = "'+respuesta[0].url_imagen_perfil+'" class="img-fluid rounded-circle img-thumbnail" style="width: 40px">'+
								'<button id="btn-logout" onclick="logout()" class="btn btn-link">Logout</button>');			
					//Ejecutar esto en caso de que el login sea exitoso. Escribir el codigo del usuario logueado en un input oculto.
					$("#div-login").fadeOut(200,function(){
					$("#div-detalles-usuario").fadeIn(200);
					});
					$("#tweets").fadeIn(100);
					$("#navbar-user-section").fadeIn(100);
				}
			});
		},2000);
	}else{
		$('#txt-user').addClass('is-invalid');
		$('#txt-pass').addClass('is-invalid');
	}
		
});

function Twitters(user){
	var Usuario='User='+user;
	$.ajax({
		url:"/twitters",
		method:"POST",
		data:Usuario,
		success:function(respuesta){
			$('#tweets').html("");
			for(var i=0;i<respuesta.length;i++){
				var contenido="";
				var contenido=ObtnerContenido(respuesta[i].contenido);
				$('#tweets').append('<div class="row component text-left">'+
								'<div class="col-lg-2">'+  
								'<img src = "'+respuesta[i].url_imagen_perfil+'" class="img-fluid rounded-circle img-thumbnail">'+
								'</div>'+
									'<div class="col-lg-10">'+
									'<b>'+respuesta[i].nombre+'</b> '+respuesta[i].nickname+''+
									'<div class="tweet-content">'+
										''+contenido+''+
										'<div>'+
											'<small class="blue-text">'+respuesta[i].hashtags+'</small>'+
										'</div>'+
									'</div>'+
									'</div>'+
								'</div>');
			}				
		}
	});
}

function Trends(){
	$.ajax({
		url:"/Trends",
		success:function(respuesta){
			$('#Trends').html(' <h2>Trends</h2>');
			for(var i=0;i<respuesta.length;i++){
			$('#Trends').append(
							'<div><span class="blue-text">'+respuesta[i].hashtag+'</span> <small>'+respuesta[i].cantidad_tweets+'</small></div>'
							);
			}
		}
	});
}

function agregarTweets(user){
	if($('#txt-contenido-tweets').val()!="" && user!=undefined){
		$('#txt-contenido-tweets').removeClass('is-invalid');
		$('#txt-contenido-tweets').addClass('is-valid');
		$('#btn-agregarTweets').html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Agregando...');
		var parametros=
		"contenido="+$('#txt-contenido-tweets').val()+"&"+
		"hashtags="+$('#txt-hashtags').val()+"&"+
		"usuario="+user;
		setTimeout(function(){
			$.ajax({
				url:"/agregarTweets",
				method:"POST",
				data:parametros,
				success:function(respuesta){
					var contenido="";
					var contenido=ObtnerContenido(respuesta[0].contenido);
					$('#tweets').append('<div class="row component text-left">'+
									'<div class="col-lg-2">'+  
									'<img src = "'+respuesta[0].url_imagen_perfil+'" class="img-fluid rounded-circle img-thumbnail">'+
									'</div>'+
										'<div class="col-lg-10">'+
										'<b>'+respuesta[0].nombre+'</b> '+respuesta[0].nickname+''+
										'<div class="tweet-content">'+
											''+contenido+''+
											'<div>'+
												'<small class="blue-text">'+respuesta[0].hashtags+'</small>'+
											'</div>'+
										'</div>'+
										'</div>'+
									'</div>');
					$('#txt-contenido-tweets').val("");	
					$('#txt-hashtags').val("");
					$('#btn-agregarTweets').html('Tweet');			
					$('#txt-contenido-tweets').removeClass('is-valid');
				}
			});
		},2000);
	}else{
		$('#txt-contenido-tweets').addClass('is-invalid');
	}
}

function ObtnerContenido(contenido){
	var ContenidoEmoji=contenido;
	ContenidoEmoji=ContenidoEmoji.replace(':)',' <img src="img/emojis/emoji1.png">');
	ContenidoEmoji=ContenidoEmoji.replace('XD',' <img src="img/emojis/emoji2.png">');
	ContenidoEmoji=ContenidoEmoji.replace(':P',' <img src="img/emojis/emoji3.png">');
	ContenidoEmoji=ContenidoEmoji.replace(':(',' <img src="img/emojis/emoji4.png">');
	ContenidoEmoji=ContenidoEmoji.replace(':*',' <img src="img/emojis/emoji5.png">');
	ContenidoEmoji=ContenidoEmoji.replace('X_X',' <img src="img/emojis/emoji6.png">');
	ContenidoEmoji=ContenidoEmoji.replace('|**|',' <img src="img/emojis/emoji7.png">');
	console.log(ContenidoEmoji);
	return ContenidoEmoji;
}

function logout(){
	$('#txt-user').val("");
	$('#txt-pass').val("");
	$('#txt-user').removeClass('is-invalid');
	$('#txt-pass').removeClass('is-invalid');
	$('#txt-user').removeClass('is-valid');
	$('#txt-pass').removeClass('is-valid');
	$('#btn-login').html('Login');
	//Ejecutar esto en caso de que el login sea exitoso. Escribir el codigo del usuario logueado en un input oculto.
	$("#div-detalles-usuario").fadeOut(200,function(){
		$("#div-login").fadeIn(200);
	});
	$("#tweets").fadeOut(100);
	$("#navbar-user-section").fadeOut(100);	
}


