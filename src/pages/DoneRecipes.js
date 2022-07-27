import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import '../style/doneAndFav.css';

function DoneRecipes({ history }) {
  const [filterButtons, setFilterButtons] = useState('');

  return (
    <div data-testid="Done-Recipes-test">
      <Header title="Done Recipes" condition={ false } history={ history } />

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

      <DoneRecipesCard type={ filterButtons } />

    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
