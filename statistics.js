function generateGraphs(map) {
	var total = getTotal(map);
	
	var percentages = calculatePercentages(map, total);
	console.log("Percentages: "+percentages);
	
	var output = generateOutput(map, percentages);
	
	console.log(output);
	
	//$("#crimeGraph").text(output);
	document.getElementById("crimeGraph").innerHTML = output;
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
	}
	
	return percentages;
}

function generateOutput(map, percentages){
	var output = "<table width=\"267\" height=\"257\" bgcolor=\"#FFFFFF\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	for(var i = 0; i < percentages.length; i++){
		output += returnTableRow(map, percentages, i);
	}
	output += "</table>";
	
	return output;
}

function returnTableRow(map, percentages, index){
	return "<tr><td class=\"crimeName\">"+map[index].crime+"</td><td><div class=\"bar\" width=\""+percentages[index]+"%\">"+map[index].count+"</div></td></tr>";
}