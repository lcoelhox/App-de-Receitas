import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDrinksById, fetchMealsById } from '../services/fetchById';
import {
  fetchSuggestionDrinks,
  fetchSuggestionMeals,
} from '../services/fetchSuggestions';
import '../css/buttons.css';
import RecipesContext from '../hooks/RecipesContext';
import SuggestionCard from '../components/SuggestionCard';
import ButtonsFavorite from '../components/ButtonsFavorite';

export default function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const {
    setSuggestionsToRender,
    suggestionsToRender,
  } = useContext(RecipesContext);

  const [details, setDetails] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const five = 5;
  const oneSecond = 1000;
  const timer = useRef(null);
  const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const getingValidIngredients = () => {
    Object.keys(details).forEach((key) => {
      if (key.includes('strIngredient')
        && details[key] !== null
        && details[key] !== ''
        && !allIngredients.some((ing) => ing.includes(details[key]))) {
        setAllIngredients((prev) => [
          ...prev,
          details[key],
        ]);
      }
      if (key.includes('strMeasure')
        && details[key] !== null
        && details[key] !== ''
        && !allIngredients.some((ing) => ing.includes(details[key]))) {
        setMeasure((previous) => [
          ...previous,
          details[key],
        ]);
      }
    });
  };

  const getButtonStartText = () => {
    if (inProgressRecipesLS) {
      if (history.location.pathname.includes('meals')
        && Object.keys(inProgressRecipesLS).includes('meals')) {
        return Object.keys(inProgressRecipesLS.meals).includes(id);
      }
      if (history.location.pathname.includes('drinks')
        && Object.keys(inProgressRecipesLS).includes('drinks')) {
        return Object.keys(inProgressRecipesLS.drinks).includes(id);
      }
    }
    return false;
  };

  useEffect(() => {
    suggestions.forEach((suggestion, i) => {
      if (i <= five) {
        setSuggestionsToRender((prev) => [
          ...prev,
          suggestion,
        ]);
      }
    });
    const trigger = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => getingValidIngredients(), oneSecond);
    };
    trigger();
  }, [suggestions, details]);
  useEffect(() => {
    const fetchAndGet = async () => {
      if (history.location.pathname.includes('meals')) {
        const mealsResults = await fetchMealsById(id);
        const drinksSuggestion = await fetchSuggestionDrinks();
        setDetails({
          ...mealsResults.meals[0],
        });
        setSuggestions([
          ...drinksSuggestion.drinks,
        ]);
      } else if (history.location.pathname.includes('drinks')) {
        const drinksResults = await fetchDrinksById(id);
        const mealsSuggestion = await fetchSuggestionMeals();
        setDetails({
          ...drinksResults.drinks[0],
        });
        setSuggestions(() => [
          ...mealsSuggestion.meals,
        ]);
      }
    };
    fetchAndGet();
  }, []);
  return (
    <>
      <div>
        RecipeDetails
        <Link to={ `${id}/in-progress` }>
          <button
            className="startRecipe"
            type="button"
            data-testid="start-recipe-btn"
          >
            { getButtonStartText() ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </Link>
        <ButtonsFavorite />
      </div>
      <main>
        {(history.location.pathname.includes('meals')) ? (
          <section>
            <img
              data-testid="recipe-photo"
              alt={ details.strMeal }
              src={ details.strMealThumb }
            />
            <h2 data-testid="recipe-title">{details.strMeal}</h2>
            <p data-testid="recipe-category">{details.strCategory}</p>
            <ul>
              {allIngredients && allIngredients.map((ingredient, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  { `${measure[i]} ${ingredient}` }
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{details.strInstructions}</p>
            <iframe
              src={ details.strYoutube }
              title={ details.strMeal }
              data-testid="video"
            />
          </section>
        ) : (
          <section>
            <img
              data-testid="recipe-photo"
              alt={ details.strDrink }
              src={ details.strDrinkThumb }
            />
            <h2 data-testid="recipe-title">{details.strDrink}</h2>
            <p
              data-testid="recipe-category"
            >
              {`${details.strCategory} - ${details.strAlcoholic}`}
            </p>
            <ul>
              {allIngredients && allIngredients.map((ingredient, i) => (
                <li
                  key={ i }
                  className="meals-ingredients"
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  { `${measure[i]} ${ingredient}` }
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{details.strInstructions}</p>
          </section>)}
      </main>
      <div className="suggestion-card-container" role="listbox">
        {suggestionsToRender && suggestionsToRender.map((suggestion, i) => {
          if (history.location.pathname.includes('meals')) {
            return (
              <div
                className="suggestion-card"
                data-testid={ `${i}-recommendation-card` }
                key={ i }
              >
                <SuggestionCard
                  name={ suggestion.strDrink }
                  index={ i }
                />
              </div>
            );
          } if (history.location.pathname.includes('drinks')) {
            return (
              <div
                className="suggestion-card"
                data-testid={ `${i}-recommendation-card` }
                key={ i }
              >
                <SuggestionCard
                  name={ suggestion.strMeal }
                  index={ i }
                />
              </div>
            );
          }
          return ('erro');
        })}
      </div>
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
