import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.updateExpensiesTotal = this.updateExpensiesTotal.bind(this);
  }

  updateExpensiesTotal() {
    const { expenses } = this.props;
    const expensesTotal = expenses
      .reduce((acc, { value, currency, exchangeRates }) => (
        acc + (value * exchangeRates[currency].ask)), 0);

    return expensesTotal.toFixed(2);
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <div id="logo-display" className="logo-display">
          <img src="../assets/trybe-logo" alt="logo" />
        </div>

        <div className="user-info-display">
          <div id="user-email-display" className="user-email-display">
            <h1 data-testid="email-field">
              { !user.email ? 'Login não efetuado!' : `Email: ${user.email}`}
            </h1>
          </div>

          <div id="user-expenses-display" className="user-expenses-display">
            <p>
              {'Despesa total: R$ '}
            </p>
            <span
              data-testid="total-field"
              id="total-price"
            >
              {this.updateExpensiesTotal()}
            </span>
            <span
              data-testid="header-currency-field"
              id="currency-price"
            >
              {' BRL'}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  expenses: PropTypes.arrayOf(PropTypes.shape({ })),
};

Header.defaultProps = {
  user: PropTypes.shape({}),
  expenses: PropTypes.arrayOf(),
};

export default connect(mapStateToProps)(Header);
