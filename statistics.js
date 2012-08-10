function generateGraphs(map) {
	console.log("Graphs: "+map);
	console.log("Starting grpahs");
	
	var totalCrimes = 0;
	for(var cat in map){
		console.log("Graphs: "+map[cat].count);
		totalCrimes += map[cat].count;
	}
	console.log("Total Crimes: "+totalCrimes);
}