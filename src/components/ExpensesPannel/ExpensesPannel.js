import React from 'react';
import PropTypes from 'prop-types';
import './ExpensesPannel.css';

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
              'expense-field', 'Despesa:', 'number', 'value-input', 'value',
            ],
          )}
          {(
            Object.keys(currencies).length > 0
          ) && (
            this.generateFields(
              'select', [
                'exchange-field', 'Câmbio:', 'currency-input', 'currency',
              ],
              Object.keys(currencies)
                .filter((currencie) => currencie.length === patternLengthOfCurrencyCode),
            ))}
          {this.generateFields(
            'select', [
              'payment-field', 'Pagamento:', 'method-input', 'method',
            ],
            ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
          )}
          {this.generateFields(
            'select', [
              'tag-field', 'Categoria:', 'tag-input', 'tag',
            ],
            ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
          )}
          {this.generateFields(
            'input', [
              'description-field',
              'Descrição:',
              'text',
              'description-input',
              'description',
            ],
          )}
          <button type="submit" onClick={ isEdited ? editExpense : addExpense }>
            { isEdited ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </section>
    );
  }
}

ExpensesPannel.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default ExpensesPannel;
