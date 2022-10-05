import {
  REQUEST_API,
  GET_CURRENCIES,
  REMOVE_EXPENSES,
  EDIT_EXPENSES,
  EDITED_EXPENSES } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
};

export const EXPENSES = 'EXPENSES';

function wallet(state = initialState, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      isLoading: false,
      currencies: payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== payload.id),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  case EDITED_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .map((expense) => {
          if (expense.id === state.idToEdit) {
            return {
              id: expense.id,
              ...payload,
              exchangeRates: expense.exchangeRates,
            };
          }
          return expense;
        }),
    };
  default:
    return state;
  }
}

export default wallet;
