import axios from 'https://cdn.skypack.dev/axios';

const API_KEY = "cc40f11aee9613ff49d8502ae694e2f0";
const weatherForm = document.getElementById("weatherForm");
const weatherInfo = document.getElementById("weatherInfo");
const timeZone = document.getElementById("timeZone");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = response.data;

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const countryCode = data.sys.country;

    weatherInfo.innerHTML = `
      <h2>Weather in ${city}, ${countryCode}</h2>
      <p>🌡️ Temperature: ${temperature}°C</p>
      <p>🌤️ Description: ${description}</p>
    `;


    getTimeZone(data.coord.lat, data.coord.lon);
  } catch (error) {
    console.log("Error fetching weather data:", error);
    alert("City not found or error fetching data.");
    weatherInfo.innerHTML = "";
    timeZone.innerHTML = "";
  }
});

async function getTimeZone(lat, lon) {
  try {
    const timeResponse = await axios.get(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`, {
      headers: {
        'X-Api-Key': 'YOUR_TIMEZONE_API_KEY' // You'll need a time API like Ninja API (free)
      }
    });

    const timeData = timeResponse.data;

    timeZone.innerHTML = `
      <h3>🕒 Current Local Time</h3>
      <p>${timeData.datetime}</p>
    `;
  } catch (error) {
    console.error("Error fetching time zone:", error);
    timeZone.innerHTML = "<p>Couldn't load time zone.</p>";
  }
}