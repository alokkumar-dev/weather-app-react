import "./HomePage.css"
export const HomePage = () => {
  return (
    <>
      <div className="homeContainer">
        <div className="searchBar">
          <div className="logoDiv"></div>
          <div className="inputDiv">
            <input type="text" className="inputBox" placeholder="enter your city"/>
          </div>
          <div className="searchIconDiv"></div>
        </div>
      </div>
    </>
  );
};
