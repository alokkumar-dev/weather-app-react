import "./HomePage.css";
import locationLogo from "../../Icons/location.png";
import searchIcon from "../../Icons/search.png";
import { useEffect, useState } from "react";
import sunRiseSet from "../../Icons/sunSet.png";
import Chart from "react-apexcharts";
import axios from "axios";

export const HomePage = () => {
  const [searchWeather, setSearchWeather] = useState("");
  const [weather, setWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();

  const dailyData = (e) => {
    let arr = e.temp;
    console.log(e);
    setWeatherIcon(e.weather[0].icon);
    setDailyWeather(arr);
  };
  useEffect(() => {
    axios.get("https://ipinfo.io/json?token=52ed0181817dc8").then((res) => {
      setSearchWeather(res.data.city);
    });
  }, []);

  const getData = async () => {
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
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=000ea10fae727b5e0d08edbb2b5f07c0`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
      setWeather(data.daily);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [searchWeather]);
  const handleChange = (e) => {
    setSearchWeather(e.target.value);
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
              value={searchWeather}
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
              <div key={index} onClick={() => dailyData(el)} tabIndex="0">
                <div className="tempDivs">
                  <h5>{Math.floor(el.temp.min)}°C</h5>
                  <h5>{Math.floor(el.temp.max)}°C</h5>
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
          <div className="temp_img">
            <h1>{Math.floor(dailyWeather.max ? dailyWeather.max : 30)}°C</h1>
            <img
              src={`http://openweathermap.org/img/wn/${
                weatherIcon ? weatherIcon : "10d"
              }@2x.png`}
              alt="img"
            />
          </div>

          <div className="Graph">
            {dailyWeather.day ? (
              <Chart
                type="area"
                series={[
                  {
                    name: "Temperature",
                    data: [
                      dailyWeather.morn,
                      dailyWeather.max,
                      dailyWeather.day,
                      dailyWeather.min,
                    ],
                  },
                ]}
                options={{
                  dataLabels: {
                    formatter: (val) => {},
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => {
                        return `${Math.floor(val)}℃`;
                      },
                    },
                  },
                  xaxis: {
                    categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                  },
                }}
              />
            ) : (
              <Chart
                type="area"
                series={[
                  {
                    name: "Temperature",
                    data: [15, 30, 20, 30],
                  },
                ]}
                options={{
                  dataLabels: {
                    formatter: (val) => {},
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => {
                        return `${Math.floor(val)}℃`;
                      },
                    },
                  },
                  xaxis: {
                    categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                  },
                }}
              />
            )}
          </div>
          <div className="pressur_humidity">
            <div>
              <h3>Pressure</h3>
              <p>1001 hpa</p>
            </div>
            <div>
              <h3>Humidity</h3>
              <p>37 %</p>
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
