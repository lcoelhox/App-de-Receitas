import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../hooks/RecipesContext';
import Card from '../components/Card';
import { fetchMealsByName } from '../services/fetchMeals';
import { fetchCategories, fetchMealsByCategory } from '../services/fetchCategories';

export default function Meals() {
  const history = useHistory();
  const { mealsData, setMealsData } = useContext(RecipesContext);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filterButton, setFilterButton] = useState({
    filter: false,
    click: 0,
  });
  const mealsToBeRendered = [];
  const maxCards = 12;
  const maxCategories = 4;
  const categoriesToRender = [];
  const twoSeconds = 2000;

  const fetchAllMeals = () => {
    const allData = fetchMealsByName('');
    allData.then((json) => {
      setMealsData([
        ...json.meals,
      ]);
    });
  };

  const getMealsByCategory = async ({ target: { value } }) => {
    if (value === 'All') {
      fetchAllMeals();
      setTimeout(() => {
        setFilterButton({
          filter: false,
        });
      }, twoSeconds);
    } else if (filterButton.click === 1) {
      fetchAllMeals();
      setTimeout(() => {
        setFilterButton({
          filter: false,
          click: 0,
        });
      }, twoSeconds);
    } else {
      const results = await fetchMealsByCategory(value);
      setFilterButton({
        filter: true,
        click: filterButton.click + 1,
      });
      await setMealsData([
        ...results.meals,
      ]);
    }
  };

  if (mealsCategories.length > 0) {
    mealsCategories.forEach((data, i) => {
      if (i <= maxCategories) {
        categoriesToRender.push(data.strCategory);
      }
    });
    categoriesToRender.push('All');
  }

  if (mealsData) {
    mealsData.forEach((data, i) => {
      if (i < maxCards) mealsToBeRendered.push(data);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const data = await fetchCategories(url);
      setMealsCategories(
        data.meals,
      );
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {categoriesToRender.length > 0 && categoriesToRender.map((category, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ `${category}-category-filter` }
            value={ category }
            onClick={ getMealsByCategory }
          >
            { category }
          </button>
        ))}
      </div>

      { mealsData.length === 0 && fetchAllMeals() }

      {
        mealsToBeRendered.length === 1 && !filterButton.filter
          ? history.push(`/meals/${mealsToBeRendered[0].idMeal}`)
          : mealsToBeRendered.map((meals, i) => (
            <Card
              key={ i }
              index={ i }
              thumbnail={ meals.strMealThumb }
              name={ meals.strMeal }
              id={ meals.idMeal }
              recipe="meals"
            />))
      }
      <Footer />
    </div>
  );
}
