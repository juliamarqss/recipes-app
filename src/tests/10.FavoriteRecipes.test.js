import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import LocalStorageMock from './mocks/mockStorage';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetch)
}

const mockFavorite =
  [
    {
      "id":"15997",
      "type":"drink",
      "nationality":"",
      "category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol",
      "name":"GG",
      "image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
    },
    {
      "id":"52977",
      "type":"food",
      "nationality":"Turkish",
      "category":"Side",
      "alcoholicOrNot":"",
      "name":"Corba",
      "image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    }
  ]

  const clipboard = { ...global.navigator.clipboard }

describe('Testes da tela "Favorite Recipes"', () => {
  beforeEach(() => {
    mock();
    // Source: https://stackoverflow.com/q/62351935/how-to-mock-navigator-clipboard-writetext-in-jest/67645603#67645603
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  })
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    global.navigator.clipboard = clipboard;
  });

  it('Verifica os componentes da tela "FavoriteRecipes"', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/favorite-recipes');
    })

    const btnAll = screen.getByTestId('filter-by-all-btn')
    expect(btnAll).toBeInTheDocument();

    const btnFoods = screen.getByTestId('filter-by-food-btn')
    expect(btnFoods).toBeInTheDocument();
    
    const btnDrinks = screen.getByTestId('filter-by-drink-btn')
    expect(btnDrinks).toBeInTheDocument();

    const image1 = screen.getByTestId('0-horizontal-image')
    expect(image1).toBeInTheDocument();

    const name1 = screen.getByTestId('0-horizontal-name')
    expect(name1).toHaveTextContent(/GG/i)

    const top1 = screen.getByTestId('0-horizontal-top-text')
    expect(top1).toHaveTextContent('- Ordinary Drink - Optional alcohol');

    const share1 = screen.getByTestId('0-horizontal-share-btn')
    expect(share1).toBeInTheDocument()

    const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
  })

  it('Verifica com localStorage vazio', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/favorite-recipes');
    })

    const noFavorites = screen.getByText(/you don't have favorites recipes/i)
    expect(noFavorites).toBeInTheDocument();
  });

  it('Verifica a filtragem da tela de "FavoriteRecipe"', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/favorite-recipes');
    })

    const btnAll = screen.getByTestId('filter-by-all-btn')
    const btnFoods = screen.getByTestId('filter-by-food-btn')
    const btnDrinks = screen.getByTestId('filter-by-drink-btn')

    let name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/GG/i);
    
    userEvent.click(btnDrinks);

    name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/GG/i);

    userEvent.click(btnFoods);

    name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/Corba/i);

    userEvent.click(btnAll);

    name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/GG/i);

    const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(btnFavorite);

    name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/Corba/i);

    const btnShare = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(btnShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  })

})