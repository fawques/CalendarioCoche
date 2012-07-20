<?php
	$nombre = $_POST["nombre"];
	$password = $_POST["pass"];
	
	$con = mysql_connect("mysql.hostinger.es","u715337862_admin","qwerty123");
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

		
	$myQuery = "SELECT * FROM personas WHERE nombre='" . $nombre . "' AND contra='" . $password . "'";
        mysql_select_db("u715337862_coche") or die(mysql_error());

	$result = mysql_query($myQuery) or die($myQuery."<br/><br/>".mysql_error());;


	if($row = mysql_fetch_array($result))
		echo "OK";
	else
		echo "WRONG";

	mysql_close($con);
?>
