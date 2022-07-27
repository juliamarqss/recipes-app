/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import appContext from '../context/Context';
import drinkIcon from '../style/images/drink-grey.png';
import drinkBlackIcon from '../style/images/drink-black1.png';
import mealIcon from '../style/images/food-grey.png';
import mealBlackIcon from '../style/images/food-black.png';

function Footer({ history }) {
  const { setRecipes, setCategories } = useContext(appContext);

  const btnSrc = (type) => {
    const { pathname } = history.location;
    if (type === 'food') {
      if (pathname === '/foods') {
        return mealBlackIcon;
      }
      return mealIcon;
    }
    if (pathname === '/drinks') {
      return drinkBlackIcon;
    }
    return drinkIcon;
  };

  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            src={ btnSrc('drink') }
            alt="drink"
            data-testid="drinks-bottom-btn"
            className="drink-btn"
            onClick={ () => {
              setRecipes([]);
              setCategories([]);
            } }
          />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button">
          <img
            src={ btnSrc('food') }
            alt="foods"
            data-testid="food-bottom-btn"
            className="food-btn"
            onClick={ () => {
              setRecipes([]);
              setCategories([]);
            } }
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
