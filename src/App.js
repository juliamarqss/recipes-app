import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
