var crimeToEnglish = {};

function callPoliceApi(url, success) {
    $.ajax(url, {
        username:"ficah53",
        password:"5d5faaa7ba76287f305755bbfe626dc7",
        dataType:"json",
        success:success,
		xhrFirelds: {
			withCredentials: true
		}
    });
}

function retrieveCrimesForPosition(coords, success) {
    var date = lastUpdated();
    console.log(date);
	
	var englishUrl = "/api/crime-categories?date="+date;
    callPoliceApi(englishUrl, function(data, status){
		crimeToEnglish = data;
		
		var url = "/api/crimes-street/all-crime?date=" + date + "&lat=" + coords.latitude + "&lng=" + coords.longitude;
		callPoliceApi(url, success);
	});
}

function countCrimes(data) {
    var map = {

    };
    jQuery.each(data, function (index, crime) {
        var category = crime.category;
        if (category in map) {
            map[category]++;
        } else {
            map[category] = 1;
        }
    });
    return map;
}

function dataReceivedForIndexPage(data) {
    var map = countCrimes(data);

	mostCrimes(data, map);
	leastCrimes(data, map);
	
	countArrests(data);
	
	// Order crimes based on frequency
	var sortedMap = orderCrimes(map);
	
	return sortedMap;
}

function mostCrimes(data, map){
	var length = Object.keys(data).length;
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
	}
	$("#frequent").text(crimeName(highestValue));
}

function countArrests(data){
	var countArrests = 0;
	
	jQuery.each(data, function(index, crime){
		var outcome = crime.outcome_status["category"];
		if(isGuilty(outcome)){
			countArrests++;
		}
	});
	$("#number").text(countArrests);
}

function lastUpdated() {
    var returnString;
    callPoliceApi("/api/crime-last-updated", function (data, status) {
        var date = new Date(data.date);
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var monthName = monthNames[date.getMonth()];
        $(".data-crimemonth").text(monthName);
        returnString = data.date.substring(0, 7);
    });
    return returnString;
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
	}
	$("#rare").text(crimeName(lowestValue));
}

function crimeName(crimeID){
	var name;
	
	jQuery.each(crimeToEnglish, function(index, lookup){
		if(lookup["url"] == crimeID){
			name = lookup["name"];
			return;
		}
	});
	
	return name;
}

function orderCrimes(map){
	var sortedData = [];
	var length = Object.keys(map).length;
	
	while(true){
		var highestValue;
		for(var crime in map){
			if(highestValue == undefined || highestValue == null){
				highestValue = crime;
			}else{
				if(map[crime] > map[highestValue]){
					highestValue = crime;
				}
			}
		}
		sortedData.push({"crime": crimeName(highestValue), "count": map[highestValue]});	
		delete map[highestValue];
		highestValue = undefined;
		
		
		if(sortedData.length == length){
			break;
		}
	}
	return sortedData;
}