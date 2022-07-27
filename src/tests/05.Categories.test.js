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

describe('Testes da tela "RecipeInProgress"', () => {
  beforeEach(() => {
    mock();
  })
  afterEach(() => jest.clearAllMocks());

  it('Testa as categorias de Foods', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods');
    })

    let firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/corba/i);

    const btnBeef = screen.getByTestId('Beef-category-filter');
    expect(btnBeef).toBeInTheDocument()

    await act(async () => {
      userEvent.click(btnBeef)
    })

    firstCard = screen.getByTestId('0-card-name')
    expect(firstCard).toHaveTextContent(/beef and mustard pie/i);

    await act(async () => {
      userEvent.click(btnBeef)
    })

    firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/corba/i);

    await act(async () => {
      userEvent.click(btnBeef)
    })

    const all = screen.getByTestId('All-category-filter')
    expect(all).toBeInTheDocument();

    await act(async () => {
      userEvent.click(all)
    })

    firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/corba/i);
  })

  it('Testa as categorias de Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks');
    })

    let firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/gg/i);

    const btnOrdinary = screen.getByTestId('Ordinary Drink-category-filter');
    expect(btnOrdinary).toBeInTheDocument();

    await act(async () => {
      userEvent.click(btnOrdinary)
    })

    firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/3\-mile long island iced tea/i);

    await act(async () => {
      userEvent.click(btnOrdinary)
    })

    firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/gg/i);

    await act(async () => {
      userEvent.click(btnOrdinary)
    })

    const all = screen.getByTestId('All-category-filter')

    await act(async () => {
      userEvent.click(all)
    })

    firstCard = screen.getByTestId('0-card-name');
    expect(firstCard).toHaveTextContent(/gg/i);
  })
})