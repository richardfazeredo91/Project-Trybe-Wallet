import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies, { fetchCurrenciesAndAddUserInfo, deleteExpense, editExpense }
  from '../../actions/expensesAction';
import ExpensesHeader from '../ExpensesHeader/ExpensesHeader';
import ExpensesPannel from '../ExpensesPannel/ExpensesPannel';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  edit: { isEdited: false, idEdited: null },
};

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.addExpense = this.addExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderEditPannel = this.renderEditPannel.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
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
    this.setState(INITIAL_STATE);
  }

  deleteExpense(id) {
    const { deleteRegister } = this.props;
    deleteRegister(id);
    this.setState(INITIAL_STATE);
  }

  editExpense(e) {
    e.preventDefault();
    const { editRegister } = this.props;
    const {
      value, description, currency, method, tag, edit: { idEdited },
    } = this.state;

    editRegister(idEdited, { value, description, currency, method, tag });
    this.setState(INITIAL_STATE);
  }

  renderEditPannel(id, expenses) {
    const { value, description, currency, method, tag } = expenses[id];
    const { edit: { isEdited } } = this.state;

    if (isEdited) {
      this.setState(INITIAL_STATE);
    } else {
      this.setState({
        value,
        description,
        currency,
        method,
        tag,
        edit: {
          isEdited: true,
          idEdited: id,
        },
      });
    }
  }

  render() {
    return (
      <>
        <ExpensesPannel
          addExpense={ this.addExpense }
          editExpense={ this.editExpense }
          handleChange={ this.handleChange }
          state={ this.state }
        />
        <ExpensesHeader
          renderEditPannel={ this.renderEditPannel }
          deleteExpense={ this.deleteExpense }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApiCurrencies: () => dispatch(fetchCurrencies()),
  fetchCurrenciesAndAddInfo: (values) => dispatch(fetchCurrenciesAndAddUserInfo(values)),
  deleteRegister: (id) => dispatch(deleteExpense(id)),
  editRegister: (id, payload) => dispatch(editExpense(id, payload)),
});

Expenses.propTypes = {
  deleteRegister: PropTypes.func.isRequired,
  editRegister: PropTypes.func.isRequired,
  fetchCurrenciesAndAddInfo: PropTypes.func,
  fetchApiCurrencies: PropTypes.func.isRequired,
};

Expenses.defaultProps = {
  fetchCurrenciesAndAddInfo: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Expenses);
