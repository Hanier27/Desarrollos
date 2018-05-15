$(document).ready(function(){

	$('#btn-login').click(function() {
		if(Validar()==0){
			var parametro="user="+$('#txt-user').val()+"&pass="+$('#txt-pass').val();
			console.log(parametro);
			$.ajax({
				url:'/login',
				method:'POST',
				data:parametro,
				success:function(respuesta){
					console.log(respuesta);
					if(respuesta.length==0){
						$('#txt-user').removeClass('is-valid');
						$('#txt-pass').removeClass('is-valid');
						$('#txt-user').addClass('is-invalid');
						$('#txt-pass').addClass('is-invalid');
					}else{
						$('#navbar-user-section').html('<img src = "'+respuesta[0].img_perfil+'" class="img-fluid rounded-circle img-thumbnail" style="width: 40px">'+
													   '<button id="btn-logout" onclick="logout()" class="btn btn-link">Logout</button>');
						$('#navbar-user-section').show();
						$('#btn-sign').hide();
						$('#modal-login').modal('hide');
						obtener_CarpetaPrincipal(respuesta[0].cod_usuario);			   
					}
				}
			});
		}
	});

});

function obtener_CarpetaPrincipal(id){
	$.ajax({
		url:'/obtener_datos',
		method:'POST',
		data:'user='+id,
		success:function(respuesta){
			console.log(respuesta);
			if(respuesta.length!=0){
				$('#txt-carpeta-actual').val(respuesta[0].url);
				$('#navbarsExampleDefault ul li').html('<a class="nav-link" onclick=" obtener_CarpetaPrincipal('+id+')" href="#">Home </a>')
				$('#modal-carpeta .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearCarpeta('+respuesta[0].cod_carpeta+')">Crear carpeta</button>');
				$('#modal-archivo .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearArchivo('+respuesta[0].cod_carpeta+')">Crear Archivo</button>');
				$('#content-dropbox').show();
				ObtenerArchivos(respuesta[0].cod_carpeta);
			}else{
				$('#txt-carpeta-actual').val('No tiene Archivos');
				$('#modal-carpeta .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearCarpeta('+0+')">Crear carpeta</button>');
				$('#modal-archivo .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearArchivo('+0+')">Crear Archivo</button>');
				$('#tbl-dropbox').hide();
				$('#content-dropbox').show();
			}
		}
	});
}

function obtener_SubCarpeta(id){
	$.ajax({
		url:'/obtener_subCarpetas',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			console.log(respuesta);
			if(respuesta.length!=0){
				$('#txt-carpeta-actual').val(respuesta[0].url);
				$('#modal-carpeta .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearCarpeta('+respuesta[0].cod_carpeta+')">Crear carpeta</button>');
				$('#modal-archivo .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearArchivo('+respuesta[0].cod_carpeta+')">Crear Archivo</button>');
				$('#content-dropbox').show();
				ObtenerArchivos(respuesta[0].cod_carpeta);
			}else{
				$('#txt-carpeta-actual').val('No tiene Archivos');
				$('#modal-carpeta .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearCarpeta('+0+')">Crear carpeta</button>');
				$('#modal-archivo .modal-footer').html('<button type="button" class="btn btn-primary" onclick="crearArchivo('+0+')">Crear Archivo</button>');
				$('#tbl-dropbox').hide();
				$('#content-dropbox').show();
			}
		}
	});
}

function obtenerDetalles(id){
	$('#tbl-detallesArchivo tbody').html("");
	$.ajax({
		url:'/obtener_detalles',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			console.log(respuesta);
			var archivo="";
			archivo='<tr>'+
					'<td><i class="far fa-image"></i> '+respuesta[0].nombre_archivo+'</td>'+
					'<td>'+respuesta[0].fecha_modificacion+'</td>'+
					'<td>'+respuesta[0].fecha_modificacion+'</td>'+
					'<td>'+respuesta[0].tamaño+'KB</td></tr>';

			$('#tbl-detallesArchivo tbody').append(archivo);
			$('#modal-detalle').modal('show');
		}
	});
}

function ObtenerArchivos(id){
	$('#tbl-dropbox tbody').html("");
	$.ajax({
		url:'/obtener_carpetas',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			console.log(respuesta);
			if(respuesta.length!=0){
				for(var i=0;i<respuesta.length;i++){
					var carpeta="";
					carpeta='<tr>'+
							'<td><a onclick="obtener_SubCarpeta('+respuesta[i].cod_carpeta+')"><i class="fas fa-folder-open"></i>'+respuesta[i].nombre_carpeta+'</a></td>'+
							'<td>'+respuesta[i].fecha_modificacion+'</td>'+
							'<td>'+respuesta[i].fecha_creacion+'</td>'+
							'<td></td></tr>';	 
					$('#tbl-dropbox tbody').append(carpeta);					 
				}
			}
		}
	});
	$.ajax({
		url:'/obtener_archivos',
		method:'POST',
		data:'codigo='+id,
		success:function(respuesta){
			console.log(respuesta);
			if(respuesta.length!=0){
				for(var i=0;i<respuesta.length;i++){
					var archivo="";
					var tipo=respuesta[i].tipo;
					if(tipo=='jpg' || tipo=='jpge'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[i].cod_archivo+')"><i class="far fa-image"></i> '+respuesta[i].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].tamaño+'KB</td></tr>';
					}else if(tipo=='docx' || tipo=='txt'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[i].cod_archivo+')"><i class="far fa-file-word"></i>'+respuesta[i].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].tamaño+'KB</td></tr>';
					}else if(tipo=='pdf'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[i].cod_archivo+')"><i class="far fa-file-pdf"></i>'+respuesta[i].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].tamaño+'KB</td></tr>';
					}else{
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[i].cod_archivo+')"><i class="far fa-file"></i>'+respuesta[i].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].fecha_modificacion+'</td>'+
								'<td>'+respuesta[i].tamaño+'KB</td></tr>';
					}
					
					console.log(archivo);
					$('#tbl-dropbox tbody').append(archivo);
				}
			}
		}
	});

}

