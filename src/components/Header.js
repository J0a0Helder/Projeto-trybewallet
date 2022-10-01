import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { wallet } = this.props;
    const { expenses } = wallet;
    let total = 0;
    expenses.forEach((expense) => {
      const currencyConverter = expense.exchangeRates[expense.currency].ask;
      total += expense.value * currencyConverter;
    });
    return total.toFixed(2);
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <div>
          <h4 data-testid="email-field">{ ` Email: ${user.email}` }</h4>
        </div>
        <div>
          <h4 data-testid="total-field">{ this.totalExpenses() }</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </>

    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;

function mapStateToProps(state) {
  const { user, wallet } = state;
  return { user, wallet };
}

export default connect(mapStateToProps)(Header);
