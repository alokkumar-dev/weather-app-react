import "./HomePage.css";
import locationLogo from "../../Icons/location.png";
import searchIcon from "../../Icons/search.png";
import { useEffect, useState } from "react";
import axios from "axios";
export const HomePage = () => {
  const [oneDayWeahter, setOneDayWeather] = useState({});
  const [sevenDayWeahter, setSevenDayWeather] = useState([]);
  // const [data, setData] = useState({});

  const [city, setCity] = useState("");
  const handleChange = (e) => {
    // setSearch(e.target.value);
    setCity(e.target.value);
    getWeather();
  };

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f54708523bef7b62ad34716409be8714&units=metric`
      )
      .then((res) => {
        setOneDayWeather(res.data);
      });

    // seven days weaher
    const lon = oneDayWeahter.coord.lon;
    const lat = oneDayWeahter.coord.lat;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=f54708523bef7b62ad34716409be8714&units=metric`
      )
      .then((res) => {
        setSevenDayWeather(res.data.daily);
        // console.log(res);
      });
  };
  // console.log(sevenDayWeahter);
  // for (let i = 0; i < sevenDayWeahter.length; i++) {
  //   // sevenDayWeahter[i]
  //   let date = new Date(sevenDayWeahter[i].dt * 1000);
  //   if (date.getDay == 0) {
  //     setData.day = "Sun";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }
  //   else if (date.getDay == 1) {
  //     setData.day = "Mon";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }
  //   else if (date.getDay == 2) {
  //     setData.day = "Tue";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }  else if (date.getDay == 4) {
  //     setData.day = "Wed";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }  else if (date.getDay == 5) {
  //     setData.day = "Thu";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }  else if (date.getDay == 6) {
  //     setData.day = "Fri";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }  else if (date.getDay == 7) {
  //     setData.day = "Sat";
  //     setData.maxtemp = `Max-${Math.floor(sevenDayWeahter[i].temp.max)} °C`;
  //     setData.mintemp = `Min-${Math.floor(sevenDayWeahter[i].temp.min)} °C`;
  //     setData.icon = `https://openweathermap.org/img/wn/${sevenDayWeahter[i].weather[0].icon}@2x.png`;
  //   }
  // }
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
        {/* {data.map((temp) => ( */}
        <div className="weather-sevenDays">
          {sevenDayWeahter.map((temp) => (
            console.log(temp)
            // <div>
            //   <h5>{}</h5>
            //   <h5>{}</h5>
            //   <h5>{}</h5>
            // </div>
          ))}
        </div>
        {/* ))} */}
      </div>
    </>
  );
};
