$(document).ready(function() {

	$.ajax({
		url: './Ajax/amigos.php',
		type: 'POST',
		data: {user: $("#slc-usuario").val()},
		success: function (argument) {
			
			$('#amigos').html(argument);
			$('#allmensajes').fadeOut( function() {
				$('#conversacion').fadeIn();
			});
		}
	});

	$("#slc-usuario").change(function(){
		$.ajax({
			url: './Ajax/amigos.php',
			type: 'POST',
			data: {user: $("#slc-usuario").val()},
			success: function (argument) {
				$('#conversacion').fadeIn();
				$('#amigos').html(argument);
				$('#allmensajes').fadeOut();	
			}
		});
	});

	$("#btn-enviar").click(function() {
		$.ajax({
			url: './Ajax/enviarMensaje.php',
			type: 'POST',
			data: {mensaje:  $("#txta-mensaje").val(),
				   user: $("#slc-usuario").val(),
				   receptor: $('.heading-name-meta').val() },
			success: function (argument) {
				$('#conversation').html(argument);
				$("#txta-mensaje").val("");
			}
		});	
	});

setInterval(
function chat(){
	$.ajax({
		url: './Ajax/mostrarChat.php',
		type: 'POST',
		data: {user:$("#slc-usuario").val(),
			   chat:$('.heading-name-meta').val()},
		success:function (argument) {
			$('#conversation').html(argument);
		}
	});
	
},1000);

});

function mostrarPanelChat(amigo) {
	$('#conversacion').fadeOut(function(){
		$('#allmensajes').fadeIn();
		$('.heading-name-meta').html(amigo);
		$('.heading-name-meta').val(amigo);
	});		
}

