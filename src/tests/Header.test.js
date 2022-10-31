import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Header from '../components/Header';
import App from '../App';

describe('test the Header component', () => {
  it('01 - should elements have the expected behavior in meals route', () => {
    renderWithRouter(<App />, '/meals');
    const headerText = screen.getByRole('heading', { level: 1, name: /meals/i });
    const searchBtn = screen.getByTestId('search-top-btn');
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    expect(headerText).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('02 - should elements have the expected behavior in profile route', () => {
    renderWithRouter(<Header />, '/profile');
    const headerText = screen.getByRole('heading', { level: 1, name: /profile/i });
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    expect(headerText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it('03 - should elements have the expected behavior in favorite-recipes route', () => {
    renderWithRouter(<Header />, '/favorite-recipes');
    const headerText = screen.getByRole('heading', { level: 1, name: /favorite recipes/i });
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(headerText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it('04 - should elements have the expected behavior in drinks route', () => {
    renderWithRouter(<App />, '/drinks');
    const headerText = screen.getByRole('heading', { level: 1, name: /drinks/i });
    const searchBtn = screen.getByTestId('search-top-btn');
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    expect(headerText).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('05 - should elements have the expected behavior in done-recipes route', () => {
    renderWithRouter(<Header />, '/done-recipes');
    const headerText = screen.getByRole('heading', { level: 1, name: /done recipes/i });
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(headerText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
});
