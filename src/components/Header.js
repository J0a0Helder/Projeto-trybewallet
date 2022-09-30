import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    const value = 0;
    return (
      <>
        <div>
          <h4 data-testid="email-field">{ ` Email: ${user.email}` }</h4>
        </div>
        <div>
          <h4 data-testid="total-field">{`Despesa Total: ${value}`}</h4>
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
