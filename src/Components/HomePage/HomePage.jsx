import "./HomePage.css";
import locationLogo from "../../Icons/location.png";
import search from "../../Icons/search.png";
export const HomePage = () => {
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
              className="inputBox"
              placeholder="enter your city"
            />
          </div>
          <div className="searchIconDiv">
            <img src={search} alt="search icon" />
          </div>
        </div>
        <div className="weather-sevenDays">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};
