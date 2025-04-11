import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch"

dotenv.config();


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.API_KEY;

app.use(express.static("Public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Public/index.html");
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
  
    try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const weatherData = await weatherResponse.json();
  
      if (weatherData.cod !== 200) {
        return res.json({ cod: 400, message: 'City not found' });
      }
  
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.json({ cod: 500, message: 'Server error' });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
