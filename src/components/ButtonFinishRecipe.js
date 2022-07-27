import React from 'react';
import PropTypes from 'prop-types';

function ButtonFinishRecipe({ checked, details, history }) {
  const handleDisabled = () => {
    const checkedList = Object.values(checked);
    return checkedList.every((check) => check);
  };

  const submitRecipe = () => {
    let storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storage) {
      storage = [];
    }
    const type = (details.idMeal) ? 'food' : 'drink';
    // Source: https://stackoverflow.com/q/1531093/how-do-i-get-the-current-date-in-javascript
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const tags = details.strTags || '';

    const finishedRecipe = {
      id: details.idMeal || details.idDrink,
      type,
      nationality: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
      doneDate: `${dd}/${mm}/${yyyy}`,
      tags: tags.split(','),
    };
    storage = [...storage, finishedRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    history.push('/done-recipes');
  };

  return (
    <div>
      <button
        type="button"
        className="btn-finish-recipe"
        disabled={ !handleDisabled() }
        onClick={ () => submitRecipe() }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

ButtonFinishRecipe.propTypes = {
  checked: PropTypes.shape().isRequired,
  details: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ButtonFinishRecipe;
