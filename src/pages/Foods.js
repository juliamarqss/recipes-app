import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import appContext from '../context/Context';
import ButtonsCategory from '../components/ButtonsCategory';
import '../style/recipes.css';

function Foods({ history }) {
  const { recipes, requestFirstRecipes,
    requestCategories, redirect } = useContext(appContext);

  useEffect(() => {
    if (redirect) {
      const { idMeal } = recipes[0];
      history.push(`/foods/${idMeal}`);
    }
  }, [redirect, recipes, history]);

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      requestFirstRecipes('meals');
      requestCategories('meals');
      ref.current = false;
    }
  }, [requestFirstRecipes, requestCategories]);

  return (
    <div>
      <Header title="Foods" condition history={ history } />

      <div className="container-title-cooking">
        <h1 data-testid="foods-test">
          Find Best Recipe
        </h1>
        <h1>
          For Cooking
        </h1>
      </div>

      <ButtonsCategory history={ history } />

      {
        recipes
        && recipes.map((recipe, index) => {
          const limit = 11;
          if (index <= limit) {
            return (
              <Recipes
                key={ index }
                url={ `/foods/${recipe.idMeal}` }
                name={ recipe.strMeal }
                img={ recipe.strMealThumb }
                index={ index }
              />
            );
          }
          return null;
        })
      }
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Foods;
