import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [urlCopied, setUrlCopied] = useState(false);
  const [recipesToRender, setRecipesToRender] = useState();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const shareRecipe = () => {
    copy(window.location.href);
    setUrlCopied(true);
  };

  const filterDoneRecipes = ({ target: { value } }) => {
    switch (value) {
    case 'Meals':
      setRecipesToRender({
        ...doneRecipes.map((recipes) => recipes
          .filter((recipe) => recipe.type === 'meal')),
      });
      break;
    case 'Drinks':
      setRecipesToRender({
        ...doneRecipes.map((recipes) => recipes
          .filter((recipe) => recipe.type === 'drink')),
      });
      break;
    default:
      setRecipesToRender({
        ...doneRecipes,
      });
    }
  };

  useEffect(() => {
    setRecipesToRender([...doneRecipes]);
  }, []);

  console.log(recipesToRender);

  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          onClick={ filterDoneRecipes }
        >
          All
        </button>
        <button
          type="button"
          value="Meals"
          data-testid="filter-by-meal-btn"
          onClick={ filterDoneRecipes }
        >
          By Meals
        </button>
        <button
          type="button"
          value="Drinks"
          data-testid="filter-by-drink-btn"
          onClick={ filterDoneRecipes }
        >
          By Drinks
        </button>
        {recipesToRender && recipesToRender
          .map((recipeItem, i) => (
            <>
              <Link to={ `/${recipeItem.id}` }>
                <img
                  src={ recipeItem.image }
                  alt="Meal-or-drink"
                  data-testid={ `${i}-horizontal-image` }
                />
              </Link>
              { recipeItem.type === 'Meal'
              && (
                <h3
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  { recipeItem.category }
                </h3>
              )}
              <Link to={ `/${recipeItem.id}` }>
                <h2 data-testid={ `${i}-horizontal-name` }>{ recipeItem.name }</h2>
              </Link>
              <p data-testid={ `${i}-horizontal-done-date` }>{ recipeItem.doneDate }</p>
              {recipeItem.type === 'Drink' && (
                <p>{ recipeItem.alcoholicOrNot }</p>
              )}
              <button
                type="button"
                src={ shareIcon }
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ shareRecipe }
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
              {urlCopied && (<p>Link copied!</p>)}
              <p
                data-testid={ `${i}-${recipeItem.tags}-horizontal-tag` }
              >
                { recipeItem.tags }
              </p>
            </>
          ))}
      </section>
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
