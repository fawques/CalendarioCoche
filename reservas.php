<?php
$con = mysql_connect("localhost","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

	
$myQuery = "SELECT * FROM coche.reservas";
$result = mysql_query($myQuery) or die($myQuery."<br/><br/>".mysql_error());;


while($row = mysql_fetch_array($result))
  {
  echo $row['Fecha'] . " " . $row['Periodo'] . " - " . $row['Persona'] . " - " . $row['Motivo'];
  echo "<br />";
  }

mysql_close($con);
?> 
