  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCF-GmOM-NL9Yq_nEvq8brR-gUEY_ANvNI",
    authDomain: "beecon-12917.firebaseapp.com",
    databaseURL: "https://beecon-12917.firebaseio.com/",
    projectId: "beecon-12917",
    storageBucket: "beecon-12917.appspot.com",
    messagingSenderId: "1088038959676"
};


firebase.initializeApp(config);

var database = firebase.database();

//pid = Post ID

/* 
Data structure of the entries simply revolve around name, body, coordinate (will be split for input into Google Maps), then conditions for species and status. This is fetched by Google Maps and also overlayed over the map via modals.
*/

/* Add vegetation and plants in the proximity */

/* Loop iteration sampling */
//console.log(object.title);
//console.log(object.arraysample);

function writeCoord(coord){
    
    var postData = {
        coord: coord
    };
    
    var newPostKey = firebase.database().ref().child('coords').push().key;
    
    var updates = {};
    updates['/coords/' + newPostKey] = postData;
    
    return firebase.database().ref().update(updates);
    
}

function writeNew(name, body, whereCoord, whereRadius, species, status, lastvisit){
    
    var postData = {
        title: name,
        body: body,
        whereCoord: whereCoord,
        radius: whereRadius,
        species: species,
        status: status,
        lastvisit: lastvisit
    };
    
    var newPostKey = firebase.database().ref().child('entries').push().key;
    
    var updates = {};
    updates['/entries/' + newPostKey] = postData;
    
    return firebase.database().ref().update(updates);
    
   // writeNewPost("pease");
    //writeNewPost(postData.name, postData.body, postData.whereCoord, postData.species, postData.status);
}

displayDatabase();

function displayDatabase(){
    var EntriesRef = database.ref('entries');
    EntriesRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            //console.log(childData.body);
            writeNewPost(childData.title, childData.body, childData.whereCoord, childData.radius, childData.species, childData.status, childData.lastvisit);
          //console.log(childData.title);
        });
    });
    
    EntriesRef.on('child_added', function(snapshot) {
    });
    
}



function writeNewPost(title, body, whereCoord, whereRadius, species, status, lastvisit){
    
    //var pid =  pushedPostRef.getKey();

    var addhtml = 
        '<div class="database-entry id-' + title + '">' +
            '<h2>Entry: ' + title + '</h2>' +
            '<p>' + body + '</p>' +
            '<div class="database-entry-coords database-property">' + whereCoord + '</div>' +
            '<div class="database-entry-coords database-property">' + whereRadius + ' radius</div>' +
            '<div class="database-entry-species database-property">' + species + '</div>' +
            '<div class="database-entry-status database-property">' + status + '</div>' +
            '<div class="database-entry-visit database-property">' + lastvisit + '</div>' +
        
        '</div>';
    
        var feedhtml = 
        '<div class="feed-entry id-' + title + '">' +
            '<h2>Entry: ' + title + '</h2>' +
            '<p>' + body + '</p>' +
            '<div class="database-entry-coords database-property">' + whereCoord + '</div>' +
            '<div class="database-entry-coords database-property">' + whereRadius + ' radius</div>' +
            '<div class="database-entry-species database-property">' + species + '</div>' +
            '<div class="database-entry-status database-property">' + status + '</div>' +
            '<div class="database-entry-visit database-property">' + lastvisit + '</div>' +
        
        '</div>';
    
    //var div = document.createElement('div');
    //div.innerHTML = html;
    
    $(".database").append(addhtml);
    $(".downfeed").append(feedhtml);
    
};




/* Entry testing */

//writeNew("yo", "dgasdg", "3424", "214")

//writeNew("Bee hive near urban area", "I located a bee hive near the school gardens. Its thriving and nested in the branches of a tree.", "122.42424 42.84284");

//writeNew("Hive found", "There is a hive somewher", "495346 346346");
