import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getRecipesApi, firstRecipes, fiveCategories } from '../service/recipesApi';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [oldRecipes, setOldRecipes] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  const request = async (type, filter, inputSearch) => {
    const api = await getRecipesApi(type, filter, inputSearch);
    if (!api) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes(api);
      if (api.length === 1) {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
    }
  };

  const requestFirstRecipes = async (type) => {
    const api = await firstRecipes(type);
    setRecipes(api);
  };

  const requestRecommendations = async (type) => {
    const NUMBER_SIX = 6;
    const api = await firstRecipes(type);
    setRecommendation(api.slice(0, NUMBER_SIX));
  };

  const requestCategories = async (type) => {
    const NUMBER_FIVE = 5;
    const api = await fiveCategories(type);
    setCategories(api.slice(0, NUMBER_FIVE));
  };

  const initialValue = {
    recipes,
    requestFirstRecipes,
    setRecipes,
    request,
    categories,
    setCategories,
    requestCategories,
    redirect,
    oldRecipes,
    setOldRecipes,
    recommendation,
    setRecommendation,
    requestRecommendations,
  };

  return (
    <Context.Provider value={ initialValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
