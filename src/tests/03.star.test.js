import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('implementa os testes do componente "WalletForm"', () => {
  it('deve renderizar corretamente a pagina carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const inputs = screen.getByRole('combobox', {
      name: /moeda: método de pagamento: dinheiro tag: alimentação/i,
    });
    expect(inputs).toBeInTheDocument();
  });

  it('Um campo para adicionar o valor da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
  });

  it('Um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
  });

  it('Um campo para selecionar em qual moeda será registrada a despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
  });

  it('Um campo para adicionar o metodo de pagamento da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    userEvent.selectOptions(methodInput, 'Dinheiro');
    expect(screen.getByText('Dinheiro').selected).toBe(true);
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    expect(screen.getByText('Cartão de crédito').selected).toBe(true);
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    expect(screen.getByText('Cartão de débito').selected).toBe(true);
  });

  it('Um campo para selecionar uma categoria (tag) da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();

    userEvent.selectOptions(tagInput, 'Alimentação');
    expect(screen.getByText('Alimentação').selected).toBe(true);
    userEvent.selectOptions(tagInput, 'Lazer');
    expect(screen.getByText('Lazer').selected).toBe(true);
    userEvent.selectOptions(tagInput, 'Trabalho');
    expect(screen.getByText('Trabalho').selected).toBe(true);
    userEvent.selectOptions(tagInput, 'Transporte');
    expect(screen.getByText('Transporte').selected).toBe(true);
    userEvent.selectOptions(tagInput, 'Saúde');
    expect(screen.getByText('Saúde').selected).toBe(true);
  });

  it('Um campo com as despesas totais', () => {
    renderWithRouterAndRedux(<Wallet />);
    const totalField = screen.getByTestId(/total-field/i);
    const currencyField = screen.getByTestId(/header-currency-field/i);
    expect(totalField.innerHTML).toEqual('0.00');
    expect(currencyField.innerHTML).toEqual('BRL');
  });
});
