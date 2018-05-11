$(document).ready(function () {

  console.log("hello");

  weatherApp = {

    $targetArea: $("#weather"),

    weatherApiKey: "",

    lastLatitiude: "",
    lastLongitude: "",

    getFormData: function () {
      if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
        weatherApp.weatherApiKey = $("#apikey").val().trim();
      }

      const zip = $("#zip").val().trim();
      if (zip === null || zip.length < 5) {
        weatherApp.$targetArea.html("Enter a valid zip code.");
      } else {
        weatherApp.getWeatherData(zip);
      }

      console.log(weatherApp.weatherApiKey);
      console.log(zip);
    },

    getWeatherData: function (zipcode) {
   const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";

   // const url = "testData/test.json";

      $.getJSON(url, function (data) {

        if (data.cod == 200) {
          weatherApp.$targetArea.html("Success!");

          // THIS IS WHERE YOU WOULD ADD THE DATA TO THE PAGE
          // Add the city name
			$("#weather").append(`<h2>Weather in ${data.name}</h2>`);

          // Add the weather condition descriptions, all of them, comma separated
			let weatherStr = "";
			data.weather.forEach((item, index) => {
				if (index => 1) {
					weatherStr = weatherStr  + item.description + ", ";
					}
				else {
					weatherStr = item.description;
				}
			
				
			});

				$("#weather").append(`<p style="color: blue">${weatherStr}</p>`);
          // Add the current temperature, the day's low & high temp, current pressure, & current humidity
				
			$("#weather").append(`<li style="list-style-type: square">Current Temperature : ${data.main.temp}</li style="list-style-type: square"><li style="list-style-type: square">Lowest Temperature : ${data.main.temp_min}</li><li style="list-style-type: square">Highest Temperature : ${data.main.temp_max}</li style="list-style-type: square"><li style="list-style-type: square">Pressure : ${data.main.pressure}</li><li style="list-style-type: square">Humidity : ${data.main.humidity}</li>`);

		
			
          // Get the lat & longitude from the result and save
       /*   weatherApp.lastLatitiude = $("#weather").append(`<h5>Latitude : ${data.coord.lat}</h5>`);
          weatherApp.lastLongitude = $("#weather").append(`<h5>Longitude : ${data.coord.lon}</h5>`);
			*/
			weatherApp.lastLatitiude = data.coord.lat;
			weatherApp.lastLongitude = data.coord.lon;
			
			$("#weather").append(`<h5 style="color: green">Latitude : ${weatherApp.lastLatitiude}</h5>`);
			$("#weather").append(`<h5 style="color: green">Longhitude : ${weatherApp.lastLongitude}</h5>`);
			
          // Add a button for 5 day forcast
          weatherApp.$targetArea.append('<div id="5day"><button id="fiveDay">Get 5 Day Forecast</button></div>');
          $("#fiveDay").on("click", weatherApp.getFiveDayWeather);

        } else {
          weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
        }
      }).fail(function () {
        weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
      });
    },

    getFiveDayWeather: function () {
 const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + weatherApp.lastLatitiude + "&lon=" + weatherApp.lastLongitude + "&appid=" + weatherApp.weatherApiKey + "&units=imperial";

    
  // const url = "testData/test5day.json";

      $.getJSON(url, function (data) {
        const $target = $("#5day")
        if (data.cod == 200) {
          $target.html("Success!");
			$target.append(`<h2>Weather in ${data.city.name}</h2>`);
					

          // THIS IS WHERE YOU WOULD ADD THE 5 DAY FORCAST DATA TO THE PAGE
			data.list.forEach((list)=> {
				$target.append(`<h4 style="color: maroon">Date and time : ${list.dt_txt}<h4>`);
						

          // For each of the 5 days, at each time specified, add the date/time plus:
          //   - the weather condition descriptions, all of them, comma separated
          //   - day's temp, low & high temp, pressure, humidity
					list.weather.forEach((item) => {
				$target.append(`<p style= "color: blue">${item.description}</p>`);
			});
					$target.append(`<li style="list-style-type: square">Current Temperature : ${list.main.temp}</li><li style="list-style-type: square">Lowest Temperature : ${list.main.temp_min}</li><li style="list-style-type: square">Highest Temperature : ${list.main.temp_max}</li><li style="list-style-type: square">Pressure : ${list.main.pressure}</li><li style="list-style-type: square">Humidity : ${list.main.humidity}</li>`);
			
					});
		/*	weatherApp.lastLatitiude = $("#weather").append(`<h5>Latitude : ${data.coord.lat}</h5>`);
			weatherApp.lastLongitude = $("#weather").append(`<h5>Longitude : ${data.coord.lon}</h5>`);
			*/

			
			$target.append(`<h5 style="color: green">Latitude : ${weatherApp.lastLatitiude}</h5>`);
			$target.append(`<h5 style="color: green">Longhitude : ${weatherApp.lastLongitude}</h5>`);
			
        } else {
          $target.html("Sorry, 5 day forcast data is unavailable. Try again later.");
        }
      }).fail(function () {
        weatherApp.$targetArea.html("Sorry, 5 day forcast data is unavailable. Try again later.");
      });

    }
  }

  // Form submit handler
  $("#submit").click(function () {
    weatherApp.getFormData();
    return false;
  });

});