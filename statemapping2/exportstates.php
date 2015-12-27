
<?php

// Database Connection

$host="localhost";
$uname="root";
$pass="suba sah 16";
$database = "States";	

$connection=mysql_connect($host,$uname,$pass); 

echo mysql_error();

//or die("Database Connection Failed");
$selectdb=mysql_select_db($database) or die("Database could not be selected");	
$result=mysql_select_db($database)
or die("database cannot be selected <br>");

	
// Fetch Record from Database

$output			= "";
$table 			= "state_table"; // Enter Your Table Name
$sql 			= mysql_query("select  *from state_table");
$columns_total 	= mysql_num_fields($sql);

// Get The Field Name

for ($i = 0; $i < $columns_total; $i++) {
	$heading	=	mysql_field_name($sql, $i);
	$output		.= '"'.$heading.'",';
}
$output .="\n";

while ($row = mysql_fetch_array($sql)) {
for ($i = 0; $i < $columns_total; $i++) {
$output .='"'.$row["$i"].'",';
}
$output .="\n";
}

echo $output;
exit;
	
?>
