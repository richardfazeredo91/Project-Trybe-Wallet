import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { deleteExpense, editExpense } from '../actions/expensesAction';

class ExpensesHeader extends React.Component {
  render() {
    const { expenses, deleteRegister } = this.props;
    const getNameBeforeSlash = /[^/]*/;
    const limitDecimals = (value) => (parseFloat(value)).toFixed(2);
    const headersWallet = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>{headersWallet.map((header, index) => <th key={ index }>{header}</th>)}</tr>
        </thead>
        <tbody>
          {expenses.map((
            { id, description, tag, method, value, currency, exchangeRates },
          ) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name.match(getNameBeforeSlash)}</td>
              <td>{limitDecimals(exchangeRates[currency].ask)}</td>
              <td>{limitDecimals(value * exchangeRates[currency].ask)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteRegister(id) }
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRegister: (id) => dispatch(deleteExpense(id)),
  editRegister: (id, payload) => dispatch(editExpense(id, payload)),
});

ExpensesHeader.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ })),
  deleteRegister: PropTypes.func,
};

ExpensesHeader.defaultProps = {
  expenses: PropTypes.arrayOf(),
  deleteRegister: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesHeader);
