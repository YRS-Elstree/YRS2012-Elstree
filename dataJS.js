function startDataStuff(position){	
	var date = lastUpdated();
	console.log(date);
	
	var url = "/api/crimes-street/all-crime?date="+date+"&lat="+position.coords.latitude+"&lng="+position.coords.longitude;
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

	mostCrimes(data, map);
	leastCrimes(data, map);
	
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
	$("#number").text(countArrests);
}

function mostCrimes(data, map){
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
	$("#frequent").text(highestValue);
}

function lastUpdated(){
		var url = "/api/crime-last-updated";
		$.ajax(url, {
			username: "ficah53",
			password: "5d5faaa7ba76287f305755bbfe626dc7",
			dataType: "json",
			success:
				function (data, status){
					console.log(data.date);
						var date = new Date(data.date);
						var monthNames = [ "January", "February", "March", "April", "May", "June",
						    "July", "August", "September", "October", "November", "December" ];
							var monthName = monthNames[date.getMonth()];
						$("#crimemonth").text(monthName);
						var returnString = date.substring(0, 7);
						console.log("Date: "+returnString);
						return returnString;
				},
		});

}

function isGuilty(crimeOutcome){
	var guilties = ["awaiting-court-result", "unable-to-proceed", "deprived-of-property", "fined", "cautioned", "penalty-notice-issued", "community-penalty", "conditional-discharge", "suspended-sentence", "imprisoned", "other-court-disposal", "compensation", "charged", "sent-to-crown-court", "Offender given a caution", "Awaiting court outcome"];
	
	if(jQuery.inArray(crimeOutcome, guilties) != -1){
		return true;
	}else{
		return false;
	}
}

function leastCrimes(data, map){;	
	var lowestValue;
	
	for(var crime in map){
			if(lowestValue == undefined || lowestValue == null){
				lowestValue = crime;
			}else{
				if(map[crime] < map[lowestValue]){
					lowestValue = crime;
				}
			}
			console.log(lowestValue);
	}
	$("#rare").text(lowestValue);
}