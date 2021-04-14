const reducer = (state = { user: {}, errors: {} }, action) => {
  if (action.type === 'FETCH-SIGN-IN' || action.type === 'FETCH-SIGN-UP' || action.type === 'FETCH-UPDATE') {
    if (action.profile.user !== undefined) {
      return { user: action.profile.user, errors: {} };
    }
    return { ...state, ...action.profile };
  }

  if (action.type === 'INIT-USER') {
    return action.profile;
  }

  if (action.type === 'RESET-ERRORS') {
    return { ...state, errors: {} };
  }

  if (action.type === 'LOG-OUT') {
    return { user: {}, errors: {} };
  }
  return state;
};

export default reducer;
