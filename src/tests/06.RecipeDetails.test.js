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

const mockProgress = {
  "meals": {
    "52977": ["Lentils"]
  },
  "cocktails": {
    "15997": ["Galliano", "Ginger ale", "Ice"],
    "178319": ["Hpnotiq"]
  }
}

const mockFavorite = [
  {
    "id": "15997",
    "type": "drink",
    "nationality": "",
    "category": "Ordinary Drink", "alcoholicOrNot": "Optional alcohol",
    "name": "GG",
    "image": "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
  },
  {
    "id": "52977",
    "type": "food",
    "nationality": "Turkish",
    "category": "Side",
    "alcoholicOrNot": "",
    "name": "Corba",
    "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  }]

const clipboard = { ...global.navigator.clipboard }

describe('Testes da tela "RecipeDetails"', () => {
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

  it('Testa detalhes de um Drink', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks/178319');
    })

    const img = screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent(/Aquamarine/i);

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent(/Alcoholic/i);

    const ingredients = screen.getByRole('list');
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const card = screen.getByTestId('0-recomendation-card');
    expect(card).toBeInTheDocument();

    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toHaveTextContent(/Start Recipe/i);

    await act(async () => {
      userEvent.click(btnStart);
    })

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

  })

  it('Testa detalhes de um Food', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977');
    })

    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();

    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toHaveTextContent(/Continue Recipe/i);

    await act(async () => {
      userEvent.click(btnStart);
    })

    expect(history.location.pathname).toBe('/foods/52977/in-progress');

    const checkbox = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    })
    expect(checkbox).toBeInTheDocument();
  })

  it('Testa botão de favoritar Meal', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977');
    })

    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument()
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnFavorite);

    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    userEvent.click(btnFavorite);

    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  it('Testa botão de favoritar Drink', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks/178319');
    })

    const btnFavorite = screen.getByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument()
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(btnFavorite);

    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    userEvent.click(btnFavorite);

    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  it('Testa continuar um Drink', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks/178319');
    })

    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toHaveTextContent(/Continue Recipe/i);

    await act(async () => {
      userEvent.click(btnStart);
    })
  })

  it('Testa o botão de compartilha', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977');
    })

    const btnFavorite = screen.getByTestId('favorite-btn');

    userEvent.click(btnFavorite);

    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });
})