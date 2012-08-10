function generateGraphs(map){
	var totalCrimes = 0;
	for(cat in map){
		console.log("Graphs: "+cat+"   "+cat.count);
		totalCrimes += cat.count;
	}
	console.log("Total Crimes: "+totalCrimes);
}