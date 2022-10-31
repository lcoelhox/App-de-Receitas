import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../hooks/RecipesContext';

export default function Login({ history }) {
  const {
    handleChange,
    disabled,
    personalData,
    savePersonalData,
  } = useContext(RecipesContext);

  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          id="email-input"
          onChange={ handleChange }
          value={ personalData.email }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          id="password"
          onChange={ handleChange }
          value={ personalData.password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled.isDisabled }
        onClick={ () => {
          savePersonalData();
          history.push('/meals');
        } }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
