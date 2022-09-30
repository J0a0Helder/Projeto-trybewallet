import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action from '../redux/actions';
import { EXPENSES } from '../redux/reducers/wallet';

class WalletForm extends Component {
  state = {
    value: 0,
    currency: '',
    method: '',
    tag: '',
    description: '',
    expenses: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (obj) => {
    await this.setState(
      (prevState) => ({
        expenses: [...prevState.expenses, obj] }),
      () => {
        this.setState({
          value: 0,
          currency: '',
          method: '',
          tag: '',
          description: '',
        });
      },
    );
    const { expenses } = this.state;
    const { dispatch } = this.props;
    dispatch(action(EXPENSES, expenses));
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    const pagamentos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const descricao = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <label htmlFor="Valor">
          Valor:
          {' '}
          <input
            id="Valor"
            name="value"
            type="number"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((e) => (<option key={ e } value={ e }>{e}</option>))}
          </select>
        </label>

        <label htmlFor="currency-input">
          Método de pagamento:
          {' '}
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
          >
            { pagamentos.map((e) => (<option key={ e } value={ e }>{e}</option>))}
          </select>
        </label>

        <label htmlFor="currency-input">
          Tag:
          {' '}
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
          >
            { descricao.map((e) => (<option key={ e } value={ e }>{e}</option>))}
          </select>
        </label>

        <label htmlFor="descricao">
          Descrição:
          {' '}
          <input
            id="descricao"
            name="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          onClick={ () => {
            this.handleClick({
              value,
              currency,
              method,
              tag,
              description,
            });
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
