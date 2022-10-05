import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('implementa os testes da pagina "login"', () => {
  it('deve renderizar corretamente a pagina login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeButton = screen.getByRole('button', { name: /entrar/i });
    expect(homeButton).toBeInTheDocument();

    const homeInputEmail = screen.getByTestId('email-input');
    expect(homeInputEmail).toBeInTheDocument();

    const homeInputPassWord = screen.getByTestId('password-input');
    expect(homeInputPassWord).toBeInTheDocument();

    userEvent.type(homeInputEmail, 'joao@joao.com');
    userEvent.type(homeInputPassWord, '1234567');
    userEvent.click(homeButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
