import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../hooks/RecipesContext';

export default function Profile() {
  const {
    setPersonalData,
    cleanupLocalStorage,
  } = useContext(RecipesContext);

  const history = useHistory();
  const LogoutUser = () => {
    setPersonalData({
      email: '',
      password: '',
    });
    cleanupLocalStorage();
    history.push('/');
  };

  const getEmail = () => JSON.parse(localStorage.getItem('user')) || { email: '' };

  return (
    <div>
      <Header />
      <div name="user-info">
        <p data-testid="profile-email">
          { getEmail().email }
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => (history.push('/done-recipes')) }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => (history.push('/favorite-recipes')) }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => (LogoutUser()) }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
