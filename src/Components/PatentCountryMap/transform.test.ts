import transformMapData, { transformDate } from "./transform";
import data from "./testdata";

const testData = data;

it("converts a date correctly", () => {
  const d = 20100100;
  const date = new Date(transformDate(d));
  console.log(date);
  expect(date.getFullYear()).toBe(2010);
});

it("turns data into shape I want", () => {
  const counts = transformMapData(testData).countries;
  console.log(counts[0]);
  expect(counts[0].name).toBe("China");
});

it("gets cords for data", () => {
  const cords = transformMapData(data).countryCords;
  console.log(cords[0]);
  expect(cords).not.toBeNull();
});

it("gets cords for data", () => {
  const country = transformMapData(data).topCountries;
  console.log(country);
  expect(country).not.toBeNull();
});
