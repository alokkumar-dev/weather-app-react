import "./HomePage.css";
import locationLogo from "../../Icons/location.png";
import searchIcon from "../../Icons/search.png";
import { useEffect, useState } from "react";
import { Graph } from "./TempGraph/TempGraph";
import sunRiseSet from "../../Icons/sunSet.png";
export const HomePage = () => {
  const [searchWeather, setSetWeather] = useState("pune");
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    getData();
  }, [searchWeather]);
  const handleChange = (e) => {
    setSetWeather(e.target.value);
  };

  const getData = async () => {
    // let city = "pune"

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchWeather}&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      getDatafor7days(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

  const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
      setWeather(data.daily);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="homeContainer">
        <div className="searchBar">
          <div className="logoDiv">
            <img src={locationLogo} alt="location" />
          </div>
          <div className="inputDiv">
            <input
              type="text"
              onChange={handleChange}
              className="inputBox"
              placeholder="enter your city"
            />
          </div>
          <div className="searchIconDiv">
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
        <div className="weather-sevenDays">
          {weather ? (
            weather.map((el, index) => (
              <div key={index}>
                <div className="tempDivs">
                  <h5>{Math.floor(el.temp.max - 273)}°C</h5>
                  <h5>{Math.floor(el.temp.max - 273)}°C</h5>
                </div>

                <img
                  src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                  alt="temprecutre logo"
                />
                <p>{el.weather[0].description}</p>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className="temp_graph">
          <Graph />
          <div className="pressur_humidity">
            <div>
              <h3>Pressure</h3>
              <p>1001 hpa</p>
            </div>
            <div>
              <h3>Humidity</h3>
              <p>1001 hpa</p>
            </div>
          </div>
          <div className="pressur_humidity">
            <div>
              <h3>Sunrise</h3>
              <p>5:0 AM</p>
            </div>
            <div>
              <h3>Sunset</h3>
              <p>6:45 PM</p>
            </div>
          </div>
          <img src={sunRiseSet} width="100%" alt="sunRiseSet" />
        </div>
      </div>
    </>
  );
};
