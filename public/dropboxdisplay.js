  var dbx = new Dropbox({ accessToken: 'e4wEtC_gejAAAAAAAAADhchAKRvG_HSge4NpS2iF0XeaR17_H10v5X0JYvFmnTVj' });
  dbx.filesListFolder({path: ''})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });


// For text file


dbx.filesDownload({path: '/Beecon/beebtest/coordLog.txt'})
    .then(function (response) {
        var blob = response.fileBlob;
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
            console.log(reader.result); // will print out file content
            //$(".dbtextstorage").html(reader.result);
        $(".valueHiveLocation").html(reader.result);
            var tempCoord;
            tempCoord = reader.result;
        });
        reader.readAsText(blob);
        
    })
    .catch(function (error) {
        console.log("Error reading file to console");
    });



/*
for (i = 0;i < 4;i++){
    dbx.filesGetThumbnail({"path": "/Beecon/beebtest/" + i + ".jpg"})
  .then(function(response) {
    var img = document.createElement('img');
    img.src=window.URL.createObjectURL(response.fileBlob);
    $(".dbstorage").append(img);
  })
  .catch(function(error) {
    console.log("got error:");
    console.log(error);
  });
}
*/

for (i = 0;i < 4;i++){
    dbx.filesGetThumbnail({"path": "/Beecon/beebtest/" + i + ".jpg", size: "w640h480"})
  .then(function(response) {
    var img = document.createElement('img');
    img.src=window.URL.createObjectURL(response.fileBlob);
    $(".dbstorage").append(img);
  })
  .catch(function(error) {
    console.log("got error:");
    console.log(error);
  });
}

/*
dbx.filesListFolder({path: "/Beecon/beebtest/"})
	.then(function(response) {
		response.entries.forEach( (file) => {
			dbx.filesGetThumbnail({path: file.path_display, size: 'w640h480'})
            var img = document.createElement('img');
			$(".dbstorage").append(img);


*/