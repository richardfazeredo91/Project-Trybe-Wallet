import React from 'react';
import PropTypes from 'prop-types';

class ExpensesPannel extends React.Component {
  generateFields(element, values, options) {
    const { state, handleChange } = this.props;
    const { [values[4]]: inputValue, [values[3]]: selectValue } = state;

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
    const { currencies, addExpense } = this.props;
    const patternLengthOfCurrencyCode = 3;
    return (
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

        <button type="submit" onClick={ addExpense }>Adicionar despesa</button>
      </form>
    );
  }
}

ExpensesPannel.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default ExpensesPannel;
