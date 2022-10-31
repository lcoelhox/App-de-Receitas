const categoryMealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const categoryDrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const fetchCategories = async (URL) => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${categoryMealsEndPoint}${category}`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchDrinksByCategory = async (category) => {
  try {
    const response = await fetch(`${categoryDrinksEndPoint}${category}`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchCategories, fetchMealsByCategory, fetchDrinksByCategory };
