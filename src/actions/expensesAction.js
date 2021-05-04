import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
  GET_EXPENSES_INFO,
  DELETE_EXPENSE,
} from './actionTypes';
import getCurrenciesExchanges from '../services/awesomeApi';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_FAILURE,
  error,
});

const receiveCurrenciesSuccess = (data) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  data,
});

const getExpensesInfo = (data, values) => ({
  type: GET_EXPENSES_INFO,
  data,
  info: values,
});

export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    id,
  };
}

const filteredCurrencies = (rates, removeList = { DOGE: 'DOGE', USDT: 'USDT' }) => {
  delete rates[removeList.DOGE];
  delete rates[removeList.USDT];
  return rates;
};

export function fetchCurrenciesAndAddUserInfo(values) {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return getCurrenciesExchanges()
      .then(
        (data) => dispatch(getExpensesInfo(filteredCurrencies(data), values)),
        (error) => dispatch(receiveCurrenciesFailure(error.message)),
      );
  };
}

export default function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());

    return getCurrenciesExchanges()
      .then(
        (data) => dispatch(receiveCurrenciesSuccess(data)),
        (error) => dispatch(receiveCurrenciesFailure(error.message)),
      );
  };
}
