function startDataStuff(){	
	//var url = "http://policeapi2.rkh.co.uk/api/crimes-street/all-crime?date=2012-06&lat=51.6448352&lng=-0.2980985"
	var url = "http://yrs.time4tea.net/sample-data/crimes-elstree-2012-06.json";
	$.ajax(url, {
		username: "ficah53",
		password: "5d5faaa7ba76287f305755bbfe626dc7",
		dataType: "json",
		success:
			function (data, status){
				console.log(data);
				dealWithTheData(data);
			},
	});
}
	
function dealWithTheData(data) {
	var map = {
		
	};
	var counter = 0;
	jQuery.each(data, function(index, crime){
		var category = crime.category;
		if(category in map){
			map[category]++;
		}else{
			map[category] = 1;
		}
	});
	
	console.log("Map pre sorting"+map);

	countCrimes(data);
}

function countCrimes(data){
	var length = Object.keys(data).length;
	console.log("Length of map: "+length);
	$("#crimecount").text(length);
}