import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../assets/trybe-logo.png';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.updateExpensesTotal = this.updateExpensesTotal.bind(this);
  }

  updateExpensesTotal() {
    const { expenses } = this.props;
    const expensesTotal = expenses
      .reduce((acc, { value, currency, exchangeRates }) => (
        acc + (value * exchangeRates[currency].ask)), 0);

    return expensesTotal.toFixed(2);
  }

  render() {
    const { user: { email } } = this.props;

    return (
      <header>
        <div id="logo-display" className="logo-display">
          <img src={ Logo } className="logo" alt="logo" />
        </div>

        <div className="user-info-display">
          <div id="user-email-display" className="user-email-display">
            <p data-testid="email-field">
              { `Email: ${email}` }
            </p>
          </div>

          <div id="user-expenses-display" className="user-expenses-display">
            <p data-testid="total-field" id="total-price">
              {`Despesa Total: R$ 
              ${this.updateExpensesTotal()}`}
            </p>
            <p
              data-testid="header-currency-field"
              id="currency-price"
            >
              BRL
            </p>
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
