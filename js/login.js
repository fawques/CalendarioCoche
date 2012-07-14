function login(){
	nombre = $("#nombre").val();
	pass = $("#pass").val();
	$.post('login.php', {
			"nombre": nombre,
			"pass": pass
			}, function(data){
				if(data == "OK"){
					$(".login").hide("slow");
					logged = true;
				}
				else
					$(".error").show();
			});
	return false;
}
