import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import arrow from '../style/images/arrow.png';

function ButtonStartRecipe({ type, id }) {
  const [isStarded, setIsStarted] = useState(false);

  useEffect(() => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = {
        meals: {},
        cocktails: {},
      };
    }

    if (type === 'foods') {
      const findID = Object.keys(inProgressRecipes.meals).find((key) => key === id);
      setIsStarted(findID);
    }

    if (type === 'drinks') {
      const findID = Object.keys(inProgressRecipes.cocktails)
        .find((key) => key === id);
      setIsStarted(findID);
    }
  }, [setIsStarted, type, id]);

  return (
    <div className="container-btn-start">

      <Link to={ `/${type}/${id}/in-progress` }>
        <p data-testid="start-recipe-btn" className="btn-start-recipe">
          { isStarded ? 'Continue Recipe' : 'Start Recipe!'}
        </p>

        {/* <img
          src={ arrow }
          alt="arrow"
          className="arrow-btn"
        /> */}
      </Link>

    </div>
  );
}

ButtonStartRecipe.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
