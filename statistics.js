function generateGraphs(map) {
	console.log("Graphs: "+map);
	console.log("Starting grpahs");
	
	var total = getTotal(map);
	
	var percentages = calculatePercentages(map, total);
	console.log("Percentages: "+percentages);
}

function getTotal(map){
	var totalCrimes = 0;
	for(var cat in map){
		console.log("Graphs: "+map[cat].count);
		totalCrimes += map[cat].count;
	}
	console.log("Total Crimes: "+totalCrimes);
	
	return totalCrimes;
}

function calculatePercentages(map, total){
	var percentages = new Array(Object.keys(map).length);
	
	for(var i = 0; i < percentages.length; i++){
		var percent = (map[i].count / total) * 100
		percentages[i] = Math.round(percent);
		console.log("percent "+percent);
	}
	
	return percentages;
}