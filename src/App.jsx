import { useState, useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";

/*Images*/ 
import cloudIcon from"./assets/cloud.png";
import drizzleIcon from"./assets/drizzle.png";
import humidityIcon from"./assets/humidity.png";
import rainIcon from"./assets/rain.png";
import searchIcon from"./assets/search.png";
import snowIcon from"./assets/snow.png";
import sunIcon from"./assets/sun.png";
import windIcon from"./assets/wind.png";

const WeatherDetails=({icon, temp, city, country, lat, log, humidity, wind}) =>{
return (
<>
<div className="image">
  <img src={icon} alt="Image" />
</div>
<div className="temp">{temp}°C</div>
<div className="location">{city}</div>
<div className="country">{country}</div>
<div className="cord">
<div>
  <span className="lat">latitude</span>
  <span>{lat}</span>
</div>
<div>
  <span className="log">longitude</span>
  <span>{log}</span>
</div>
</div>


<div className="data-container">
<div className="element">
  <img src={humidityIcon} alt="humidity"className="icon"/>
  <div className="data">
    <div className="humidity-percentage">{humidity}%</div>
    
    <div className="text">Humidity</div>
  </div>
</div>

    <div className="element">
  <img src={windIcon} alt="wind"  className="icon"/>
  <div className="data">
    <div className="wind-percentage">{wind} km/h</div>
    <div className="text">Wind Speed</div>
</div>
  </div>
</div>

</>
);
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
 };
function App() {
    let api_key = "79c39d79af70427a39e741dffec73ad4";
  const [text,setText] = useState("Dharmapuri");

  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setlat] = useState(0);
  const [log, setlog] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [wind, setwind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




  const weatherIconMap = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };
  const search=async ()=>{
    setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
  try{
    let res = await fetch(url);
    let data = await res.json();
    //console.log(data);
    if (data.cod ==="404"){
      console.error("city not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    
    };
   sethumidity(data.main.humidity);
   setwind(data.wind.speed);
   setTemp(data.main.temp);
   setCity(data.name);
   setCountry(data.sys.country);
   setlat(data.coord.lat);
   setlog(data.coord.lon);
   const weatherIconCode = data.weather[0].icon;
   setIcon(weatherIconMap [weatherIconCode]|| sunIcon);
   setCityNotFound(false);
  } catch (error) {
    console.error("An error occurred:", error.message);
    setError("An error occurred while fetching weather data.");

  } finally{
    setLoading(false);

  }
};
const handleCity =(e) => {
setText(e.target.value);
};
const handleKeyDown =(e) =>{
  if (e.key ==="Enter"){
    search();
  }};

useEffect(function(){
search();
}, []);
  return (
    <> 
      <div className="container">
        <div className="input-container">
          <input type="text"
          className="cityInput"
          placeholder="Search City"
           onChange={handleCity}
           value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
      
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="city-not-found">City not found</div>}

       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} 
       log={log} humidity={humidity} wind={wind}/>}

      <p className="copyright">Designed by <span>AK</span></p>
      
      </div>
        
    </>
  );
}

export default App;
