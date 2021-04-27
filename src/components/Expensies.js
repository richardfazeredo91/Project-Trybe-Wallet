import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies, { fetchCurrenciesAndAddUserInfo }
  from '../actions/expensiesAction';
import ExpensiesHeader from './ExpensiesHeader';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Expensies extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const { fetchCurrenciesAndAddInfo } = this.props;
    const { value, description, currency, method, tag } = this.state;

    fetchCurrenciesAndAddInfo({ value, description, currency, method, tag });
    this.setState(
      initialState,
    );
  }

  generateFields(element, values, options) {
    const { [values[4]]: inputValue, [values[3]]: selectValue } = this.state;
    return element === 'input'
      ? (
        <label htmlFor={ values[0] }>
          { values[1] }

          <input
            type={ values[2] }
            id={ values[0] }
            data-testid={ values[3] }
            name={ values[4] }
            value={ inputValue }
            onChange={ this.handleChange }
          />
        </label>
      ) : (
        <label htmlFor={ values[0] }>
          { values[1] }

          <select
            id={ values[0] }
            data-testid={ values[2] }
            name={ values[3] }
            value={ selectValue }
            onChange={ this.handleChange }
          >
            {
              options.map((option, index) => (
                <option
                  key={ index }
                  data-testid={ option }
                >
                  { option }
                </option>
              ))
            }
          </select>
        </label>
      );
  }

  render() {
    const { currencies } = this.props;
    const patternLengthOfCurrencyCode = 3;
    return (
      <>
        <form>
          {this.generateFields(
            'input', [
              'expense-field', 'Despesa:', 'number', 'value-input', 'value',
            ],
          )}
          {this.generateFields(
            'input', [
              'description-field',
              'Descrição da despesa:',
              'text',
              'description-input',
              'description',
            ],
          )}
          {(
            Object.keys(currencies).length > 0
          ) && (
            this.generateFields(
              'select', [
                'exchange-field', 'Câmbio: ', 'currency-input', 'currency',
              ],
              Object.keys(currencies)
                .filter((currencie) => currencie.length === patternLengthOfCurrencyCode),
            ))}
          {this.generateFields(
            'select', [
              'payment-field', 'Pagamento: ', 'method-input', 'method',
            ],
            ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
          )}
          {this.generateFields(
            'select', [
              'tag-field', 'Categoria: ', 'tag-input', 'tag',
            ],
            ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
          )}

          <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        <ExpensiesHeader />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiCurrencies: () => dispatch(fetchCurrencies()),
  fetchCurrenciesAndAddInfo: (values) => dispatch(fetchCurrenciesAndAddUserInfo(values)),
});

Expensies.propTypes = {
  fetchApiCurrencies: PropTypes.shape({}),
  fetchCurrenciesAndAddInfo: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expensies);
