import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../style/doneAndFav.css';

function FavoriteRecipes({ history }) {
  const [filterButtons, setFilterButtons] = useState('');

  return (
    <div>
      <div data-testid="Favorite-recipes">
        <Header title="Favorite Recipes" condition={ false } history={ history } />
      </div>

      <div className="container-btn-filter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterButtons('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterButtons('food') }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterButtons('drink') }
        >
          Drinks
        </button>
      </div>

      <FavoriteCard type={ filterButtons } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default FavoriteRecipes;
