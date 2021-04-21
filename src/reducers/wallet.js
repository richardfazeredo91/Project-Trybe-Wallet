import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  GET_EXPENSES_INFO,
  RECEIVE_CURRENCIES_FAILURE,
} from '../actions/actionTypes';

const INITIAL_WALLET_EXPENSIES = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = INITIAL_WALLET_EXPENSIES, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };

  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.data,
      isFetching: false,
    };

  case GET_EXPENSES_INFO:
    return {
      currencies: action.data,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.info,
          exchangeRates: action.data,
        },
      ],
      isFetching: false,
    };

  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };

  default:
    return state;
  }
};

export default wallet;
