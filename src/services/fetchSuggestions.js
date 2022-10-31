const suggestionDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const suggestionMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchSuggestionDrinks = async () => {
  try {
    const response = await fetch(suggestionDrinksURL);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchSuggestionMeals = async () => {
  try {
    const response = await fetch(suggestionMealsURL);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchSuggestionDrinks, fetchSuggestionMeals };
