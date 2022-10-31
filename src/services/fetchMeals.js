const searchByNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const searchByFirstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const searchByIngredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const fetchMealsByName = async (name) => fetch(
  `${searchByNameURL}${name}`,
).then((response) => response.json());

const fetchMealsByFistLetter = async (letter) => fetch(
  `${searchByFirstLetterURL}${letter}`,
).then((response) => response.json());

const fetchMealsByIngredient = async (ing) => fetch(
  `${searchByIngredientURL}${ing}`,
).then((response) => response.json());

export { fetchMealsByFistLetter, fetchMealsByIngredient, fetchMealsByName };
