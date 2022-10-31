const byIdMealsURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const byIdDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const fetchMealsById = async (id) => {
  try {
    const response = await fetch(`${byIdMealsURL}${id}`);
    const json = response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchDrinksById = async (id) => {
  try {
    const response = await fetch(`${byIdDrinksURL}${id}`);
    const json = response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchDrinksById, fetchMealsById };
