var database = firebase.database();


function calcuBeevalues() {
    var entries;
    var output;
    
    var timevals = [];
    var degvals = [];
    
    entries = $(".beevalues").val();
    // console.log(entries);
    
    // Splitting entries by line
    entries = entries.split("\n");
    // console.log('split!!!' + entries);
    
    for(i = 0; i<entries.length; i++){
        var bumbum;
        var pewpew;
        bumbum = entries;
        pewpew = bumbum[i].split(" ");
        Number(pewpew[0]);
        Number(pewpew[1]);
        
        degvals.push(pewpew[0])
        timevals.push(pewpew[1])
        
        
        // console.log(pewpew);
    }
    
    console.log("Degree values: " + degvals);
    console.log("Time values: " + timevals);
    
    output = "Degree values: " + degvals + "<br />";
    output += "Time values: " + timevals;
    
    // Time computation
    var timeavg = 0;
    
    for(var i=0; i<timevals.length;i++) {timeavg += parseInt(timevals[i]);}
    timeavg = timeavg / timevals.length;
    
    output += "<br /><br />Average time: " + timeavg;
    
    // Degree computation
    var degavg = 0;
    
    for(var i=0; i<degvals.length;i++) {degavg += parseInt(degvals[i]);}
    degavg = degavg / degvals.length;
    
    output += "<br />Average directional degrees: " + degavg + "<br />";
    
    // Computations for: distance, radius
    var beeradius;
    var beedistance;
    beeradius = ((timeavg*2)) + (timeavg/2);
    beeradius = beeradius * 4;
        //Distance is based on Wenner's formula.
    beedistance = (timeavg*150) - 150;
    
    output += "<br />Est. hive radius: " + beeradius + " meters";
    output += "<br />Est. hive distance: " + beedistance + " meters";
    
    var hivecoords = $('.valueHiveLocation').text();
    //alert(hivecoords);
    console.log(hivecoords);
    hivecoords = hivecoords.split(",");
    //alert(hivecoords);
    
    var tempLat = hivecoords[0];
    var tempLong = hivecoords[1];
    //alert(hivecoords[0], hivecoords[1]);
    
    //Send to output box
    $(".beevaluesoutput").html(output);
    
    //Calculation care of Vicenty's formulae for ellipsoid earth models, given a starting point, bearing, and distance
    
    beedistanceKm = beedistance / 1000;
    //alert(beedistanceKm);
    
    Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
   dist = dist / 6371;  
   brng = brng.toRad();  

   var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

   var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                        Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

   var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                Math.cos(lat1), 
                                Math.cos(dist) - Math.sin(lat1) *
                                Math.sin(lat2));

   if (isNaN(lat2) || isNaN(lon2)) return null;

   return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
}

    console.log(tempLat, tempLong);
    console.log(degavg, beedistanceKm);
    var pointA = new google.maps.LatLng(tempLat, tempLong); 

    var pointB = pointA.destinationPoint(degavg, beedistanceKm)
    
    //console.log(pointA, pointB);

      /*new google.maps.Marker({
         position: pointA,
         map: map
      });*/

      // Show marker at destination point
      new google.maps.Marker({
         position: pointA.destinationPoint(degavg, beedistanceKm),
         map: map,
         icon:'img/markerNewHive.png'
      });
    
      new google.maps.Circle({
          fillColor: 'yellow',
          fillOpacity: 0.5,
          strokeWeight: 0,
          strokeOpacity: 0,
          map: map,
          center: pointA.destinationPoint(degavg, beedistanceKm),
          radius: beeradius
      });
    
}



function saveEntry(){
    var hivetitle = $("input[type=text][name=valueTitle][class=valueTitle]").val();
    var hivestatus = $(".valueStatus").val();
    var hivespecies = $(".valueSpecies").val();
    var hivevisit = $(".valueVisit").val();
    var hivecoords = $(".valueHiveCoords").val().split(",").join(" ");
    var hivedescription = $(".valueDescription").val();
    var hiveradius = $(".valueRadius").val();
    
    console.log(hivetitle);
    console.log(hivestatus);
    console.log(hivecoords);
    console.log("Clicked!");

   writeNew(hivetitle, hivedescription, hivecoords, hiveradius, hivespecies, hivestatus, hivevisit);
    
    
    
}



