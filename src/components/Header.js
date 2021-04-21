import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      user.email
        ? (
          <header>
            <h1 data-testid="email-field">
              {`Bem-vindo ${user.email}`}
            </h1>

            <span
              data-testid="total-field"
              id="total-price"
            >
              { this.updateExpensiesTotal() }
            </span>

            <span
              data-testid="header-currency-field"
              id="currency-price"
            >
              {' BRL'}
            </span>
          </header>
        )
        : (
          <header>
            <h1>
              Login não efetuado!
            </h1>

            <span
              data-testid="total-field"
              id="total-price"
            >
              { this.updateExpensiesTotal() }
            </span>

            <span
              data-testid="header-currency-field"
              id="currency-price"
            >
              {' BRL'}
            </span>
          </header>
        )
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
