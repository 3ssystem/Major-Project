<?php

/* Include the `fusioncharts.php` file that contains functions  to embed the charts. */

   include("includes/fusioncharts.php");

/* The following 4 code lines contain the database connection information. Alternatively, you can move these code lines to a separate file and include the file here. You can also modify this code based on your database connection. */

   $hostdb = "localhost";  // MySQl host
   $userdb = "root";  // MySQL username
   $passdb = "suba sah 16";  // MySQL password
   $namedb = "resources";  // MySQL database name

   // Establish a connection to the database
   $dbhandle = new mysqli($hostdb, $userdb, $passdb, $namedb);

   /*Render an error message, to avoid abrupt failure, if the database connection parameters are incorrect */
   if ($dbhandle->connect_error) {
    exit("There was an error with your connection: ".$dbhandle->connect_error);
   }
?>

<html>
   <head>
     <title>Cash Crop Index of Districts</title>
    <link  rel="stylesheet" type="text/css" href="css/style.css" />
    <link  rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link  rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link  rel="stylesheet" type="text/css" href="css/bootstrap-theme.css" />

    <!-- You need to include the following JS file to render the chart.
    When you make your own charts, make sure that the path to this JS file is correct.
    Else, you will get JavaScript errors. -->

    <script src="js/fusioncharts.js"></script>
    <script src="js/jquery.min.js"></script>
   <script src="js/bootstrap.min.js"></script>
   </head>

   <body>
   <!-- Split button -->
<div class="container">                                  
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Choose Index
    <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
      <li role="presentation"><a role="menuitem" tabindex="-1" href="index.php">Population</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="cashcrop.php">Cash Crops index</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="cerealcrop.php">Cereal Crop index</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="education.php">Education index</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="health.php">Health index</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="transport.php">Transportation index</a></li>
    </ul>
  </div>
</div>

    <?php

      // Form the SQL query that returns the top 10 most populous countries
      $strQuery = "SELECT district_name,cashcrop_index FROM `cashcrop_chloropleth2`";

      // Execute the query, or else return the error message.
      $result = $dbhandle->query($strQuery) or exit("Error code ({$dbhandle->errno}): {$dbhandle->error}");

      // If the query returns a valid response, prepare the JSON string
      if ($result) {
          // The `$arrData` array holds the chart attributes and data
          $arrData = array(
              "chart" => array(
                  "caption" => "Cash Crop Index of Districts",
                  "paletteColors" => "#0075c2",
                  "bgColor" => "#ffffff",
                  "borderAlpha"=> "20",
                  "canvasBorderAlpha"=> "0",
                  "usePlotGradientColor"=> "0",
                  "plotBorderAlpha"=> "10",
                  "showXAxisLine"=> "1",
                  "xAxisLineColor" => "#999999",
                  "showValues" => "0",
                  "divlineColor" => "#999999",
                  "divLineIsDashed" => "1",
                  "showAlternateHGridColor" => "0"
                )
            );

          $arrData["data"] = array();

  // Push the data into the array
          while($row = mysqli_fetch_array($result)) {
            array_push($arrData["data"], array(
                "label" => $row["district_name"], 
                "value" =>$row["cashcrop_index"],
               
                )
            );
          }

          /*JSON Encode the data to retrieve the string containing the JSON representation of the data in the array. */

          $jsonEncodedData = json_encode($arrData);

  /*Create an object for the column chart using the FusionCharts PHP class constructor. Syntax for the constructor is ` FusionCharts("type of chart", "unique chart id", width of the chart, height of the chart, "div id to render the chart", "data format", "data source")`. Because we are using JSON data to render the chart, the data format will be `json`. The variable `$jsonEncodeData` holds all the JSON data for the chart, and will be passed as the value for the data source parameter of the constructor.*/

          $columnChart1 = new FusionCharts("Column3D", "myFirstChart1" , 1000, 500, "chart-1", "json", $jsonEncodedData);
          $columnChart2= new FusionCharts("Pie3D", "myFirstChart2" , 1000, 500, "chart-2", "json", $jsonEncodedData);
          $columnChart3= new FusionCharts("line", "myFirstChart3" , 1000, 500, "chart-3", "json", $jsonEncodedData);
          $columnChart4= new FusionCharts("area2D", "myFirstChart4" , 1000, 500, "chart-4", "json", $jsonEncodedData);
          // Render the chart
          $columnChart1->render();
          $columnChart2->render();
          $columnChart3->render();
          $columnChart4->render();


          // Close the database connection
          $dbhandle->close();
      }

    ?>
    <div id="chart-1"><!-- Fusion Charts will render here--></div>
    <div id="chart-2"><!-- Fusion Charts will render here--></div>
    <div id="chart-3"><!-- Fusion Charts will render here--></div>
    <div id="chart-4"><!-- Fusion Charts will render here--></div>

   </body>

</html>
