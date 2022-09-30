import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectCreator from './SelectCreator';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <label htmlFor="Valor">
          Valor:
          {' '}
          <input
            id="Valor"
            type="number"
            data-testid="value-input"
          />
        </label>

        <SelectCreator
          name="currency"
          options={ currencies }
          label="Moeda"
        />

        <label htmlFor="pagamento">
          Método de pagamento:
          {' '}
          <select id="pagamento" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          {' '}
          <select id="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="descricao">
          Descrição:
          {' '}
          <input
            id="descricao"
            type="text"
            data-testid="description-input"
          />
        </label>
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
