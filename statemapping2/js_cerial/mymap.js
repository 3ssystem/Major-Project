
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
 
d3.csv("export2csv_cerial.php", function(data) {
	
   color.domain([

           d3.min(data, function(d) { return d.cerial_index;}),
           d3.max(data, function(d) { return d.cerial_index; })

   ]);
   
   



   d3.json("datacerial/nepal-districts.topo.json", function(error, nepal) 
   
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
		  
//State 2: Saptari, Siraha, Dhanusha, Mahottari, 
//Sarlahi, Rautahat, Bara and Parsa

        var dataDistrict = data[i].district_name
                                  .toLowerCase()
                                  .replace(/^\s+|\s+$/g, "");
                                  
        var cerial_index = parseFloat(data[i].cerial_index);
        var paddy_prod =  parseFloat(data[i].paddy_prod);
        var wheat_prod =  parseFloat(data[i].wheat_prod);
        var maze_prod =  parseFloat(data[i].maze_prod);
//  console.log("Hello:-" +data[i].e_index);


              for (var j = 0; j < districts.features.length; j++) {

                var jsonDistrict = districts.features[j].properties.name
                                            .toLowerCase()
                                            .replace(/^\s+|\s+$/g, "");



                      if (dataDistrict == jsonDistrict) {
						       
						      districts.features[j].properties.cerial_index = cerial_index;
						      
                              districts.features[j].properties.paddy_prod = paddy_prod;
                              districts.features[j].properties.wheat_prod = wheat_prod;
                              districts.features[j].properties.maze_prod = maze_prod;
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

            var value = d.properties.cerial_index;

   console.log("values:-"+value);
      
            if (value >=0 && value <=0.15 ) {

                  //console.log("Returning color valules"+color(value));

                    //return "#fff5eb";

                    return"#ffffd4"
            }
         else if (value >0.15 && value <=0.30 ) {

               //            return "#fee6ce" ;

                     return "#fee391" ;
            }
        else  if (value >0.30 && value <=0.45 ) {
			   //return "#fdae6b" ;
               return "#fec44f" ;

            }
		else if(value>0.45&&value<=0.5)
			{

                //return"#a63603"
                return "#fe9929";
	
				}
           

            else if(value>0.5&&value<=0.65) {

       //console.log("Returning #ddd"+value);
                    return "#ec7014";
            }
else if(value>0.65&&value<=0.8) {

       //console.log("Returning #ddd"+value);
                    return "#cc4c02";
            }
            else  {

       //console.log("Returning #ddd"+value);
                    return "#8c2d04";
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
             .text("Paddy_prod:   " + d.properties.paddy_prod + " Ota");
          d3.select("#tooltip #secondary")
             .text("Wheat_prod:   " + d.properties.wheat_prod + "khai");
             
          d3.select("#tooltip #primary")
             .text("no_of_EPI_clinic:   " + d.properties.maze_prod+ " Ota");
             

           d3.select("#tooltip #population")
             .text("Health index: " + ((d.properties.cerial_index)).toFixed(2));




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
