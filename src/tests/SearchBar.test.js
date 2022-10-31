import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
// import allMocks from '../helpers/mocksAll';

const DATA_TEST_ID = '0-card-name';

// beforeEach(async () => {
//   // jest.clearAllMocks();

//   global.fetch = fetch;
//   renderWithRouter(<App />, { initialEntries: ['/meals'] });
//   // const emailInput = screen.getByLabelText(/email/i);
//   // const passwordInput = screen.getByLabelText(/password/i);
//   // const enterButton = screen.getByRole('button', { name: /enter/i });

//   // userEvent.type(emailInput, 'tryber@teste.com');
//   // userEvent.type(passwordInput, '1234567');

//   // userEvent.click(enterButton);
//   // console.log(history.history.location.pathname, 'QUALQUER COISA');

//   // const targetRecipe = screen.getByTestId('0-card-img');
//   // await act(() => userEvent.click(targetRecipe));
// });

describe('Test the SearchBar component', () => {
  // beforeEach(async () => {
  //   // jest.clearAllMocks();

  //   global.fetch = fetch;
  //   renderWithRouter(<App />, { initialEntries: ['/meals'] });
  // const emailInput = screen.getByLabelText(/email/i);
  // const passwordInput = screen.getByLabelText(/password/i);
  // const enterButton = screen.getByRole('button', { name: /enter/i });

  // userEvent.type(emailInput, 'tryber@teste.com');
  // userEvent.type(passwordInput, '1234567');

  // userEvent.click(enterButton);
  // console.log(history.history.location.pathname, 'QUALQUER COISA');

  // const targetRecipe = screen.getByTestId('0-card-img');
  // await act(() => userEvent.click(targetRecipe));
  // });
  // let history;
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });
    renderWithRouter(<App />, '/meals');
    // history = test.history;
  });
  it('testing if the search bar meals works correctly', async () => {
    // global.fetch = fetch;
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);
    const radioIngredients = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirst = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.click(radioIngredients);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(searchButton);

    // const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    // expect(global.fetch).toHaveBeenNthCalledWith(1, url);

    const productMealsOrange = await screen.findByTestId(DATA_TEST_ID);
    expect(productMealsOrange).toBeInTheDocument();
    userEvent.clear(searchInput);

    userEvent.click(radioName);
    userEvent.type(searchInput, 'Corba');
    userEvent.click(searchButton);

    const productMealsCorba = await screen.findByTestId(DATA_TEST_ID);
    expect(productMealsCorba).toBeInTheDocument();
    userEvent.clear(searchInput);

    userEvent.click(radioFirst);
    userEvent.type(searchInput, 'C');
    userEvent.click(searchButton);
    userEvent.clear(searchInput);

    const productMealsC = screen.getByTestId(DATA_TEST_ID);
    expect(productMealsC).toBeInTheDocument();

    jest.spyOn(global, 'alert');

    userEvent.click(radioFirst);
    userEvent.type(searchInput, 'oe');
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalled();
    userEvent.clear(searchInput);

    const buttonRedirectDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonRedirectDrinks).toBeInTheDocument();
    userEvent.click(buttonRedirectDrinks);
  });
});

describe('testing drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
    renderWithRouter(<App />, '/drinks');
    // history = test.history;
  });
  it('testing if the search bar  drinks works correctly', async () => {
    // global.fetch = fetch;
    // renderWithRouter(<App />, { initialEntries: ['/meals'] });

    // const buttonRedirectDrinks = screen.getByTestId('drinks-bottom-btn');
    // expect(buttonRedirectDrinks).toBeInTheDocument();

    // userEvent.click(buttonRedirectDrinks);

    const productDrinks = await screen.findByTestId(DATA_TEST_ID);
    expect(productDrinks).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const radioIngredients = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirst = screen.getByTestId('first-letter-search-radio');
    const searchIpunt = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(radioIngredients);
    userEvent.type(searchIpunt, 'Galliano');
    userEvent.click(searchButton);
    const productMealsGalliano = screen.getByTestId(DATA_TEST_ID);
    expect(productMealsGalliano).toBeInTheDocument();
    userEvent.click(radioName);
    userEvent.type(searchIpunt, 'GG');
    userEvent.click(searchButton);
    const productMealsPie = screen.getByTestId(DATA_TEST_ID);
    expect(productMealsPie).toBeInTheDocument();
    userEvent.click(radioFirst);
    userEvent.type(searchIpunt, 'G');
    userEvent.click(searchButton);
    const productMealsO = screen.getByTestId(DATA_TEST_ID);
    expect(productMealsO).toBeInTheDocument();
    jest.spyOn(global, 'alert');
    userEvent.click(radioFirst);
    userEvent.type(searchIpunt, 'oe');
    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalled();
    const buttonRedirectMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(buttonRedirectMeals);
  });
});
