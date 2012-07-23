<?php
	$con = mysql_connect("mysql.hostinger.es","u715337862_admin","qwerty123");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

        mysql_select_db("u715337862_coche") or die(mysql_error());

		
	$myQuery = "SELECT * FROM reservas";
	$result = mysql_query($myQuery) or die($myQuery."<br/><br/>".mysql_error());;

	$response = "[";
	while($row = mysql_fetch_array($result))
	{
		//  {"date":"11/22","title":"victor","periodo":"tarde","motivo":"porque me apetece"}
		$response =  $response . "{\"date\":\"" . $row['Fecha'] . "\",\"title\":\"" . $row['Persona'] . "\",\"periodo\":\"" . $row['Periodo'] . "\",\"motivo\":\"" . $row['Motivo'] . "\"}";
		$response =  $response . ",";
	}
	if($response != "[")
		$response = substr($response,0,-1);
	$response =  $response . "]";
	
	echo $response;

	mysql_close($con);
?> 
