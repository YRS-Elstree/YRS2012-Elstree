var crimeToEnglish = {};

function callPoliceApi(url, success) {
    $.ajax(url, {
        username:"ficah53",
        password:"5d5faaa7ba76287f305755bbfe626dc7",
        dataType:"json",
        success:success
    });
}

function retrieveCrimesForPosition(coords, success) {
    var date = lastUpdated();
    console.log(date);

    var url = "/api/crimes-street/all-crime?date=" + date + "&lat=" + coords.latitude + "&lng=" + coords.longitude;
	callPoliceApi(url, success);
	
	var englishUrl = "/api/crime-categories?date="+date;
    callPoliceApi(englishUrl, function(data, status){
		console.log("englishURL: "+data);
		crimeToEnglish = data;
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
    console.log("Map pre sorting:");
	
	for(var crime in map){
		console.log(crime+"  "+map[crime]);
	}

	mostCrimes(data, map);
	leastCrimes(data, map);
	
	countArrests(data);
	
	// Order crimes based on frequency
	var sortedMap = orderCrimes(map);
	console.log("sorted map");
	for(var crime in sortedMap){
		console.log(sortedMap[crime]);
	}
	return sortedMap;
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
	console.log(countArrests);
	$("#number").text(countArrests);
}

function lastUpdated() {
    var returnString;
    callPoliceApi("/api/crime-last-updated", function (data, status) {
        console.log(data.date);
        var date = new Date(data.date);
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var monthName = monthNames[date.getMonth()];
        $(".data-crimemonth").text(monthName);
        returnString = data.date.substring(0, 7);
        console.log("Date: " + returnString);
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
	console.log("crimeToEnglish"+crimeToEnglish);
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
		console.log("orderCrimes: "+highestValue+"   "+map[highestValue]);
		sortedData.push({"count": map[highestValue]});	
		delete map[highestValue];
		highestValue = undefined;
		
		if(sortedData.length == length){
			break;
		}
	}
	return sortedData;
}