import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(mockData),
});

describe('implementa os testes do componente "Head"', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('verifica os elementos da "table"', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btn = screen.getByRole('button');

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.type(descriptionInput, 'janta');
    userEvent.click(btn);

    const btnDelete = await screen.findByRole('button', { name: /excluir/i });
    const description = await screen.findByRole('cell', { name: /janta/i });
    const btnEdit = await screen.findByRole('button', { name: /editar/i });

    expect(btnDelete).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();

    userEvent.click(btnEdit);

    const btnEditExpense = await screen.findByRole('button', { name: /editar despesa/i });

    expect(btnEditExpense).toBeInTheDocument();

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'miojo');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Alimentação');

    userEvent.click(btnEditExpense);

    expect(await screen.findByRole('cell', { name: /miojo/i })).toBeInTheDocument();
  });

  it('verifica os elementos da "table"', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btn = screen.getByRole('button');

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.type(descriptionInput, 'janta');
    userEvent.click(btn);

    const btnDelete = await screen.findByRole('button', { name: /excluir/i });

    expect(btnDelete).toBeInTheDocument();

    userEvent.click(btnDelete);

    expect(btnDelete).not.toBeInTheDocument();
  });
});
