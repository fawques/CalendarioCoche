<?php
	$nombre = $_POST["nombre"];
	$password = $_POST["pass"];
	
	$con = mysql_connect("localhost","root");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

		
	$myQuery = "SELECT * FROM coche.personas WHERE nombre='" . $nombre . "' AND contra='" . $password . "'";
	$result = mysql_query($myQuery) or die($myQuery."<br/><br/>".mysql_error());;


	if($row = mysql_fetch_array($result))
		echo "OK";
	else
		echo "WRONG";

	mysql_close($con);
?>
