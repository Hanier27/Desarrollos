$(document).ready(function(){
	console.log("El DOM ha sido cargado");
	console.log("Carpeta actual: " + $("#txt-carpeta-actual").val());

	$.ajax({
		url: './Ajax/obtenerInformacion.php',
		type: 'POST',
		data: 'Carpeta='+ $('#txt-carpeta-actual').val(),
		success: function (respuesta) {
			$('#archivos').html(respuesta);
		}
	});
	
	$('#crearCarpeta').click(function() {
		var parametros= 'nombre='+ $('#txt-nombreCarpeta').val()+
				  '&fechaCreacion='+ $('#txt-fechaCreacion').val()+
				  '&fechaModificacion='+ $('#txt-fechaModificacion').val()+
				  '&usuario='+ $('#txt-usuario').val()+
				  '&tamaño='+ $('#txt-tamaño').val()+
				  '&raiz='+ $('#txt-carpeta-actual').val(); 
		$.ajax({
			url: './Ajax/crearCarpeta.php',
			type: 'POST',
			data: parametros,
			success: function (respuesta) {
				if(respuesta=="Correctamente"){
					window.location.href = "index.php?carpeta="+$('#txt-carpeta-actual').val();
				}
			}
		});
	});

	$('#crearArchivo').click(function() {
		var parametros= 'nombre='+ $('#txt-arc_nombre').val()+
				  '&fechaCreacion='+ $('#txt-arc_fechaCreacion').val()+
				  '&fechaModificacion='+ $('#txt-arc_fechaModificacion').val()+
				  '&usuario='+ $('#txt-arc_usuario').val()+
				  '&tamaño='+ $('#txt-arc_tamaño').val()+
				  '&raiz='+ $('#txt-carpeta-actual').val(); 
		$.ajax({
			url: './Ajax/crearArchivo.php',
			type: 'POST',
			data: parametros,
			success: function (respuesta) {
				if(respuesta=="Correctamente"){
					window.location.href = "index.php?carpeta="+$('#txt-carpeta-actual').val();
				}
			}
		});
	});


});

function detalleRegistro(tag1,tag2,tag3,tag4){
	$("#modal-detalle").modal("show");
	$('#detallesArchivo').html('<tr><td>'+tag1+'</td><td>'+tag2+'</td><td>'+tag3+'</td><td>'+tag4+'</td></tr>');
}
