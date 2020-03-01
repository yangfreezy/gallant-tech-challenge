import axios from "axios";

const getDogsListAndObject = async (breedList, breedData) => {
  const {
    data: { message }
  } = await axios.get("https://dog.ceo/api/breeds/list/all");

  for (var breed of Object.keys(message)) {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    breedList.push({
      primaryBreed: breed,
      types: message[breed],
      image: data.message
    });
    breedData[breed] = {
      primaryBreed: breed,
      types: message[breed],
      image: data.message
    };
  }
  return { list: breedList, data: breedData };
};

const getDogData = (setDogBreedsList, setDogBreedsObject) => {
  let breedList = [];
  let breedData = {};

  const setList = async (setDogBreedsList, setDogBreedsObject) => {
    let { list, data } = await getDogsListAndObject(breedList, breedData);
    setDogBreedsList(list);
    setDogBreedsObject(data);
    localStorage.setItem("masterList", JSON.stringify(list));
    localStorage.setItem("masterObject", JSON.stringify(data));
    return { list, data };
  };

  return setList(setDogBreedsList, setDogBreedsObject);
};

export default getDogData;
