import React from 'react';
import PropTypes from 'prop-types';

export default function SuggestionCard({ index, name }) {
  return (
    <div className="col-md-6">
      <div className="card card-body">
        <h5 data-testid={ `${index}-recommendation-title` }>{ name }</h5>
      </div>
    </div>
  );
}

SuggestionCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
