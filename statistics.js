function generateGraphs(map) {
	console.log("Graphs: "+map);
	console.log("Starting grpahs");
	
	alert(map[0]);
	
	var totalCrimes = 0;
	for(var cat in map){
		console.log("Graphs: "+cat+"   "+cat.count);
		totalCrimes += cat.count;
	}
	console.log("Total Crimes: "+totalCrimes);
}