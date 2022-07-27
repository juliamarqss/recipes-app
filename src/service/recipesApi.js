const foodAPI = 'https://www.themealdb.com/api/json/v1/1/';
const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/';
const filterAPI = 'filter.php?';
const searchAPI = 'search.php?';
const foodURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const categoryFoodURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const categoryDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const detailFood = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const detailDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getRecipesApi = async (type, filter, inputSearch) => {
  const api = (type === 'meals') ? foodAPI : drinkAPI;
  const php = (filter !== 'i') ? searchAPI : filterAPI;
  const response = await fetch(`${api}${php}${filter}=${inputSearch}`);
  const data = await response.json();

  return Promise.resolve(data[type]);
};

export const firstRecipes = async (type) => {
  const url = (type === 'meals') ? foodURL : drinkURL;
  const response = await fetch(url);
  const data = await response.json();
  return Promise.resolve(data[type]);
};

export const fiveCategories = async (type) => {
  const categoryType = (type === 'meals') ? categoryFoodURL : categoryDrinksURL;
  const response = await fetch(categoryType);
  const data = await response.json();
  return Promise.resolve(data[type]);
};

export const recipeDetail = async (type, id) => {
  const url = (type === 'meals') ? `${detailFood}${id}` : `${detailDrink}${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return Promise.resolve(data[type]);
};

export const filterByCategory = async (type, category) => {
  const urlFood = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const urlDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const categoryType = (type === 'meals') ? urlFood : urlDrink;
  const response = await fetch(categoryType);
  const data = await response.json();
  return Promise.resolve(data[type]);
};
