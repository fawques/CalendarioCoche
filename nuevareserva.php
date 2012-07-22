<?php
	
$con = mysql_connect("mysql.hostinger.es","u715337862_admin","qwerty123");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

        $datos = $_POST;
		
        mysql_select_db("u715337862_coche") or die(mysql_error());	$datos = $_POST;
		
	$myQuery = "INSERT INTO  reservas (`Fecha`, `Periodo`, `Persona`, `Motivo`) VALUES ('" . $datos['fecha'] . "','" . $datos['periodo'] . "','" . $datos['persona'] . "','" . $datos['motivo'] . "')";
	$result = mysql_query($myQuery) or die($myQuery."<br/><br/>".mysql_error());

	/*$response = $datos['fecha'] . "','" . $datos['periodo'] . "','" . $datos['persona'] . "','" . $datos['motivo'];*/
	$response = 'OK'; 
	echo $response;

	mysql_close($con);
?>