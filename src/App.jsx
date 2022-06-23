import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./Components/HomePage/HomePage";

function App() {
  // const getWeather = ()=>{
  //   axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=18.5196&lon=73.8553&exclude=pune&appid=f54708523bef7b62ad34716409be8714&units=metric").then((res)=>{
  //     console.log(res)
  //   })
  // }
  // useEffect(()=>{
  //     getWeather();
  //   },[]);
    // console.log(data)
  return (
    <div className="App">
      <HomePage />
      
    </div>
  );
}

export default App;
