// antes havia usado o index como key, porém uma duvida surgiu no corse e foi explicado que usar o index como key quebraria o código, então refatorei e usei o ID //

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import action, { REMOVE_EXPENSES, EDIT_EXPENSES } from '../redux/actions';
import '../styles/table.css';

class Table extends Component {
  removeExpenses = (expense) => {
    const { dispatch } = this.props;
    dispatch(action(REMOVE_EXPENSES, expense));
  };

  editExpenses = (expense) => {
    const { dispatch } = this.props;
    dispatch(action(EDIT_EXPENSES, expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1.5">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((element) => {
              const {
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates } = element;
              const exchangeValue = Number(exchangeRates[currency].ask);
              const converter = exchangeValue * value;
              const currencyName = (exchangeRates[currency].name);
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ currencyName }</td>
                  <td>{ exchangeValue.toFixed(2) }</td>
                  <td>{ converter.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpenses(element.id) }
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeExpenses(element) }
                      className="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
