function startDataStuff(position){	
	var url = "/api/crimes-street/all-crime?date=2012-06&lat="+position.coords.latitude+"&lng="+position.coords.longitude;
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
	
	console.log("Map pre sorting:");
	
	for(var crime in map){
		console.log(crime+"  "+map[crime]);
	}

	countCrimes(data, map);
	
	// Count arrests
	var countArrests = 0;
	
	jQuery.each(data, function(index, crime){
		var outcome = crime.outcome_status["category"];
		console.log(outcome);
		if(isGuilty(outcome)){
			countArrests++;
		}
	});
	console.log(countArrests);
}

function countCrimes(data, map){
	var length = Object.keys(data).length;
	console.log("Length of map: "+length);
	$("#crimecount").text(length);
	
	var highestValue;
	
	for(var crime in map){
			if(highestValue == undefined || highestValue == null){
				highestValue = crime;
			}else{
				if(map[crime] > map[highestValue]){
					highestValue = crime;
				}
			}
			console.log(highestValue);
	}
}

function isGuilty(crimeOutcome){
	var guilties = ["awaiting-court-result", "unable-to-proceed", "deprived-of-property", "fined", "cautioned", "penalty-notice-issued", "community-penalty", "conditional-discharge", "suspended-sentence", "imprisoned", "other-court-disposal", "compensation", "charged", "sent-to-crown-court"];
	
	if(jQuery.inArray(crimeOutcome, guilties) != -1){
		return true;
	}else{
		return false;
	}
}