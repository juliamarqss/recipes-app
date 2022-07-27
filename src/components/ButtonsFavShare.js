import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../style/images/share.png';
import whiteHeartIcon from '../style/images/favorite.png';
import greyHeartIcon from '../style/images/favorite-checked.png';

function ButtonsFavShare({ copyUrl, details, type, testId, update }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    }
    const typeID = details.idMeal || details.idDrink || details.id;
    const fav = favoriteRecipes.some((item) => item.id === typeID);
    setIsFav(fav);
  }, [details, type]);

  function setFavorite(favoriteRecipes) {
    const objectForLocalStorage = {
      id: details.idMeal || details.idDrink,
      type,
      nationality: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
    };
    const setNewArray = [...favoriteRecipes, objectForLocalStorage];
    localStorage.setItem('favoriteRecipes', JSON.stringify(setNewArray));
  }

  const handleClick = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    }
    if (!isFav) {
      setFavorite(favoriteRecipes);
      setIsFav(true);
    } else {
      const typeID = details.idMeal || details.idDrink || details.id;
      const newArray = favoriteRecipes.filter((item) => item.id !== typeID);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setIsFav(false);
      update(newArray);
    }
  };

  return (
    <div className="container-btn-fav-share">
      { isCopied ? <p>Link copied!</p> : null }
      <button
        onClick={ handleClick }
        type="button"
        alt="share-url"
      >
        {
          isFav ? <img
            data-testid={ `${testId}favorite-btn` }
            alt="share-url"
            src={ greyHeartIcon }
            className="favorite-btn"
          /> : <img
            data-testid={ `${testId}favorite-btn` }
            src={ whiteHeartIcon }
            alt="share-url"
            className="favorite-btn"
          />
        }
      </button>

      <button
        type="button"
        onClick={ () => {
          copy(copyUrl);
          setIsCopied(true);
        } }
      >
        <img
          data-testid={ `${testId}share-btn` }
          src={ shareIcon }
          alt="share-url"
          className="share-btn"
        />
      </button>
    </div>
  );
}

ButtonsFavShare.propTypes = {
  copyUrl: PropTypes.string.isRequired,
  details: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    idDrink: PropTypes.string,
    strCategory: PropTypes.string,
    nationality: PropTypes.string,
    id: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default ButtonsFavShare;
