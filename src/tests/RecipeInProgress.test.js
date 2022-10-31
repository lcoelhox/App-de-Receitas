import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('Test the Recipe in Progress component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });
    renderWithRouter(<App />, '/meals/5297/in-progress');
  });

  it('Test the Recipe in Progress component (45%)', async () => {
    const photoRecipe = screen.getByTestId('recipe-photo');
    expect(photoRecipe).toBeInTheDocument();

    const instructionsRecipe = screen.getByTestId('instructions');
    expect(instructionsRecipe).toBeInTheDocument();

    const checkBoxRecipe = screen.getByTestId('0-ingredient-step');
  });
});
