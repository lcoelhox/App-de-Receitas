const searchByNameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const searchByFirstLetterURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const searchByIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const fetchDrinksByName = async (name) => {
  try {
    const response = await fetch(`${searchByNameURL}${name}`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw Error(error.message);
  }
};

const fetchDrinksByFistLetter = async (letter) => {
  try {
    const response = await fetch(`${searchByFirstLetterURL}${letter}`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw Error(error.message);
  }
};

const fetchDrinksByIngredient = async (ing) => {
  try {
    const response = await fetch(`${searchByIngredientURL}${ing}`);
    const json = await response.json();
    return json;
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export { fetchDrinksByFistLetter, fetchDrinksByIngredient, fetchDrinksByName };
