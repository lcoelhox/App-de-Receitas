import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Profile component tests', () => {
  it('01 - should render the title', () => {
    renderWithRouter(<App />, '/profile');
    const getTitle = screen.getByRole('heading', {
      name: /profile/i });
    expect(getTitle).toBeInTheDocument();
  });
  it('02 - should render all buttons in profile', () => {
    renderWithRouter(<App />, '/profile');
    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesButton).toBeInTheDocument();

    // const favoriteRecipesButton = getByRole('button', { name: /favorite recipes/i });

    expect(favoriteRecipesButton).toBeInTheDocument();
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  it('03 - should render user data', () => {
    const { history } = renderWithRouter(<App />);
    const getEmailInput = screen.getByTestId('email-input');
    const getPasswordInput = screen.getByTestId('password-input');
    const getEnterButton = screen.getByRole('button', { name: /enter/i });
    expect(getEnterButton).toBeDisabled();
    expect(getEmailInput).toBeInTheDocument();
    expect(getPasswordInput).toBeInTheDocument();
    userEvent.click(getEmailInput);
    userEvent.type(getEmailInput, 'estudante@betrybe.com');
    userEvent.click(getPasswordInput);
    userEvent.type(getPasswordInput, '1234567');
    const getAbleEnterButton = screen.getByRole('button', { name: /enter/i });
    expect(getAbleEnterButton).not.toBeDisabled();
    userEvent.click(getAbleEnterButton);
    history.push('/meals');

    const getMealsTitle = screen.findByRole('heading', { name: /meals/i });

    expect(getMealsTitle).toBeInTheDocument();

    const getProfileButton = screen.findByAltText(/profile/i);
    expect(getProfileButton).toBeInTheDocument();

    userEvent.click(getProfileButton);
    history.push('/profile');
    const getEmailInProfile = screenscreen.getByText(/juliana\.mreitz@gmail\.com/i);
    expect(getEmailInProfile).toBeInTheDocument();
  });
  it('04 - should redirect to done recipes on click', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesButton).toBeInTheDocument();
    userEvent.click(doneRecipesButton);
    history.push('/done-recipes');
    const getTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(getTitle).toBeInTheDocument();
  });
  it('05 - should redirect to favorite recipes on click', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favoriteRecipesButton = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipesButton).toBeInTheDocument();
    userEvent.click(favoriteRecipesButton);
    history.push('/favorite-recipes');
    const getTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(getTitle).toBeInTheDocument();
  });
  it('06 - should redirect to home on click', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    history.push('/favorite-recipes');
    const getPasswordInput = screen.getByLabelText(/password:/i);
    expect(getPasswordInput).toBeInTheDocument();
  });
});
