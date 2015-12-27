<?php

// Database Connection

$host="localhost";
$uname="root";
$pass="suba sah 16";
$database = "dwithcluster";	

$connection=mysql_connect($host,$uname,$pass); 
echo mysql_error();
$selectdb=mysql_select_db($database) or die("Database could not be selected");	
$result=mysql_select_db($database)
or die("database cannot be selected <br>");

$output			= "";
$table 			= "transportation_cluster"; // Enter Your Table Name
$sql 			= mysql_query("select  *from transportation_cluster");
$columns_total 	= mysql_num_fields($sql);

// Get The Field Name

for ($i = 0; $i < $columns_total; $i++) {
	$heading	=	mysql_field_name($sql, $i);
	$output		.= '"'.$heading.'",';
}
$output .="\n";

// Get Records from the table

while ($row = mysql_fetch_array($sql)) {
for ($i = 0; $i < $columns_total; $i++) {
$output .='"'.$row["$i"].'",';
}
$output .="\n";
}


echo $output;
exit;
	
?>
