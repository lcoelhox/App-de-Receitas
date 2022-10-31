import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Test the Footer component', () => {
  it('Should have two clickable images', () => {
    renderWithRouter(<Footer />);
    const linkToDrinks = screen.getByAltText('drink icon');
    const linkToMeals = screen.getByAltText('meal icon');
    expect(linkToDrinks).toBeInTheDocument();
    expect(linkToMeals).toBeInTheDocument();
  });
});
