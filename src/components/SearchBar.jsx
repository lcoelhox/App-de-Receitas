import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../hooks/RecipesContext';

export default function SearchBar() {
  const history = useHistory();
  const {
    setFilterType,
    filterValue,
    filterHandleChange,
    fetchMeals,
    fetchDrinks,
  } = useContext(RecipesContext);
  const handleRadioChange = ({ target: { value } }) => {
    setFilterType({
      filter: value,
    });
  };
  const handleSearchClick = () => {
    if (history.location.pathname.includes('drink')) {
      fetchDrinks(filterValue);
    } else if (history.location.pathname.includes('meals')) {
      console.log(history.location.pathname);
      fetchMeals(filterValue);
    }
  };

  return (
    <div>
      <label htmlFor="ingredients">
        ingredient:
        <input
          type="radio"
          name="filter"
          id="ingredients"
          data-testid="ingredient-search-radio"
          value="ingredients"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="name">
        name:
        <input
          type="radio"
          name="filter"
          id="name"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="first-letter">
        first letter:
        <input
          type="radio"
          name="filter"
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleRadioChange }
        />
      </label>
      <label htmlFor="searchInput">
        <input
          type="text"
          data-testid="search-input"
          id="searchInput"
          onChange={ filterHandleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Search
      </button>
    </div>
  );
}
