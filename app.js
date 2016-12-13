var API = '80b0145170300022cec420dc1d0728f7';
var temp;
var location;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip) {
	var url = "http://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + "&APPID=" + API;
	sendRequest(url);
}

function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.icon = data.weather[0].id;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = degreesToDirection(data.wind.deg);
			weather.loc = data.name;
			weather.temp = K2F(data.main.temp);
			update(weather);
			console.log(weather.direction)
		}
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
function degreesToDirection(degrees){
		var range = 360/16; //22.5
		var low = 360-range/2; //348.75
		var high = (low+range) % 360;
		var angles = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		for (i in angles){
			if (degrees >= low && degrees < high)
				return angles[i];
			low = (low+range) % 360;
			high=(high+range) %360;
		}

}

function K2C(k){
	return Math.round(k-273.15);
}
function K2F(k){
	return Math.round(k*(9/5)-459.67);
}

function update (weather){
	wind.innerHTML = weather.wind;
	direction.innerHTML = weather.direction;
	humidity.innerHTML = weather.humidity;
	loc.innerHTML = weather.loc;
	temp.innerHTML = weather.temp;
	icon.src = "imgs/codes/" + weather.icon + ".png";

}

window.onload = function () {
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	icon = document.getElementById("icon");
	humidity = document.getElementById("humidity");
	wind = document.getElementById("wind");
	direction = document.getElementById("direction");

	
	var zip = 99301;
	updateByZip(zip);
	

}

