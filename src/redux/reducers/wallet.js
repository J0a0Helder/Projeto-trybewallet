import { REQUEST_API, GET_CURRENCIES } from '../actions';

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
  default:
    return state;
  }
}

export default wallet;
