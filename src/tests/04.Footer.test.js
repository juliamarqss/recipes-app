import React from 'react';
// import { cleanup } from "@testing-library/react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';

describe('Teste de cobertura do componente Footer', () => {
  it('Verifica se possui os botões', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();

    const btnFoods = screen.getByTestId('food-bottom-btn');
    expect(btnFoods).toBeInTheDocument();
  })

  it('Verifica se o botão Drinks redireciona para a tela Drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    let btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();

    let btnFoods = screen.getByTestId('food-bottom-btn');
    expect(btnFoods).toBeInTheDocument();

    userEvent.click(btnDrinks);

    btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();
    btnFoods = screen.getByTestId('food-bottom-btn');
    expect(btnFoods).toBeInTheDocument();
    
    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent(/drinks/i);

  });

});