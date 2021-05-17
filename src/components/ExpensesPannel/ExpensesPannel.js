import React from 'react';
import PropTypes from 'prop-types';
import './ExpensesPannel.css';
import { connect } from 'react-redux';

class ExpensesPannel extends React.Component {
  generateFields(element, values, options) {
    const {
      handleChange, state: { [values[4]]: inputValue, [values[3]]: selectValue },
    } = this.props;

    return element === 'input'
      ? (
        <label htmlFor={ values[0] }>
          { values[1] }

          <input
            type={ values[2] }
            id={ values[0] }
            data-testid={ values[3] }
            name={ values[4] }
            className={ values[5] }
            value={ inputValue }
            onChange={ handleChange }
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
            onChange={ handleChange }
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
    const { currencies, addExpense, editExpense,
      state: { edit: { isEdited } } } = this.props;
    const patternLengthOfCurrencyCode = 3;
    return (
      <section>
        <form>
          {this.generateFields(
            'input', [
              'expense-id', 'Despesa:', 'number', 'value-input', 'value',
            ],
          )}
          {(
            currencies.length
          ) && (
            this.generateFields(
              'select', [
                'exchange-id', 'Câmbio:', 'currency-input', 'currency',
              ],
              currencies
                .filter((currencie) => currencie.length === patternLengthOfCurrencyCode),
            ))}
          {this.generateFields(
            'select', [
              'payment-id', 'Pagamento:', 'method-input', 'method',
            ],
            ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
          )}
          {this.generateFields(
            'select', [
              'tag-id', 'Categoria:', 'tag-input', 'tag',
            ],
            ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
          )}
          {this.generateFields(
            'input', [
              'description-id', 'Descrição:', 'text', 'description-input', 'description',
            ],
          )}
          <button
            type="submit"
            className="add-edt-btn"
            onClick={ isEdited ? editExpense : addExpense }
          >
            { isEdited ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesPannel.propTypes = {
  currencies: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(ExpensesPannel);
