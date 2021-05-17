import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import './ExpensesHeader.css';

class ExpensesHeader extends React.Component {
  render() {
    const { expenses, deleteExpense, renderEditPannel } = this.props;
    const getNameBeforeSlash = /[^/]*/;
    const limitDecimals = (value) => (parseFloat(value)).toFixed(2);
    const headersWallet = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table cellSpacing="0">
        <thead>
          <tr>{headersWallet.map((header, index) => <th key={ index }>{header}</th>)}</tr>
        </thead>
        <tbody>
          {expenses.map((
            { id, description, tag, method, value, currency, exchangeRates },
          ) => (
            <tr key={ id } className="expense-register">
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
                  className="edit-btn"
                  data-testid="edit-btn"
                  id="edit-btn"
                  onClick={ () => renderEditPannel(id, expenses) }
                >
                  <BiEditAlt />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(id) }
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

ExpensesHeader.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ })),
  renderEditPannel: PropTypes.func.isRequired,
};

ExpensesHeader.defaultProps = {
  expenses: PropTypes.arrayOf(),
};

export default connect(mapStateToProps)(ExpensesHeader);
