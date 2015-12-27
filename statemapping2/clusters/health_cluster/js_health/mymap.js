
var width = 960,
     height = 500;


var projection = d3.geo.albers()
                    .center([87, 28])
                    .rotate([-85, 0])
                    .parallels([27, 32]);


var path = d3.geo.path()
              .projection(projection);


var color = d3.scale.quantize()
               .range(["#f7fcf5",
"#e5f5e0",
"#c7e9c0",
"#a1d99b",
"#74c476",
"#41ab5d",
"#238b45",
"#006d2c",
"#00441b"]);
  
var svg = d3.select("body")
             .append("svg")
             .attr("width", width)
             .attr("height", height);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");
 
d3.csv("export2csv.php", function(data) {
	
   
   



   d3.json("datahealth/nepal-districts.topo.json", function(error, nepal) 
   
   {
    
     if(error) return console.error(error);

     var districts = topojson.feature(nepal, nepal.objects.districts);

     projection
       .scale(1)
       .translate([0, 0]);

     var b = path.bounds(districts),

         s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
         t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

     projection
       .scale(s)
       .translate(t);
for (var i = 0; i < data.length; i++) 
      {
		  
        var dataDistrict = data[i].district_name
                                  .toLowerCase()
                                  .replace(/^\s+|\s+$/g, "");
                                  
      //  var health_index = parseFloat(data[i].health_index);
       // var no_of_PHCC =  parseFloat(data[i].no_of_PHCC);
        //var no_of_healthpost =  parseFloat(data[i].no_of_healthpost);
        //var no_of_EPI_clinic =  parseFloat(data[i].no_of_EPI_clinic);
        var cluster_no =  data[i].cluster_no;
        var district_name =  data[i].district_name;



              for (var j = 0; j < districts.features.length; j++) {

                var jsonDistrict = districts.features[j].properties.name
                                            .toLowerCase()
                                            .replace(/^\s+|\s+$/g, "");



                      if (dataDistrict == jsonDistrict) {
						   //   districts.features[j].properties.health_index = health_index;    
                             // districts.features[j].properties.no_of_PHCC = no_of_PHCC;
                              //districts.features[j].properties.no_of_healthpost = no_of_healthpost;
                              //districts.features[j].properties.no_of_EPI_clinic = no_of_EPI_clinic;
                              districts.features[j].properties.district_name = district_name;
                              districts.features[j].properties.cluster_no = cluster_no;
                              break;

                      }
              }
      }


     g.selectAll(".districts")
      .data(districts.features)
      .enter()
      .append("path")
      .attr("class", function(d) { return "districts"; })
      .attr("d", path)
      .style("fill", function(d) 
            {

            var value = d.properties.health_index;
            var district_name = d.properties.district_name;
            var cluster_no = d.properties.cluster_no;
            
			console.log("cluster_no:"+cluster_no);
			
			if(cluster_no =="1"){

				return "#2ca25f";
					

				}
      
			if(cluster_no =="2"){

				return "#a63603";
			
				}
      
			if(cluster_no =="3"){

				
				return "#756bb1";

				}
			if(cluster_no =="4"){


				return "#de2d26";
				
				}
      
			if(cluster_no =="5"){

				return "#fec44f";

				}
			if(cluster_no =="6"){

				return "#2c7fb8 ";

				}
			
      
            
            
            
       })
      .on("mouseover", function(d) {
            
                 //document.write("this is mouse");
           var xPosition = parseFloat(event.pageX+30);
           var yPosition = parseFloat(event.pageY-20);

           d3.select("#tooltip")
             .style("left", xPosition + "px")
             .style("top", yPosition + "px");

           d3.select("#tooltip #heading")
             .text(d.properties.name.toLowerCase());
             
           d3.select("#tooltip #area")
             .text("Cluster No.: " + d.properties.cluster_no );
          //d3.select("#tooltip #secondary")
            // .text("No.of healpost:   " + d.properties.no_of_heathpost + " Ota");
             
          //d3.select("#tooltip #primary")
            // .text("no_of_EPI_clinic:   " + d.properties.no_of_EPI_clinic+ " Ota");
             

           //d3.select("#tooltip #population")
             //.text("Health index: " + ((d.properties.health_index)).toFixed(2));




           d3.select("#tooltip").classed("hidden", false);

           d3.select(this.parentNode.appendChild(this))
             .style({'stroke-width':1,'stroke':'#333','stroke-linejoin':'round',
                     'stroke-linecap': 'round', 'cursor':'pointer'});
       })
       .on("mouseout", function() {

            d3.select("#tooltip").classed("hidden", true);

            d3.select(this.parentNode.appendChild(this))
           .style({'stroke-width':1,'stroke':'#FFFFFF','stroke-linejoin':'round', 'stroke-linecap': 'round' });
       });


      g.append("path")
       .datum(topojson.mesh(nepal, nepal.objects.districts, function(a, b) { return a !== b;}))
       .attr("class", "district-boundary")
       .attr("d", path);
    });
 });
