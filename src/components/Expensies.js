import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies, { fetchCurrenciesAndAddUserInfo }
from '../actions/expensiesAction';


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
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
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

  async handleSubmit(e) {
    e.preventDefault();
    const { fetchCurrenciesAndAddInfo } = this.props;
    const { value, description, currency, method, tag } = this.state;
    fetchCurrenciesAndAddInfo({ value, description, currency, method, tag });
    this.setState(
      initialState,
    );
  }

  generateFields(element, values, options) {
    return element === 'input'
      ? (
        <label htmlFor={ values[0] }>
          { values[1] }

          <input
            type={ values[2] }
            id={ values[0] }
            data-testid={ values[3] }
            name={ values[4] }
            value={ this.state[values[4]] }
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
            value={ this.state[values[3]] }
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
    const lengthOfCurrencyCode = 3;
    return (
      <form>
        {this.generateFields(
          'input', [
            'expense-field', 'Despesa', 'number', 'value-input', 'value',
          ],
        )}

        {this.generateFields(
          'input', [
            'description-field',
            'Descrição da despesa',
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
              'exchange-field', 'Câmbio', 'currency-input', 'currency',
            ],
            Object.keys(currencies)
              .filter((currencie) => currencie.length === lengthOfCurrencyCode),
          ))}

        {this.generateFields(
          'select', [
            'payment-field', 'Pagamento', 'method-input', 'method',
          ],
          ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
        )}

        {this.generateFields(
          'select', [
            'tag-field', 'Categoria', 'tag-input', 'tag',
          ],
          ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
        )}

        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>
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
