import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies, { fetchCurrenciesAndAddUserInfo }
  from '../actions/expensesAction';
import ExpensesHeader from './ExpensesHeader';
import ExpensesPannel from './ExpensesPannel';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  isEdited: false,
};

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.addExpense = this.addExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { fetchApiCurrencies } = this.props;
    await fetchApiCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addExpense(e) {
    e.preventDefault();
    const { fetchCurrenciesAndAddInfo } = this.props;
    const { value, description, currency, method, tag } = this.state;

    fetchCurrenciesAndAddInfo({ value, description, currency, method, tag });
    this.setState(
      INITIAL_STATE,
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <ExpensesPannel
          addExpense={ this.addExpense }
          currencies={ currencies }
          handleChange={ this.handleChange }
          generateFields={ this.generateFields }
          state={ this.state }
        />
        <ExpensesHeader />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiCurrencies: () => dispatch(fetchCurrencies()),
  fetchCurrenciesAndAddInfo: (values) => dispatch(fetchCurrenciesAndAddUserInfo(values)),
});

Expenses.propTypes = {
  fetchCurrenciesAndAddInfo: PropTypes.shape({}),
  fetchApiCurrencies: PropTypes.shape({}),
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
