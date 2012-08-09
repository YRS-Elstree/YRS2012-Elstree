function startHere() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        alert("Please enable GeoLocation");
    }
}

function errorFunction(positionError) {
    console.log(positionError.code);
    console.log(positionError.message);
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    startDataStuff(position);

    displayAddress(lat, lng);
}

function anyof(wanted, list) {
    var found = false;
    jQuery.each(wanted, function (index, w) {
        if (jQuery.inArray(w, list) >= 0) {
            found = true;
            return false
        }
    });
    return found;
}

function displayAddress(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);

    console.log("Requesting location for lat,long = " + lat + ", " + lng);

    new google.maps.Geocoder().geocode(
        {'latLng':latlng},
        function (results, status) {
            if (status != google.maps.GeocoderStatus.OK) {
                alert("We could not determine your position");
            } else {
                jQuery.each(results, function (index, item) {
                    if (anyof([ "neighbourhood", "sublocality", "locality", "postal_town", "transit_station"], item.types)) {
                        $("#placename").text(item.formatted_address);
                        return false;
                    }
                });
            }
        });
}