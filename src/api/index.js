import axios from "axios";

const getDogData = () => {
  let breedList = [];
  let breedData = {};

  const getDogsList = async (breedList, breedData) => {
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

  const setList = async () => {
    let { list, data } = await getDogsList(breedList, breedData);
    localStorage.setItem("masterList", JSON.stringify(list));
    localStorage.setItem("masterObject", JSON.stringify(data));
    return { list, data };
  };
  return setList();
};

export default getDogData;
