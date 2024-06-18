document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;
  getWeatherByCity(city);
});

document
  .getElementById("current-location-btn")
  .addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          alert("Unable to retrieve your location");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  });

function getWeatherByCity(city) {
  const apiKey = "enter your own api key";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found");
        return;
      }

      displayWeather(data);
    })
    .catch((error) => {
      alert("Error fetching data");
      console.error(error);
    });
}

function getWeatherByCoordinates(lat, lon) {
  const apiKey = "5enter your own api key";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      alert("Error fetching data");
      console.error(error);
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weather-result");
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Feels Like: ${data.main.feels_like} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;
}
