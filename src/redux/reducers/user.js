const initialState = {
  email: '',
};

export const EMAIL = 'EMAIL';

function user(state = initialState, { type, payload }) {
  switch (type) {
  case EMAIL:
    return {
      email: payload,
    };
  default:
    return state;
  }
}

export default user;
