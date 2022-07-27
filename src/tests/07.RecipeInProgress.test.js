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

const mockProgress = 
  {"meals":{"52977":["Lentils"]},"cocktails":{"15997":["Galliano","Ginger ale","Ice"],"178319":["Hpnotiq"]}}

const mockDone =
  [{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"20/07/2022","tags":[""]}]

describe('Testes da tela "RecipeInProgress"', () => {
  beforeEach(() => {
    mock();
  })
  afterEach(() => jest.clearAllMocks());

  it('Verifica tela de Receita em Progresso de Foods', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.checked).toBeFalsy();

    userEvent.click(checkbox1);

    expect(checkbox1.checked).toBeTruthy();

    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });   
    expect(checkbox.checked).toBeTruthy();

    userEvent.click(checkbox);

    const allCheckbox = screen.getAllByRole('checkbox');

    const btnFinish = screen.getByTestId('finish-recipe-btn')
    expect(btnFinish).toBeDisabled();

    allCheckbox.forEach((check) => userEvent.click(check))

    expect(btnFinish).not.toBeDisabled();

    userEvent.click(btnFinish);
    
    localStorage.clear();
  })

  it('Verifica tela de Receita continua Progresso de Foods', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });
    expect(checkbox1).toBeInTheDocument();

    expect(checkbox1.checked).toBeTruthy();
    
    localStorage.clear();
  })

  it('Verifica tela de Receita em Progresso de Drinks', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);  
    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.checked).toBeFalsy();

    userEvent.click(checkbox1);

    expect(checkbox1.checked).toBeTruthy();

    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })  
    expect(checkbox.checked).toBeTruthy();

    const checkbox2 = screen.getByRole('checkbox', {
      name: /pineapple juice \- 1 oz/i
    });
    const checkbox3 = screen.getByRole('checkbox', {
      name: /banana liqueur \- 1 oz/i
    });

    const btnFinish = screen.getByTestId('finish-recipe-btn')
    expect(btnFinish).toBeDisabled();

    userEvent.click(checkbox2)
    userEvent.click(checkbox3)

    expect(btnFinish).not.toBeDisabled();

    await act(async () => {
      userEvent.click(btnFinish)
    })

    localStorage.clear();
  })

  it('Verifica tela de Receita continua Progresso de Drinks ', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);  
    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })
    expect(checkbox1).toBeInTheDocument();

    expect(checkbox1.checked).toBeTruthy();

    localStorage.clear();
  })

  it('Verifica se finaliza Receita', async () => {
    const { history } = renderWithRouter(<App />);  
    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const allCheckbox = screen.getAllByRole('checkbox');

    allCheckbox.forEach((check) => userEvent.click(check))

    const btnFinish = screen.getByTestId('finish-recipe-btn')

    await act(async () => {
      userEvent.click(btnFinish)
    })

    localStorage.clear();    
  })
});
