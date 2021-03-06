import React, { useState, useEffect } from "react";

import getDogData from "./api";

import "./styles.css";

function App() {
  const [dogBreedsList, setDogBreedsList] = useState(
    JSON.parse(localStorage.getItem("masterList")) || []
  );
  const [dogBreedsObject, setDogBreedsObject] = useState(
    JSON.parse(localStorage.getItem("masterObject")) || {}
  );
  const [filteredBreedsList, setFilteredBreedsList] = useState([]);
  const [showFilteredBreedsList, setShowFilteredBreedsList] = useState(false);
  const [inputState, setInputState] = useState("");

  useEffect(() => {
    if (!dogBreedsList.length || !Object.keys(dogBreedsObject).length) {
      const { list, data } = getDogData(setDogBreedsList, setDogBreedsObject);
      setDogBreedsList(list);
      setDogBreedsObject(data);
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setInputState(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputState.length === 0) return;
    let filters = inputState.split(",").map(breed => breed.trim());
    let filtered = filters
      .map(breed => dogBreedsObject[breed])
      .filter(val => val);
    setFilteredBreedsList(filtered);
    setShowFilteredBreedsList(true);
    setInputState("");
  };

  const handleClear = () => {
    setShowFilteredBreedsList(false);
    setFilteredBreedsList([]);
  };

  return (
    <div className="App">
      <div className="header"> Dog Breeds </div>
      <div className="form-container">
        <form className="filter-bar" onSubmit={handleSubmit}>
          <label name="filter"> Filter Breeds: </label>
          <input
            className="filter-input"
            type="text"
            name="filter"
            value={inputState}
            onChange={handleChange}
          />
          <div className="button-bar">
            {showFilteredBreedsList ? (
              <button className="button" onClick={handleClear}>
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </div>
      <div className="breed-list" data-testid="BreedList">
        {showFilteredBreedsList ? (
          filteredBreedsList.map(data => (
            <div className="breed-card">
              <div className="breed-title">
                {data.primaryBreed[0].toUpperCase() +
                  data.primaryBreed.substr(1)}
              </div>
              <img
                className="breed-image"
                src={data.image}
                alt={data.primaryBreed}
              />
            </div>
          ))
        ) : dogBreedsList ? (
          dogBreedsList.map(data => (
            <div className="breed-card">
              <div className="breed-title">
                {data.primaryBreed[0].toUpperCase() +
                  data.primaryBreed.substr(1)}
              </div>
              <img
                className="breed-image"
                src={data.image}
                alt={data.primaryBreed}
              />
            </div>
          ))
        ) : (
          <div className="loading">
            <div>
              Retrieving data... In the meantime, check out this adorable
              puppy..
            </div>
            <iframe
              title="Check out these puppies in the meantime"
              src="http://www.youtube.com/embed/71Kn-pyScfY"
              width="600"
              height="337.5"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
