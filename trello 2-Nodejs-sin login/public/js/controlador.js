function logearse(){
	var parametros=
	"usuario="+$('#txt-usuario').val()+"&"+
	"pass="+ $('#txt-contrasena').val();
	console.log(parametros);
	if($('#txt-usuario').val()=="" || $('#txt-contrasena').val()==""){
		$('#txt-usuario').addClass('invalid');
		$('#txt-contrasena').addClass('invalid');
	}else{
		$('#txt-usuario').addClass('valid');
		$('#txt-contrasena').addClass('valid');
		$.ajax({
			url: "/login",
			method: 'POST',
			data:parametros,
			success:function(respuesta){
				if(respuesta.length==0){
					$('#txt-usuario').addClass('invalid');
					$('#txt-contrasena').addClass('invalid');
				}else{
					$('#contenido-Trello #div-inicio').hide();
					$("#form-login").fadeOut(50);
					$("#user-details").html('<p><img class="img-circle" width="40px" src="'+ respuesta[0].url_imagen +'">'+
											'<input id="usuario-logeado" class="hidden" type="text" value="'+respuesta[0].codigo_usuario+'" class="form-control">'+
											' <strong><a type="button" class="btn btn-danger" onclick="CloseSesion()">Cerrar Sesion</a></strong></p>');
					$("#user-details").fadeIn(50);	
					mostrarListasUser(respuesta[0].codigo_usuario);
				}
				
			}
		});
	}
}

function mostrarListasUser(user){
	var parametros='usuario='+user;
	console.log(parametros);
	$.ajax({
		url: "/listas",
		method: 'POST',
		data:parametros,
		success:function(respuesta){
			console.log(respuesta);
			if(respuesta.length==0){
				$('#contenido-Trello').append('<div class="col-md-3" id="agregar-lista">'+
											'<div class="well blue-list">'+
											'<a id="btn-agregar-Lista"  style="color: white;" onclick="mostrar_agregarLista()">Añadir una Lista...</a>'+
											'<p id="lista"><textarea id="txt-texto-tarjeta" class="form-control" placeholder="Título lista"></textarea><br>'+
											'<button id="btn-agregar-lista" onclick="agregar_lista()" class="btn btn-success" role="button" >Agregar lista</button>'+
											'<button class="btn btn-default" style="margin-left:10px;" role="button"  onclick="closeAgregarLista();"><i class="fa fa-close"></i></button></p>'+
											'</div></div>');
											$('#lista').hide();
			}else{
				$('#contenido-Trello').html("");
				for(var i=0;i<respuesta.length;i++){
					$('#contenido-Trello').append('<div class="col-md-3">'+
												  '<div class="well list" id="div-lista-'+ respuesta[i].codigo_lista +'">'+
												  '<h4>'+ respuesta[i].titulo_lista +'</h4>'+
												  '<a id="btn-agregar-tarjeta-'+respuesta[i].codigo_lista+'" style="color: rgba(104, 104, 104, 0.411)" id="btn-añadir" onclick="mostrar_agregarTarjeta('+respuesta[i].codigo_lista+')">Añadir una Tarjeta...</a>'+
												  '<p id="agregarTarjeta-'+respuesta[i].codigo_lista+'"><textarea rows="4" style="margin-bottom:10px; width:100%;" class="form-control" placeholder="Tarea" id="txt-tarjeta-lista-1">'+
												  '</textarea>'+
												  '<button class="btn btn-success" role="button"  onclick="agregarTarjeta('+respuesta[i].codigo_lista+');">Añadir</button>'+
												  '<button class="btn btn-default" style="margin-left:10px;" role="button"  onclick="closeAgregarTarjeta('+respuesta[i].codigo_lista+');"><i class="fa fa-close"></i></button></p>'+ 
												  '</div>'+
												  '</div>');
												  $('#agregarTarjeta-'+respuesta[i].codigo_lista).hide();
					mostrarTarjetas(respuesta[i].codigo_lista);	
				}
				$('#contenido-Trello').append('<div class="col-md-3" id="agregar-lista">'+
											'<div class="well blue-list">'+
											'<a id="btn-agregar-Lista" style="color: white;" onclick="mostrar_agregarLista()">Añadir una Lista...</a>'+
											'<p id="lista"><textarea id="txt-texto-tarjeta" class="form-control" placeholder="Título lista"></textarea><br>'+
											'<button id="btn-agregar-lista" onclick="agregar_lista()" class="btn btn-success" role="button">Agregar lista</button>'+
											'<button class="btn btn-default" style="margin-left:10px;" role="button"  onclick="closeAgregarLista();"><i class="fa fa-close"></i></button></p>'+
											'</div></div>');
											$('#lista').hide();
										

			}
		}
	});
}

