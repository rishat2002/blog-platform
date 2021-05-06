const reducer = (state = {}, action) => {
  if (action.type === 'SET-ARTICLE') {
    return action.article;
  }
  return state;
};

export default reducer;
