function generateGraphs(map){
	var totalCrimes = 0;
	for(cat in map){
		totalCrimes += cat.count;
	}
	console.log("Total Crimes: "+totalCrimes);
}