function mostrarTarjetas(lista){
	$.ajax({
		url: "/tarjetas",
		method: 'GET',
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0;i<respuesta.length;i++){
				if(respuesta[i].codigo_lista==lista){
					$('#btn-agregar-tarjeta-'+respuesta[i].codigo_lista).before('<div class="well card">'+
							'<p>'+
							respuesta[i].contenido_tarjeta + 
							'<br><span class="small-date">'+ respuesta[i].fecha_creacion +'</span></p>'+
							'</div>');
				}
			}
		}
	});
}

function agregar_lista(){
	var parametros_lista=
	"usuario="+$('#usuario-logeado').val()+"&"+
	"titulo="+ $('#txt-texto-tarjeta').val();
	console.log(parametros_lista);
	if($('#txt-texto-tarjeta').val()!=""){
		$.ajax({
			url: "/agregarLista",
			method: 'POST',
			data:parametros_lista,
			success:function(respuesta){
				console.log(respuesta);
				closeAgregarLista();
				$('#agregar-lista').before('<div class="col-md-3">'+
											'<div class="well list" id="div-lista-'+ respuesta[0].codigo_lista +'">'+
											'<h4>'+ respuesta[0].titulo_lista +'</h4>'+
											'<a id="btn-agregar-tarjeta-'+respuesta[0].codigo_lista+'" style="color: rgba(104, 104, 104, 0.411)" id="btn-añadir" onclick="mostrar_agregarTarjeta('+respuesta[0].codigo_lista+')">Añadir una Tarjeta...</a>'+
											'<p id="agregarTarjeta-'+respuesta[0].codigo_lista+'"><textarea rows="4" style="margin-bottom:10px; width:100%;" class="form-control" placeholder="Tarea" id="txt-tarjeta-lista-1">'+
											'</textarea>'+
											'<button class="btn btn-success" role="button"  onclick="agregarTarjeta('+respuesta[0].codigo_lista+');">Añadir</button>'+
											'<button class="btn btn-default" style="margin-left:10px;" role="button"  onclick="closeAgregarTarjeta('+respuesta[0].codigo_lista+');"><i class="fa fa-close"></i></button></p>'+
											'</div>'+
											'</div>');
											$('#agregarTarjeta-'+respuesta[0].codigo_lista).hide();
			}
		});
	}else{
		$('#myModal').modal();
	}	
}

function agregarTarjeta(lista){
	var parametros_tarjeta=
	"contenido="+$('#agregarTarjeta-'+lista+' textarea').val()+"&"+
	"lista="+ lista+"&"+
	"usuario="+$('#usuario-logeado').val();
	console.log(parametros_tarjeta);
	if($('#agregarTarjeta-'+lista+' textarea').val()!=""){
		$.ajax({
			url: "/agregarTarjeta",
			method: 'POST',
			data:parametros_tarjeta,
			success:function(respuesta){
				console.log(respuesta);
				closeAgregarTarjeta(lista);
				$('#btn-agregar-tarjeta-'+lista).before('<div class="well card">'+
							'<p>'+
							respuesta[0].contenido_tarjeta + 
							'<br><span class="small-date">'+ respuesta[0].fecha_creacion +'</span></p>'+
							'</div>');
			}
		});
	}else{
		$('#myModal').modal();
	}
}

function mostrar_agregarTarjeta(lista){
	$('#btn-agregar-tarjeta-'+lista).hide();
	$('#agregarTarjeta-'+lista).show();
}

function closeAgregarTarjeta(lista){
	$('#agregarTarjeta-'+lista+' textarea').val("");
	$('#agregarTarjeta-'+lista).hide();
	$('#btn-agregar-tarjeta-'+lista).show();
}

function mostrar_agregarLista(){
	$('#lista').show();
	$('#agregar-lista a').hide();
}

function closeAgregarLista(){
	$('#txt-texto-tarjeta').val("")
	$('#agregar-lista a').show();
	$('#lista').hide();
}

function CloseSesion(){
	$('#user-details').html("");
	$('#user-details').hide();
	$('#txt-usuario').val("");
	$('#txt-usuario').removeClass('valid');
	$('#txt-usuario').removeClass('invalid');
	$('#txt-contrasena').val("");
	$('#txt-contrasena').removeClass('valid');
	$('#txt-contrasena').removeClass('invalid');
	$('#form-login').show();
	$('#contenido-Trello').html('<div id="div-inicio">'+
								'<h1 class="text-center" style="color:white;">Bienvenido a Trello</h1>'+
								'<img class="img-principal" src="img/trello-logo.png">'+
  								'</div>');

}




