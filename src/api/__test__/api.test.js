import getDogData from "./../index";

it("gets a list and object of dog breed data", async () => {
  const { list, data } = await getDogData();

  expect(list).toHaveLength(92);
  const expectedKeys = ["primaryBreed", "image", "types"];
  let testObj = list[0];
  Object.keys(testObj).forEach(key => {
    expect(expectedKeys).toContain(key);
    expect(data[testObj["primaryBreed"]]).not.toBeUndefined();
  });
  expect(Object.keys(data)).toHaveLength(92);
});
