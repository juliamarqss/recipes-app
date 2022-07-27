import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetch)
}

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    mock();
  });
  afterEach(() => jest.clearAllMocks());

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Foods', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods');
    })

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    const radio = screen.getByTestId('name-search-radio')
    expect(radio).toBeInTheDocument();
    expect(radio.checked).toBeFalsy();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();  

    userEvent.type(input, 'Apple');
    userEvent.click(radio);
    expect(radio.checked).toBeTruthy();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    const recipe1 = screen.getByTestId('0-card-img')
    expect(recipe1).toBeInTheDocument();
  })

  it('Verifica se o alerta é renderizado na tela', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods');
    })

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);
    
    const input = screen.getByTestId('search-input');
    const radio = screen.getByText(/first letter/i);
    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'aa');
    userEvent.click(radio);

    global.alert = jest.fn();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    expect(global.alert).toHaveBeenCalledTimes(1);    
  })

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Drink', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks');
    })

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');

    const radio = screen.getByTestId('ingredient-search-radio')

    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'Apple');
    userEvent.click(radio);

    await act(async () => {
      userEvent.click(btnSearch);
    })
  })

  it('Verifica se um alert é chamado ao não encontrar nenhum Drink', async () => {
    const mockAlertText = "Sorry, we haven't found any recipes for these filters.";

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods');
    })

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);
    
    const input = screen.getByTestId('search-input');
    const radio = screen.getByTestId('name-search-radio')
    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'abcdef');
    userEvent.click(radio);

    global.alert = jest.fn();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(mockAlertText);
  })

  it('Verifica se é redirecionada para a pagina RecipeDetails', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods');
    })

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');

    const radio = screen.getByTestId('name-search-radio');

    const btnSearch = screen.getByTestId('exec-search-btn'); 

    userEvent.type(input, 'Corba');
    userEvent.click(radio);

    await act(async () => {
      userEvent.click(btnSearch);
    })
  })
})