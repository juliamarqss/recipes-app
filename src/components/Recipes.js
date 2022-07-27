import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Recipes({ url, name, img, index }) {
  return (
    <div className="container-recipes">
      <Link
        to={ url }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          width="150px"
          src={ img }
          alt="recipes"
          className="card-img"
        />
        <div className="container-name">
          <p data-testid={ `${index}-card-name` } className="card-name">{ name }</p>
        </div>
      </Link>
    </div>
  );
}

Recipes.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipes;
