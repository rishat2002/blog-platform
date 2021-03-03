
const reducer = (state = {} , action) => {
    if (action.type==='FETCH-ARTICLES') {
        return action.articles
    }
    return state
  };

export default reducer;