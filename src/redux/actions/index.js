export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const EDITED_EXPENSES = 'EDITED_EXPENSES';

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    dispatch(getCurrencies(Object.keys(result)));
  } catch (e) {
    throw new Error(e);
  }
};

const action = (type, payload) => ({
  type,
  payload,
});

export default action;
