import oneMeal from './oneMeal';
import oneDrink from './oneDrink';
import meals from './meals2';
import drinks from './drinks2'
import mealCategories from './mealCategories';
import beefMeals from './beefMeals';
import ordinaryDrinks from './ordinaryDrinks';
import drinkCategories from './drinkCategories';
import appleMeals from './appleMeals';
import appleDrink from './appleDrink';
import emptyMeals from './emptyMeals';
import corba from './corba';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
      return Promise.resolve(oneMeal);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(meals);      
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealCategories);      
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(drinks);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
      return Promise.resolve(oneDrink);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'){
      return Promise.resolve(beefMeals);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(drinkCategories);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
      return Promise.resolve(ordinaryDrinks);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Apple') {
      return Promise.resolve(appleMeals)
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Apple'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12710') {
      return Promise.resolve(appleDrink)
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=abcdef') {
      return Promise.resolve(emptyMeals)
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba') {
      return Promise.resolve(corba)
    }
  }
});

module.exports = fetch;