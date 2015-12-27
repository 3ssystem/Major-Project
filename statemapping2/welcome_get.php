<?php
   $dbhost = 'localhost';
   $dbuser = 'root';
   $dbpass = 'suba sah 16';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   if(! $conn )
   {
      die('Could not connect: ' . mysql_error());
   }
 mysql_select_db('no_of_states');
 
   
   $count = mysql_query("select count(*) from states", $conn );
   
			if($count>0 )
				{

					$retval = mysql_query("TRUNCATE TABLE states", $conn );
					echo "Truncated table is states";
					}

   
					$state_no = $_GET["name"];
					$retval = mysql_query("INSERT INTO states (numbers) VALUES ('{$state_no}')", $conn );
   if(! $retval )
   {
      die('Could not enter data: ' . mysql_error());
   }

echo "Entered data successfully\n";

mysql_close($conn);
    
   
?>


