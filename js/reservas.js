function procesarReserva()
{
	$.post('nuevareserva.php', {
			"periodo": $("input[name='periodo']:checked").val(),
			"motivo": $('#txtaMot').val(),
			"fecha" : $('#fecha').val(),
			"persona": $('#persona').val()
			}, function(data){
				if(data == "OK"){
					$('.nuevaReserva').animate({
						opacity:0
					}, 500, 'swing')
					.css({
						display: 'none'
					});
					ui.renderCalendar();
					alert("Se ha reservado correctamente");
				}
				else
					alert("ERROR: " + data);
			});
	return false;
}
