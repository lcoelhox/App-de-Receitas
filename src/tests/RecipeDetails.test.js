import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('Test the RecipeDetails component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });
    renderWithRouter(<App />, '/meals');
  });

  it('testing if the recipe details works correctly', async () => {
    const productMealsFirstImg = screen.getByTestId('0-card-img');
    expect(productMealsFirstImg).toBeInTheDocument();
    userEvent.click(productMealsFirstImg);
  });
});
