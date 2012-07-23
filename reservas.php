<?php
	$con = mysql_connect("localhost","root");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

		
	$myQuery = "SELECT * FROM coche.reservas";
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
