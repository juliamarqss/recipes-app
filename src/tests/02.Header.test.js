import React from 'react';
import { cleanup } from "@testing-library/react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';

describe('Teste de cobertura do componente Header', () => {
  it('Verifica se possui os botões', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  })

  it('Verifica se o botão Profile redireciona para a tela Profile', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    const btnProfile = screen.getByTestId('profile-top-btn');
    const btnSearch = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnProfile);

    expect(btnSearch).not.toBeInTheDocument();

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent(/profile/i);
  });

  it('Verifica a funcionalidade do botão Search', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    
    userEvent.click(btnSearch);
    expect(input).not.toBeInTheDocument();

  })
});