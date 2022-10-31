import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../hooks/RecipesContext';
import Card from '../components/Card';
import { fetchDrinksByName } from '../services/fetchDrinks';
import { fetchCategories, fetchDrinksByCategory } from '../services/fetchCategories';

export default function Drinks() {
  const history = useHistory();
  const { drinkData, setDrinkData } = useContext(RecipesContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [filterButton, setFilterButton] = useState({
    filter: false,
    click: 0,
  });
  const twoSeconds = 2000;
  const maxCards = 12;
  const drinkToRender = [];
  const categoriesToRender = [];
  const maxCategories = 4;

  const fetchAllDrinks = () => {
    const allData = fetchDrinksByName('');
    allData.then((json) => {
      setDrinkData([
        ...json.drinks,
      ]);
    });
  };

  const getDrinksByCategory = async ({ target: { value } }) => {
    if (value === 'All') {
      fetchAllDrinks();
      setTimeout(() => {
        setFilterButton({
          filter: false,
        });
      }, twoSeconds);
    } else if (filterButton.click === 1) {
      fetchAllDrinks();
      setTimeout(() => {
        setFilterButton({
          filter: false,
          click: 0,
        });
      }, twoSeconds);
    } else {
      const results = await fetchDrinksByCategory(value);
      setFilterButton({
        filter: true,
        click: filterButton.click + 1,
      });
      console.log(results.drinks);
      await setDrinkData([
        ...results.drinks,
      ]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const data = await fetchCategories(url);
      setDrinkCategories(
        data.drinks,
      );
    };
    fetchData();
  }, []);

  if (drinkCategories.length > 0) {
    drinkCategories.forEach((data, i) => {
      if (i <= maxCategories) {
        categoriesToRender.push(data.strCategory);
      }
    });
    categoriesToRender.push('All');
  }

  if (drinkData.length > 0) {
    drinkData.forEach((data, i) => {
      if (i < maxCards) drinkToRender.push(data);
    });
  }

  return (
    <div>
      <Header />
      {categoriesToRender.length > 0 && categoriesToRender.map((category, i) => (
        <button
          key={ i }
          type="button"
          data-testid={ `${category}-category-filter` }
          value={ category }
          onClick={ getDrinksByCategory }
        >
          { category }
        </button>
      ))}

      {drinkData.length === 0 && fetchAllDrinks()}

      {drinkToRender.length === 1 && !filterButton.filter
        ? history.push(`/drinks/${drinkToRender[0].idDrink}`)
        : drinkToRender.map((drink, i) => (
          <Card
            key={ i }
            index={ i }
            thumbnail={ drink.strDrinkThumb }
            name={ drink.strDrink }
            id={ drink.idDrink }
            recipe="drinks"
          />))}
      <Footer />
    </div>
  );
}
