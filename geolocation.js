function startHere(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
	}else{
		alert("Please enable GeoLocation");
	}
}

function errorFunction(position){
	alert("GeoLocation failed for whatever reason :/ Sorry.");
}

function successFunction(position){
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	displayAddress(lat, lng);
}

function displayAddress(lat, lng){
	var latlng = new google.maps.LatLng(lat, lng);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'latLng': latlng}, function (results, status){
		if(status != google.maps.GeocoderStatus.OK){
			alert("We could not determine your position");
		}else{
			if(results[3]){
				$("#output").text(results[2].formatted_address);
			}
		}
	});
	
}