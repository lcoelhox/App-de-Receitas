import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchDrinksById, fetchMealsById } from '../services/fetchById';
import ButtonsFavorite from '../components/ButtonsFavorite';
import RecipesContext from '../hooks/RecipesContext';

const ingredientsToSave = [];
const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
export default function RecipeInProgress({ match: { params: { id } } }) {
  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const pagePath = history.location.pathname;
  const [recipesData, setRecipesData] = useState();
  const [ingredients, setIngredients] = useState();
  // const readIngredientsS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const progressKey = pagePath.includes('meals') ? 'meals' : 'drinks';
  // const startIngredients = readIngredientsS()[progressKey][id] || [];
  // const initialChecks = readIngredientsS ? ingredients
  //   .map((ingredient) => startIngredients
  //     .includes(ingredient)) : null;
  const [isChecked, setIsChecked] = useState(ingredients);
  const twoSeconds = 2000;
  // const [doneRecipes, setDoneRecipes] = useState([]);
  const getIngredients = () => {
    if (recipesData) {
      Object.keys(recipesData).forEach((key) => {
        if (key.includes('strIngredient')
      && recipesData[key] !== null
      && recipesData[key] !== '') {
          setIngredients((prev) => {
            if (prev) {
              return [
                ...prev,
                recipesData[key],
              ];
            }
            return [recipesData[key]];
          });
        }
      });
    }
  };
  console.log(isChecked);

  const fetchInProgress = async () => {
    if (pagePath.includes('meals')) {
      const inProgress = await fetchMealsById(id);
      const { meals } = await inProgress;
      setRecipesData({
        ...meals[0],
      });
    } if (pagePath.includes('drinks')) {
      const inProgress = await fetchDrinksById(id);
      const { drinks } = await inProgress;
      setRecipesData({
        ...drinks[0],
      });
    }
  };

  const saveIsChecked = () => {
    localStorage.setItem('checkBoxBool', JSON.stringify(isChecked));
  };

  const setStateChecked = (ingredient, bool) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [ingredient]: bool,
    }));
  };
  const saveDoneRecipes = () => {
    const prevStore = [...JSON.parse(localStorage.getItem('doneRecipes'))];
    let recipes = [...doneRecipes];
    if (prevStore) {
      recipes = [...recipes, ...prevStore];
    }
    setDoneRecipes([...recipes]);
    if (pagePath.includes('meals')) {
      recipes = [
        ...doneRecipes,
        {
          id: recipesData.idMeal,
          type: 'Meal',
          nationality: recipesData.strArea,
          alcoholicOrNot: '',
          name: recipesData.strMeal,
          image: recipesData.strMealThumb,
          doneDate: new Date().toLocaleDateString(),
          tag: [recipesData.strTags && recipesData.strTags.split(',')],
        },
      ];
    } else {
      recipes = [
        ...doneRecipes,
        {
          id: recipesData.idDrink,
          type: 'Drink',
          nationality: recipesData.strArea,
          alcoholicOrNot: recipesData.strAlcoholic,
          name: recipesData.strDrink,
          image: recipesData.strDrinkThumb,
          doneDate: new Date().toLocaleDateString(),
          tag: [recipesData.strTags && recipesData.strTags.split(',')],
        },
      ];
    }
    setDoneRecipes([...recipes]);
    localStorage.setItem('doneRecipes', JSON
      .stringify(recipes));
    setTimeout(() => {
      history.push('/done-recipes');
    }, twoSeconds);
  };
  const saveOnLocalStorage = ({ target: { value, checked } }) => {
    if (pagePath.includes('meals')) {
      ingredientsToSave.push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipesLS,
        meals: {
          ...inProgressRecipesLS?.meals,
          [id]: ingredientsToSave,
        },
      }));
    } if (pagePath.includes('drinks')) {
      ingredientsToSave.push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipesLS,
        drinks: {
          ...inProgressRecipesLS?.drinks,
          [id]: ingredientsToSave,
        },
      }));
    }
    setStateChecked(value, checked);
  };
  useEffect(() => {
    saveIsChecked();
  }, [isChecked]);
  useEffect(() => {
    fetchInProgress();
    saveIsChecked();
  }, []);
  useEffect(() => {
    getIngredients();
  }, [recipesData]);
  return (
    <>
      <div>
        <ButtonsFavorite />
      </div>
      <div>
        {recipesData && (
          pagePath.includes('drinks') ? (
            <>
              <img
                src={ recipesData.strDrinkThumb }
                alt={ recipesData.strDrink }
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{recipesData.strDrink}</h3>
              <p data-testid="recipe-category">{ recipesData.strCategory }</p>
              <p data-testid="instructions">{ recipesData.strInstructions }</p>
              <div className="toDo">
                {ingredients && ingredients.map((ingredient, i) => (
                  <label
                    key={ `${ingredient}-${i}` }
                    htmlFor={ `ingredient${i}` }
                    data-testid={ `${i}-ingredient-step` }
                    style={ { textDecorationLine: isChecked
                        && isChecked[ingredient] ? 'line-through' : 'none' } }
                  >
                    <input
                      type="checkbox"
                      name={ ingredient }
                      className="ingredients-checkbox"
                      id={ `ingredient${i}` }
                      value={ ingredient }
                      onChange={ saveOnLocalStorage }
                      checked={ isChecked && isChecked[ingredient] }
                    />
                    { ingredient }
                  </label>
                ))}
              </div>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isChecked ? !Object.values(isChecked)
                  .every((check) => check === true) : true }
                onClick={ saveDoneRecipes }
              >
                Finish
              </button>
            </>
          ) : (
            <>
              <img
                src={ recipesData.strMealThumb }
                alt={ recipesData.strMeal }
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{recipesData.strMeal}</h3>
              <p data-testid="recipe-category">{ recipesData.strCategory }</p>
              <p data-testid="instructions">{ recipesData.strInstructions }</p>
              <div className="toDo">
                {ingredients && ingredients.map((ingredient, i) => (
                  <label
                    key={ `${ingredient}-${i}` }
                    htmlFor={ `ingredient${i}` }
                    data-testid={ `${i}-ingredient-step` }
                    style={ { textDecorationLine: isChecked
                      && isChecked[ingredient] ? 'line-through' : 'none' } }
                  >
                    <input
                      type="checkbox"
                      className="ingredients-checkbox"
                      name={ ingredient }
                      id={ `ingredient${i}` }
                      value={ ingredient }
                      onChange={ saveOnLocalStorage }
                      checked={ isChecked && isChecked[ingredient] }
                    />
                    { ingredient }
                  </label>
                ))}
              </div>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isChecked ? !Object.values(isChecked)
                  .every((check) => check === true) : true }
                onClick={ saveDoneRecipes }
              >
                Finish
              </button>
            </>
          )
        )}
      </div>
    </>
  );
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
