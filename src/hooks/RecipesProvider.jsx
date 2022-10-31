import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  fetchDrinksByFistLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
} from '../services/fetchDrinks';
import {
  fetchMealsByFistLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
} from '../services/fetchMeals';
import { fetchMealsById, fetchDrinksById } from '../services/fetchById';

const alertNull = 'Sorry, we haven\'t found any recipes for these filters.';
function RecipesProvider({ children }) {
  // const history = useHistory();
  const [personalData, setPersonalData] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState({
    isDisabled: true,
  });
  const [filterType, setFilterType] = useState({});
  const [filterValue, setFilterValue] = useState({});
  const [mealsData, setMealsData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [suggestionsToRender, setSuggestionsToRender] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const validateEmail = () => {
    const { email, password } = personalData;
    const minPasswordLength = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const validated = regexEmail.test(email);
    if (validated && password.length >= minPasswordLength) {
      setDisabled({
        isDisabled: false,
      });
    } else {
      setDisabled({
        isDisabled: true,
      });
    }
  };
  const handleChange = ({ target: { name, value } }) => {
    setPersonalData({
      ...personalData,
      [name]: value,
    });
    validateEmail();
  };

  const removeRecipeFromLocalStorage = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const savePersonalData = () => {
    localStorage.setItem('user', JSON.stringify({ email: personalData.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  };
  const cleanupLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('drinksToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };
  const saveRecipeToLocalStorage = async (id) => {
    let rawRecipe;
    try {
      rawRecipe = await fetchMealsById(id);
    } catch {
      rawRecipe = await fetchDrinksById(id);
    }
    const [favRecipe] = rawRecipe.meals || rawRecipe.drinks;
    const favoriteRecipe = {
      type: favRecipe.idMeal ? 'meal' : 'drink',
      id: favRecipe.idMeal || favRecipe.idDrink,
      category: favRecipe.strCategory,
      nationality: favRecipe.strArea || '',
      alcoholicOrNot: favRecipe.strAlcoholic || '',
      name: favRecipe.strMeal || favRecipe.strDrink,
      image: favRecipe.strMealThumb || favRecipe.strDrinkThumb,
    };
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      savePersonalData();
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    favoriteRecipes.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };
  const isRecipeOnLocalStorage = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      return favoriteRecipes.some((recipe) => String(recipe.id) === String(id));
    }
  };
  const fetchMeals = async ({ filter }) => {
    switch (filterType.filter) {
    case 'ingredients': {
      const byIngredients = await fetchMealsByIngredient(filter);
      if (byIngredients.meals === null) {
        global.alert(alertNull);
      } else {
        setMealsData([
          ...byIngredients.meals,
        ]);
      }
      break;
    }
    case 'name': {
      const byName = await fetchMealsByName(filter);
      if (byName.meals === null) {
        global.alert(alertNull);
      }
      if (byName.meals) {
        setMealsData([
          ...byName.meals,
        ]);
      }
      break;
    }
    case 'firstLetter': {
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const byLetter = await fetchMealsByFistLetter(filter);
        if (byLetter.meals === null) {
          global.alert(alertNull);
        } else {
          setMealsData([
            ...byLetter.meals,
          ]);
        }
      }
      break;
    }
    default: {
      return 'null';
    }
    }
  };
  const fetchDrinks = async ({ filter }) => {
    switch (filterType.filter) {
    case 'ingredients': {
      const byIngredients = await fetchDrinksByIngredient(filter);
      if (byIngredients) {
        setDrinkData([
          ...byIngredients.drinks,
        ]);
      }
      break;
    }
    case 'name': {
      const byName = await fetchDrinksByName(filter);
      if (byName.drinks === null) {
        global.alert(alertNull);
      }
      if (byName.drinks) {
        setDrinkData([
          ...byName.drinks,
        ]);
      }
      break;
    }
    case 'firstLetter': {
      if (filter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const byLetter = await fetchDrinksByFistLetter(filter);
        if (byLetter.drinks === null) {
          global.alert(alertNull);
        } else {
          setDrinkData([
            ...byLetter.drinks,
          ]);
        }
      }
      break;
    }
    default: {
      return 'null';
    }
    }
  };
  const filterHandleChange = ({ target: { value } }) => {
    setFilterValue({
      ...filterValue,
      filter: value,
    });
  };
  const context = {
    handleChange,
    disabled,
    personalData,
    savePersonalData,
    setFilterType,
    filterType,
    filterValue,
    setFilterValue,
    filterHandleChange,
    fetchMeals,
    fetchDrinks,
    mealsData,
    drinkData,
    setMealsData,
    setDrinkData,
    setPersonalData,
    cleanupLocalStorage,
    saveRecipeToLocalStorage,
    removeRecipeFromLocalStorage,
    isRecipeOnLocalStorage,
    suggestionsToRender,
    setSuggestionsToRender,
    doneRecipes,
    setDoneRecipes,
  };
  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}
RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
