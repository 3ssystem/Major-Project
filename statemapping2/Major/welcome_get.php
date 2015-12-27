<?php
   $dbhost = 'localhost';
   $dbuser = 'root';
   $dbpass = 'suba sah 16';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   
   if(! $conn )
   {
      die('Could not connect: ' . mysql_error());
   }

    $state_no = $_GET["name"];
    echo $state_no;
   //$sql = 'INSERT INTO states '.
     // '(numbers) '.
      //'VALUES ('{$state_no}')';
      
   mysql_select_db('no_of_states');
   $retval = mysql_query("INSERT INTO states (numbers) VALUES ('{$state_no}')", $conn );
   
   if(! $retval )
   {
      die('Could not enter data: ' . mysql_error());
   }
   
   echo "Entered data successfully\n";
   
   mysql_close($conn);
    
   
?>


