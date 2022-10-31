import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