function crearCarpeta(id){
	$('#tbl-dropbox').show();
	var parametros='nombre='+ $('#txt-nombreCarpeta').val()+
				   '&carpeta='+id+
				   '&raiz='+ $('#txt-carpeta-actual').val();
		console.log(parametros);
		$.ajax({
			url: '/crearCarpeta',
			type: 'POST',
			data:parametros,
			success: function (respuesta) {
				var carpeta="";
					carpeta='<tr>'+
							'<td><a onclick="obtener_SubCarpeta('+respuesta[0].cod_carpeta+')"><i class="fas fa-folder-open"></i> '+respuesta[0].nombre_carpeta+'</a></td>'+
							'<td>'+respuesta[0].fecha_modificacion+'</td>'+
							'<td>'+respuesta[0].fecha_creacion+'</td>'+
							'<td></td></tr>';	 
					$('#tbl-dropbox tbody').append(carpeta);
					$('#modal-carpeta').modal('hide');
			}
		});
}

function crearArchivo(id){
	$('#tbl-dropbox').show();
	var logoImg = $('input[name="image"]').get(0).files[0];
	var filedata = $('input[name="image"]').prop('files')[0];
	var formData = new FormData();
	formData.append("archivo", filedata);
	formData.append("carpeta", id);
	formData.append('raiz',$('#txt-carpeta-actual').val());
	$.ajax({
		url:'/upload',
		method:'POST',
		cache: false,
        contentType: false,
        processData: false,
		data:formData,
		success:function(respuesta){
			console.log(respuesta);
			var archivo="";
					var tipo=respuesta[0].tipo;
					if(tipo=='jpg' || tipo=='jpge'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[0].cod_archivo+')"><i class="far fa-image"></i> '+respuesta[0].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].tamaño+'KB</td></tr>';
					}else if(tipo=='docx' || tipo=='txt'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[0].cod_archivo+')"><i class="far fa-file-word"></i>'+respuesta[0].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].tamaño+'KB</td></tr>';
					}else if(tipo=='pdf'){
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[0].cod_archivo+')"><i class="far fa-file-pdf"></i>'+respuesta[0].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].tamaño+'KB</td></tr>';
					}else{
						archivo='<tr>'+
								'<td><a onclick="obtenerDetalles('+respuesta[0].cod_archivo+')"><i class="far fa-file"></i>'+respuesta[0].nombre_archivo+'</a></td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].fecha_modificacion+'</td>'+
								'<td>'+respuesta[0].tamaño+'KB</td></tr>';
					}
					
					console.log(archivo);
					$('#tbl-dropbox tbody').append(archivo);
					$('#modal-archivo').modal('hide');
		}
	});
}

function Validar(){
    var estado=0;
    estado+=validarCamposVacios('#modal-login #txt-user');
    estado+=validarCamposVacios('#modal-login #txt-pass');
    return estado;
}

function removerValidaciones(){
	$('#modal-login #txt-user').removeClass('is-valid');
	$('#modal-login #txt-user').removeClass('is-invalid');
	$('#modal-login #txt-user').val("");
	$('#modal-login #txt-pass').removeClass('is-valid');
	$('#modal-login #txt-pass').removeClass('is-invalid');
	$('#modal-login #txt-pass').val("");
}

function validarCamposVacios(id){
    if($(id).val()==""){
        $(id).removeClass('is-valid');
        $(id).addClass('is-invalid');
        return 1;
    }else{
        $(id).removeClass('is-invalid');
        $(id).addClass('is-valid');
        return 0;
    }
}


function detalleRegistro(tag1,tag2,tag3,tag4){
	$("#modal-detalle").modal("show");
	$('#detallesArchivo').html('<tr><td>'+tag1+'</td><td>'+tag2+'</td><td>'+tag3+'</td><td>'+tag4+'</td></tr>');
}

function logout(){
	$.ajax({
		url:'/cerrar',
		method:'GET',
		success:function(respuesta){
			if(respuesta=='Correcto'){
				$('#navbar-user-section').html("");
				$('#btn-sign').show();
				$('#tbl-dropbox tbody').html("");
				$('#content-dropbox').hide();
			}
		}
	});
}
