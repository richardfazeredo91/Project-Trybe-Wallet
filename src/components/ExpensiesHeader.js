import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensiesHeader extends React.Component {
  render() {
    const { expenses } = this.props;
    const regex = /[^/]*/;
    const limitDecimals = (value) => (parseFloat(value)).toFixed(2);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((
            {
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
            },
            index,
          ) => (
            <tr key={ index }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.match(regex) }</td>
              <td>{ limitDecimals(exchangeRates[currency].ask) }</td>
              <td>{ limitDecimals(value * exchangeRates[currency].ask) }</td>
              <td>Real</td>
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

ExpensiesHeader.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ })),
};

ExpensiesHeader.defaultProps = {
  expenses: PropTypes.arrayOf(),
};

export default connect(mapStateToProps)(ExpensiesHeader);
