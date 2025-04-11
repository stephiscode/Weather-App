const API_URL = "https://api.openweathermap.org/data/2.5/weather"; 
const TIMEZONE_API_URL = "https://worldtimeapi.org/api/timezone"; 

async function getWeather(event) { 
  event.preventDefault(); 

  const city = document.getElementById("cityInput").value.trim(); 
  if (!city) { 
    alert("Please enter a city name."); 
    return; 
  } 

  // Calling backend API instead of the OpenWeather API directly
  try { 
    const weatherResponse = await fetch('/weather?city=${city}');
    const weatherData = await weatherResponse.json(); 

    if (weatherData.cod !== 200) { 
      alert("City not found. Please enter a valid city."); 
      return; 
    } 

    const temperature = weatherData.main.temp; 
    const description = weatherData.weather[0].description; 
    const countryCode = weatherData.sys.country; 

    document.getElementById("weatherInfo").innerHTML = ` 
      <h2>Weather in ${city}, ${countryCode}</h2> 
      <p>Temperature: ${temperature}°C</p> 
      <p>Description: ${description}</p> 
    `; 

    getTimeZone(weatherData.coord.lat, weatherData.coord.lon); 
  } catch (error) { 
    console.log("Error fetching weather data:", error); 
  } 
} 

async function getTimeZone(lat, lon) { 
  try { 
    const response = await fetch(`${TIMEZONE_API_URL}/Etc/GMT`); 
    const timeData = await response.json(); 

    const currentTime = new Date(timeData.datetime).toLocaleTimeString(); 

    document.getElementById("timeZone").innerHTML = ` 
      <h3>Current Time</h3> 
      <p>${currentTime}</p> 
    `; 
  } catch (error) { 
    console.error("Error fetching time zone:", error); 
  } 
} 

document.getElementById("weatherForm").addEventListener("submit", getWeather);
