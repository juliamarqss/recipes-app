import React from 'react';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';


describe('Testa tela de perfil', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345678');
    userEvent.click(buttonEnter);

    history.push('/profile');
  });

 it('Deve renderizar o perfil', () => {
    const headingElement = screen.getByRole('heading', {
    name: /profile/i
  });
   expect(headingElement).toBeInTheDocument();
});

it('Deve renderizar 3 botões', () => {

   const btnDoneRecipes = screen.getByRole('button', {
    name: /done recipes/i
  })
  expect(btnDoneRecipes).toBeInTheDocument();

  const btnFavoriteRecipes = screen.getByRole('button', {
    name: /favorite recipes/i
  })
  expect(btnFavoriteRecipes).toBeInTheDocument()

  const btnAllRecipes = screen.getByRole('button', {
    name: /logout/i
  })
  expect(btnAllRecipes).toBeInTheDocument();
});

it('Testa se botão logout retorna para pagina de login', () => {
  const btnAllRecipes = screen.getByRole('button', {
    name: /logout/i
  })
  userEvent.click(btnAllRecipes);
  const inputEmail = screen.getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();
});

it('Testa se botão favorites retorna para pagina de favoritos', () => {
  const btnFavoriteRecipes = screen.getByRole('button', {
    name: /favorite recipes/i
  })
  userEvent.click(btnFavoriteRecipes);
  const elementHeading = screen.getByTestId('Favorite-recipes');
  expect(elementHeading).toBeInTheDocument();
});

it('Testa se botão done recipes retorna para pagina de receitas finalizadas', () => {
  const btnDoneRecipes = screen.getByRole('button', {
    name: /done recipes/i
  })
  userEvent.click(btnDoneRecipes);
  const elementHeading = screen.getByTestId('Done-Recipes-test');
  expect(elementHeading).toBeInTheDocument();
});
});