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
  const [inputState, setInputState] = useState("");

  useEffect(() => {
    if (!dogBreedsList.length || !Object.keys(dogBreedsObject).length) {
      const { list, data } = getDogData();
      setDogBreedsList(list);
      setDogBreedsObject(data);
    }
  }, [dogBreedsList, dogBreedsObject]);

  useEffect(() => {}, [filteredBreedsList]);

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
    setInputState("");
  };

  const handleClear = () => {
    setFilteredBreedsList([]);
  };

  return (
    <div className="App">
      <form className="filter-bar" onSubmit={handleSubmit}>
        <label name="filter"> Filter results: </label>
        <input
          type="text"
          name="filter"
          value={inputState}
          onChange={handleChange}
        />
        <input type="submit" value="submit" />
        <button onClick={handleClear}> clear </button>
      </form>
      {filteredBreedsList.length ? (
        filteredBreedsList.map(data => (
          <div>
            <div> {"Breed: " + data.primaryBreed}</div>
            <img
              className="breed-image"
              src={data.image}
              alt={data.primaryBreed}
            />
          </div>
        ))
      ) : dogBreedsList.length ? (
        dogBreedsList.map(data => (
          <div>
            <div> {"Breed: " + data.primaryBreed}</div>
            <img
              className="breed-image"
              src={data.image}
              alt={data.primaryBreed}
            />
          </div>
        ))
      ) : (
        <div>{"Retrieving data..."}</div>
      )}
    </div>
  );
}

export default App;
