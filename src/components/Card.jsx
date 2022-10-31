import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card({ index, name, thumbnail, id, recipe }) {
  return (
    <Link to={ `/${recipe}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <div>
          <p data-testid={ `${index}-card-name` }>{name}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ thumbnail }
            alt="Recipe"
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;

Card.propTypes = {
  name: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
